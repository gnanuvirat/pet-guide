
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface ApiMethod {
  summary: string;
  responses: Record<string, {
    description: string;
    content?: {
      'application/json': {
        schema: any;
      }
    }
  }>;
  parameters?: Array<{
    name: string;
    in: string;
    required: boolean;
    schema: any;
  }>;
  requestBody?: {
    content: {
      [key: string]: {
        schema: any;
      }
    }
  };
  security?: Array<Record<string, any>>;
}

interface ApiPath {
  [method: string]: ApiMethod;
}

interface ApiDocs {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  paths: Record<string, ApiPath>;
  components: {
    schemas: Record<string, any>;
  };
  tags: Array<{
    name: string;
    description: string;
  }>;
}

const ApiDocs = () => {
  const [apiDocs, setApiDocs] = useState<ApiDocs | null>(null);
  const [activeTag, setActiveTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApiDocs = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('api-docs');
        
        if (error) throw error;
        
        if (data && data.apiSpecification) {
          setApiDocs(data.apiSpecification);
          // Set initial active tag
          if (data.apiSpecification.tags && data.apiSpecification.tags.length > 0) {
            setActiveTag(data.apiSpecification.tags[0].name);
          }
        } else {
          throw new Error('Invalid API documentation format');
        }
      } catch (err: any) {
        console.error('Error fetching API docs:', err);
        setError(err.message);
        toast({
          title: "Error fetching API documentation",
          description: err.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiDocs();
  }, [toast]);

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'get': return 'bg-blue-100 text-blue-800';
      case 'post': return 'bg-green-100 text-green-800';
      case 'put': return 'bg-amber-100 text-amber-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPathsForTag = (tagName: string) => {
    if (!apiDocs) return [];

    const result = [];
    for (const [path, methods] of Object.entries(apiDocs.paths)) {
      for (const [method, details] of Object.entries(methods)) {
        if (details.tags && details.tags.includes(tagName)) {
          result.push({ path, method, details });
        }
      }
    }
    return result;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Loading API documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">API Documentation Error</CardTitle>
            <CardDescription>Failed to load the API documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <p className="mt-4">Please check your network connection and try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!apiDocs) return null;

  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">{apiDocs.info.title}</CardTitle>
                <CardDescription className="text-lg mt-2">Version {apiDocs.info.version}</CardDescription>
              </div>
              <Badge className="text-lg py-1 px-3 bg-primary">OpenAPI {apiDocs.openapi}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{apiDocs.info.description}</p>
          </CardContent>
        </Card>

        <Tabs value={activeTag} onValueChange={setActiveTag}>
          <TabsList className="mb-8 w-full overflow-x-auto flex flex-nowrap justify-start">
            {apiDocs.tags.map((tag) => (
              <TabsTrigger key={tag.name} value={tag.name} className="whitespace-nowrap">
                {tag.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {apiDocs.tags.map((tag) => (
            <TabsContent key={tag.name} value={tag.name} className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{tag.name}</h2>
                <p className="text-gray-600">{tag.description}</p>
              </div>

              {getPathsForTag(tag.name).map(({ path, method, details }, index) => (
                <Card key={`${path}-${method}-${index}`} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={`uppercase ${getMethodColor(method)}`}>{method}</Badge>
                      <CardTitle className="font-mono text-lg">{path}</CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-base">{details.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    {details.security && details.security.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-1">Security</h4>
                        <div className="flex gap-2">
                          {details.security.map((sec, i) => (
                            <Badge key={i} variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                              {Object.keys(sec)[0]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {details.parameters && details.parameters.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Parameters</h4>
                        <div className="space-y-2">
                          {details.parameters.map((param, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-gray-50 border-gray-200">
                                {param.in}
                              </Badge>
                              <span className="font-medium">{param.name}</span>
                              {param.required && (
                                <Badge className="bg-red-100 text-red-800 border-red-300">required</Badge>
                              )}
                              <span className="text-gray-500 text-sm">{param.schema.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {details.requestBody && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Request Body</h4>
                        <div className="bg-gray-50 p-3 rounded-md font-mono text-sm overflow-auto max-h-60">
                          <pre>{JSON.stringify(details.requestBody.content, null, 2)}</pre>
                        </div>
                      </div>
                    )}

                    <Separator className="my-4" />

                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Responses</h4>
                    <div className="space-y-3">
                      {Object.entries(details.responses).map(([code, response]) => (
                        <div key={code} className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={code.startsWith('2') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                              {code}
                            </Badge>
                            <span className="font-medium">{response.description}</span>
                          </div>
                          {response.content && (
                            <div className="font-mono text-sm overflow-auto max-h-60 bg-white p-2 rounded">
                              <pre>{JSON.stringify(response.content, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ApiDocs;
