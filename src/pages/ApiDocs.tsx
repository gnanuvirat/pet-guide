
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiParameter {
  name: string;
  required: boolean;
  schema: {
    type: string;
  };
  description?: string;
}

interface ApiResponse {
  status: string;
  description: string;
  content?: Record<string, any>;
}

interface ApiMethod {
  operationId: string;
  summary: string;
  description?: string;
  parameters?: ApiParameter[];
  requestBody?: {
    required: boolean;
    content: Record<string, any>;
  };
  responses: Record<string, ApiResponse>;
  security?: any[];
  tags?: string[];
}

interface ApiPath {
  path: string;
  methods: Record<HttpMethod, ApiMethod>;
}

const ApiDocs = () => {
  const [apiDocs, setApiDocs] = useState<ApiPath[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiDocs = async () => {
      try {
        const response = await fetch('/api/v1/docs');
        if (!response.ok) {
          throw new Error('Failed to fetch API documentation');
        }
        
        const data = await response.json();
        
        // Transform the OpenAPI spec into a more usable format for our UI
        const paths: ApiPath[] = Object.entries(data.paths).map(([path, methods]) => ({
          path,
          methods: methods as Record<HttpMethod, ApiMethod>,
        }));
        
        setApiDocs(paths);
      } catch (error) {
        console.error('Error fetching API documentation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiDocs();
  }, []);

  // Extract all unique tags from API methods
  const categories = ['all'];
  apiDocs.forEach(({ methods }) => {
    Object.values(methods).forEach((method) => {
      if (method.tags && Array.isArray(method.tags)) {
        method.tags.forEach((tag) => {
          if (!categories.includes(tag)) {
            categories.push(tag);
          }
        });
      }
    });
  });

  // Filter paths by selected category
  const filteredPaths = activeCategory === 'all' 
    ? apiDocs 
    : apiDocs.filter(({ methods }) => {
        return Object.values(methods).some(method => 
          method.tags && method.tags.includes(activeCategory)
        );
      });

  const getMethodColor = (method: string) => {
    const colors = {
      get: 'bg-blue-100 text-blue-800',
      post: 'bg-green-100 text-green-800',
      put: 'bg-yellow-100 text-yellow-800',
      delete: 'bg-red-100 text-red-800',
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pet Guide API Documentation</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete documentation for the Pet Guide RESTful API. 
          Use these endpoints to integrate pet analysis, behavior detection, and AI chatbot capabilities into your application.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 flex flex-wrap gap-2">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6">
            {filteredPaths.length > 0 ? (
              filteredPaths.map(({ path, methods }, index) => (
                <Card key={`${path}-${index}`} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="font-mono text-lg">{path}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="multiple">
                      {Object.entries(methods).map(([method, details], methodIndex) => (
                        <AccordionItem value={`${path}-${method}-${methodIndex}`} key={`${path}-${method}-${methodIndex}`}>
                          <AccordionTrigger className="px-6 py-3 hover:bg-gray-50">
                            <div className="flex items-center space-x-4">
                              <span className={`uppercase font-mono px-3 py-1 rounded-md text-xs font-semibold ${getMethodColor(method)}`}>
                                {method}
                              </span>
                              <span className="font-medium">{details.summary}</span>
                              {details.tags && details.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="ml-2">{tag}</Badge>
                              ))}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4">
                            <div className="space-y-4">
                              {details.description && (
                                <div>
                                  <h4 className="text-sm font-semibold mb-1">Description</h4>
                                  <p className="text-gray-700">{details.description}</p>
                                </div>
                              )}

                              {details.parameters && details.parameters.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Parameters</h4>
                                  <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="grid grid-cols-3 gap-2 text-sm font-semibold mb-2">
                                      <div>Name</div>
                                      <div>Type</div>
                                      <div>Description</div>
                                    </div>
                                    {details.parameters.map((param, paramIndex) => (
                                      <div key={paramIndex} className="grid grid-cols-3 gap-2 text-sm border-t border-gray-200 py-2">
                                        <div className="font-mono">
                                          {param.name} 
                                          {param.required && <span className="text-red-500 ml-1">*</span>}
                                        </div>
                                        <div>{param.schema.type}</div>
                                        <div>{param.description || '-'}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {details.requestBody && (
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Request Body</h4>
                                  <div className="bg-gray-50 p-4 rounded-md">
                                    <pre className="text-sm overflow-x-auto">{JSON.stringify(details.requestBody.content, null, 2)}</pre>
                                  </div>
                                </div>
                              )}

                              <div>
                                <h4 className="text-sm font-semibold mb-2">Responses</h4>
                                {Object.entries(details.responses).map(([status, response]) => (
                                  <div key={status} className="mb-4">
                                    <div className="flex items-center mb-2">
                                      <Badge className={status.startsWith('2') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                        {status}
                                      </Badge>
                                      <span className="ml-2 text-sm">{response.description}</span>
                                    </div>
                                    {response.content && (
                                      <div className="bg-gray-50 p-4 rounded-md">
                                        <pre className="text-sm overflow-x-auto">{JSON.stringify(response.content, null, 2)}</pre>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No endpoints found for the selected category.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ApiDocs;
