
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Info, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analysis = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data - in a real app, this would come from an API
  const petData = {
    name: 'Your Pet',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    breed: 'Maine Coon',
    confidence: 98,
    age: {
      estimated: '2-3 years',
      confidence: 92
    },
    lifespan: '12-15 years',
    size: 'Large',
    coat: 'Long and shaggy',
    temperament: ['Gentle', 'Playful', 'Intelligent', 'Social'],
    commonTraits: [
      { trait: 'Strong hunting instinct', percentage: 85 },
      { trait: 'Friendly with humans', percentage: 95 },
      { trait: 'Vocal/talkative', percentage: 80 },
      { trait: 'Good with other pets', percentage: 75 },
      { trait: 'Enjoys climbing', percentage: 90 }
    ],
    foodRecommendations: [
      { name: 'High-quality protein dry food', description: 'Maine Coons need protein for muscle development.' },
      { name: 'Wet food with fish', description: 'Provides essential fatty acids for coat health.' },
      { name: 'Large breed formula', description: 'Formulated for larger cat breeds like Maine Coons.' }
    ],
    trainingTips: [
      'Start leash training early as Maine Coons can enjoy walks',
      'Use positive reinforcement for training success',
      'Provide climbing trees and perches for natural behavior',
      'Rotate toys regularly to keep them mentally stimulated',
      'Teach basic commands like "come" and "sit" with treats'
    ]
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
            <p className="mt-4 text-lg text-gray-600">Analyzing your pet...</p>
            <div className="w-64 mt-6">
              <Progress value={65} className="h-2" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Pet Analysis Results</h1>
              <p className="mt-2 text-lg text-gray-600">
                AI-powered insights about your pet
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary Info Card */}
              <Card className="lg:col-span-1 h-fit animate-bounce-in">
                <CardHeader className="text-center relative pb-0">
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Heart className="h-10 w-10 text-red-500" />
                  </div>
                  <div className="mt-8">
                    <CardTitle className="text-2xl">{petData.breed}</CardTitle>
                    <CardDescription>
                      Confidence: {petData.confidence}%
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4">
                    <img 
                      src={petData.image} 
                      alt={petData.breed} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Estimated Age</span>
                      <span className="font-medium">{petData.age.estimated}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Lifespan</span>
                      <span className="font-medium">{petData.lifespan}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Size</span>
                      <span className="font-medium">{petData.size}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Coat</span>
                      <span className="font-medium">{petData.coat}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Temperament</h3>
                    <div className="flex flex-wrap gap-2">
                      {petData.temperament.map((trait, index) => (
                        <span 
                          key={index} 
                          className="bg-pet-blue px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
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
                <Tabs defaultValue="traits" className="w-full animate-fade-in-up">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="traits" className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Traits
                    </TabsTrigger>
                    <TabsTrigger value="food" className="flex items-center gap-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 12H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.5 15L15.5 12L12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.5 20C18.8807 20 20 18.8807 20 17.5C20 16.1193 18.8807 15 17.5 15C16.1193 15 15 16.1193 15 17.5C15 18.8807 16.1193 20 17.5 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Food
                    </TabsTrigger>
                    <TabsTrigger value="training" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Training
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="traits" className="p-6 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold mb-4">Common Traits</h3>
                    <div className="space-y-4">
                      {petData.commonTraits.map((trait, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span>{trait.trait}</span>
                            <span className="font-medium">{trait.percentage}%</span>
                          </div>
                          <Progress value={trait.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 bg-pet-green/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">About {petData.breed}s</h4>
                      <p className="text-sm text-gray-700">
                        Maine Coons are one of the largest domestic cat breeds and are known for their intelligence and playful, gentle personality. They are often called the "gentle giants" of cats. They typically have a rectangular body shape, luxurious long fur, and a long, bushy tail.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="food" className="p-6 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold mb-4">Recommended Food</h3>
                    <div className="space-y-4">
                      {petData.foodRecommendations.map((food, index) => (
                        <Card key={index} className="bg-pet-peach/30 border-0">
                          <CardContent className="p-4">
                            <h4 className="font-medium">{food.name}</h4>
                            <p className="text-sm text-gray-700 mt-1">{food.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <h4 className="font-medium mb-2">Feeding Tips</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li>Feed adult cats twice a day</li>
                        <li>Ensure fresh water is always available</li>
                        <li>Monitor weight and adjust portions accordingly</li>
                        <li>Transition to new foods gradually over 7-10 days</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="training" className="p-6 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold mb-4">Training Tips</h3>
                    <div className="space-y-4">
                      {petData.trainingTips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-pet-purple w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-primary font-medium">{index + 1}</span>
                          </div>
                          <div className="bg-pet-purple/20 rounded-lg p-3 flex-1">
                            <p>{tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Link to="/chatbot">
                        <Button className="pet-btn-secondary">
                          Get More Training Help from PetBot
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-pet-blue to-pet-green border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <svg className="h-8 w-8 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="text-lg font-bold">Care Calendar</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Create a personalized care calendar based on your pet's needs.
                      </p>
                      <Button className="w-full bg-white text-primary hover:bg-gray-100">
                        Generate Calendar
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-pet-yellow to-pet-peach border-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <svg className="h-8 w-8 text-primary mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5"/>
                        </svg>
                        <h3 className="text-lg font-bold">Comparison</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Compare your pet with standard breed characteristics.
                      </p>
                      <Button className="w-full bg-white text-primary hover:bg-gray-100">
                        Show Comparison
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;
