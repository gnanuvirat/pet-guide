
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Check, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Behavior = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data - in a real app, this would come from an API
  const behaviorData = {
    petType: 'Dog',
    breed: 'Golden Retriever',
    videoLength: '00:42',
    behaviors: {
      active: {
        score: 85,
        description: 'Your pet shows high levels of activity and enjoys movement.',
        suggestions: [
          'Provide at least 60 minutes of exercise daily',
          'Include a mix of walking, running, and play sessions',
          'Consider interactive toys that encourage movement'
        ]
      },
      social: {
        score: 90,
        description: 'Your pet appears to be very social and friendly.',
        suggestions: [
          'Regular socialization with other dogs is recommended',
          'Dog park visits 2-3 times per week',
          'Consider doggy daycare for social enrichment'
        ]
      },
      anxious: {
        score: 15,
        description: 'Your pet shows minimal signs of anxiety.',
        suggestions: [
          'Maintain regular routines to preserve low anxiety',
          'Continue providing a calm, secure environment',
          'Monitor for changes during stressful events'
        ]
      },
      curious: {
        score: 75,
        description: 'Your pet demonstrates healthy curiosity about surroundings.',
        suggestions: [
          'Provide puzzle toys to engage their mind',
          'Introduce new environments occasionally',
          'Hide treats for them to find and discover'
        ]
      },
      independent: {
        score: 40,
        description: 'Your pet shows moderate independence with some attachment.',
        suggestions: [
          'Practice short periods of separation daily',
          'Create a comfortable space that is just for them',
          'Use positive reinforcement when they show confidence alone'
        ]
      }
    },
    keyMoments: [
      { timestamp: '00:08', description: 'Excited greeting behavior', priority: 'normal' },
      { timestamp: '00:15', description: 'Playful bounding and jumping', priority: 'normal' },
      { timestamp: '00:23', description: 'Slight hesitation near new object', priority: 'low' },
      { timestamp: '00:31', description: 'Tail wagging - sign of happiness', priority: 'normal' },
      { timestamp: '00:37', description: 'Seeking attention through pawing', priority: 'high' }
    ],
    recommendations: [
      {
        title: 'Daily Exercise Routine',
        description: 'Based on your pet\'s energy level, we recommend establishing a consistent daily exercise routine that includes both physical activity and mental stimulation.',
        priority: 'high'
      },
      {
        title: 'Social Interaction',
        description: 'Your pet thrives on social interaction. Regular playdates and visits to dog-friendly areas will help maintain their good social behavior.',
        priority: 'high' 
      },
      {
        title: 'Mental Enrichment',
        description: 'Provide puzzle toys and training sessions to keep your pet mentally engaged and prevent boredom-related behaviors.',
        priority: 'medium'
      },
      {
        title: 'Consistency in Training',
        description: 'Your pet responds well to guidance. Maintain consistent training cues and positive reinforcement techniques.',
        priority: 'medium'
      }
    ]
  };

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
      case 'normal':
      default:
        return <Check className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative animate-spin">
              <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-pet-purple border-opacity-20 rounded-full"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-transparent border-t-primary rounded-full"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Analyzing behavior patterns...</p>
            <div className="w-64 mt-6">
              <Progress value={65} className="h-2" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Behavior Analysis</h1>
              <p className="mt-2 text-lg text-gray-600">
                Based on your pet's video ({behaviorData.videoLength})
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overview Card */}
              <Card className="lg:col-span-1 animate-bounce-in">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                    <video 
                      src="" 
                      controls 
                      poster="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {behaviorData.videoLength}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Your {behaviorData.breed}</h3>
                  
                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium border-b pb-2">Behavior Traits</h4>
                    {Object.entries(behaviorData.behaviors).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="capitalize">{key}</span>
                          <span className="font-medium">{value.score}%</span>
                        </div>
                        <Progress value={value.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/health">
                      <Button className="w-full pet-btn-primary flex items-center justify-center">
                        View Health Recommendations
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Detailed Analysis */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="insights" className="w-full animate-fade-in-up">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="insights">Behavioral Insights</TabsTrigger>
                    <TabsTrigger value="moments">Key Moments</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="insights" className="p-6 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold mb-4">Behavioral Insights</h3>
                    
                    <div className="space-y-6">
                      {Object.entries(behaviorData.behaviors).map(([key, value]) => (
                        <Card key={key} className="border-0 bg-pet-green/20">
                          <CardContent className="p-4">
                            <h4 className="font-medium capitalize mb-2">{key}</h4>
                            <p className="text-gray-700 mb-4">{value.description}</p>
                            
                            <h5 className="font-medium text-sm text-gray-600 mb-2">Suggestions:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                              {value.suggestions.map((suggestion, i) => (
                                <li key={i}>{suggestion}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="moments" className="p-6 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold mb-4">Key Moments</h3>
                    
                    <div className="space-y-3">
                      {behaviorData.keyMoments.map((moment, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-pet-blue/20">
                          <div className="bg-white rounded-md px-2 py-1 text-center">
                            <span className="text-primary font-medium">{moment.timestamp}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800">{moment.description}</p>
                          </div>
                          <div>
                            {renderPriorityIcon(moment.priority)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 bg-pet-peach/40 rounded-lg p-4">
                      <h4 className="font-medium mb-2">About Video Analysis</h4>
                      <p className="text-sm text-gray-700">
                        Our AI analyzes your pet's movements, expressions, and interactions to identify key behavioral patterns.
                        Longer videos with natural behavior provide more accurate results.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="bg-white p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                  
                  <div className="space-y-4">
                    {behaviorData.recommendations.map((rec, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-l-4 ${
                          rec.priority === 'high' 
                            ? 'border-amber-500 bg-amber-50' 
                            : rec.priority === 'medium'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-green-500 bg-green-50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            {renderPriorityIcon(rec.priority)}
                          </div>
                          <div>
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Link to="/chatbot">
                      <Button className="pet-btn-secondary">
                        Get More Behavior Advice from PetBot
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Behavior;
