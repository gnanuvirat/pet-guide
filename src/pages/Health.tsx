
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Health = () => {
  const [activeTabContent, setActiveTabContent] = useState('medications');
  
  // Mock data - in a real app, this would come from an API
  const healthData = {
    medications: [
      {
        name: 'Healthy Joint Supplement',
        type: 'Supplement',
        description: 'A daily supplement to maintain joint health and mobility as your pet ages.',
        schedule: 'Daily',
        priorities: ['Preventive', 'Mobility'],
        ingredients: ['Glucosamine', 'Chondroitin', 'Omega-3 Fatty Acids', 'MSM'],
        dosage: 'Based on weight: 500mg per 25lbs of body weight',
        notes: 'Best given with food. Results may take 4-6 weeks to be noticeable.'
      },
      {
        name: 'Skin & Coat Formula',
        type: 'Supplement',
        description: 'Supports healthy skin and reduces shedding for a shiny coat.',
        schedule: 'Daily',
        priorities: ['Maintenance', 'Skin Health'],
        ingredients: ['Omega-3 Fatty Acids', 'Biotin', 'Zinc', 'Vitamin E'],
        dosage: '1 chew per day for dogs under 50lbs, 2 chews for larger dogs',
        notes: 'Can help reduce seasonal shedding and itching.'
      },
      {
        name: 'Dental Care Chews',
        type: 'Dental',
        description: 'Helps reduce plaque and tartar for better dental health.',
        schedule: 'Daily',
        priorities: ['Preventive', 'Dental'],
        ingredients: ['Natural Abrasives', 'Mint Flavor', 'Chlorophyll'],
        dosage: '1 chew daily',
        notes: 'Not a replacement for regular dental cleanings, but helps maintain health between visits.'
      }
    ],
    vaccinations: [
      {
        name: 'Rabies',
        status: 'Recommended',
        schedule: 'Every 3 years after initial series',
        description: 'Required by law in most areas. Protects against rabies virus.',
        nextDue: 'March 2026'
      },
      {
        name: 'DHPP',
        status: 'Recommended',
        schedule: 'Every 3 years after initial series',
        description: 'Core vaccine protecting against distemper, hepatitis, parainfluenza, and parvovirus.',
        nextDue: 'October 2025'
      },
      {
        name: 'Bordetella',
        status: 'Optional',
        schedule: 'Annually',
        description: 'Recommended for dogs that frequent daycare, boarding facilities, or dog parks.',
        nextDue: 'January 2026'
      },
      {
        name: 'Leptospirosis',
        status: 'Consider',
        schedule: 'Annually',
        description: 'Recommended for dogs with exposure to wildlife, standing water, or who live in areas with leptospirosis outbreaks.',
        nextDue: 'Not scheduled'
      }
    ],
    checkups: [
      {
        type: 'Annual Wellness Exam',
        description: 'Comprehensive physical examination and health assessment.',
        recommendation: 'Scheduled yearly, more frequently for senior pets.',
        lastDate: 'October 15, 2024',
        nextDate: 'October 2025'
      },
      {
        type: 'Dental Cleaning',
        description: 'Professional cleaning to remove plaque and tartar.',
        recommendation: 'Every 1-2 years depending on oral health.',
        lastDate: 'Not performed yet',
        nextDate: 'Consider scheduling'
      },
      {
        type: 'Bloodwork',
        description: 'Complete blood count and biochemistry panel to screen for health issues.',
        recommendation: 'Annually, more frequently for senior pets or those with health conditions.',
        lastDate: 'October 15, 2024',
        nextDate: 'October 2025'
      }
    ],
    healthIssues: [
      {
        condition: 'Joint Health',
        risk: 'Medium',
        description: 'Based on breed and activity levels, your pet may be at increased risk for joint issues as they age.',
        prevention: [
          'Maintain healthy weight to reduce stress on joints',
          'Regular, appropriate exercise without overexertion',
          'Consider joint supplements preventatively',
          'Provide comfortable bedding'
        ]
      },
      {
        condition: 'Dental Disease',
        risk: 'High',
        description: 'Many pets develop dental disease by age 3. Regular care is essential.',
        prevention: [
          'Daily tooth brushing with pet-safe toothpaste',
          'Dental chews and toys designed for oral health',
          'Regular professional cleanings',
          'Annual dental examinations'
        ]
      },
      {
        condition: 'Obesity',
        risk: 'Low',
        description: 'Your pet currently maintains a healthy weight, but obesity is common and can lead to many health issues.',
        prevention: [
          'Measure food portions accurately',
          'Limit treats to less than 10% of daily caloric intake',
          'Regular exercise appropriate for age and breed',
          'Regular weight check-ups'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Health & Medication</h1>
          <p className="mt-2 text-lg text-gray-600">
            Personalized health recommendations for your pet
          </p>
        </div>
        
        <Tabs 
          defaultValue="medications" 
          className="w-full animate-bounce-in"
          onValueChange={(value) => setActiveTabContent(value)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 21H16C17.1046 21 18 20.1046 18 19V8.5C18 8.23478 17.8946 7.98043 17.7071 7.79289L12.2071 2.29289C12.0196 2.10536 11.7652 2 11.5 2H8C6.89543 2 6 2.89543 6 4V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Medications
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 4.5L12 2L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.5 19.5L12 22L14.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 9.5L2 12L4.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.5 14.5L22 12L19.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Vaccinations
            </TabsTrigger>
            <TabsTrigger value="checkups" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-ups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="medications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthData.medications.map((med, index) => (
                <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{med.name}</CardTitle>
                        <p className="text-sm text-gray-500">{med.type}</p>
                      </div>
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 21H16C17.1046 21 18 20.1046 18 19V8.5C18 8.23478 17.8946 7.98043 17.7071 7.79289L12.2071 2.29289C12.0196 2.10536 11.7652 2 11.5 2H8C6.89543 2 6 2.89543 6 4V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{med.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {med.priorities.map((priority, i) => (
                        <Badge key={i} variant="outline" className="bg-pet-blue/30 border-0">
                          {priority}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Schedule:</span> {med.schedule}
                      </div>
                      <div>
                        <span className="font-medium">Dosage:</span> {med.dosage}
                      </div>
                      <div>
                        <span className="font-medium">Notes:</span> {med.notes}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <details className="text-sm">
                        <summary className="font-medium cursor-pointer">Ingredients</summary>
                        <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
                          {med.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 bg-pet-peach/40 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Important Note</h3>
                  <p className="text-gray-700">
                    These recommendations are based on AI analysis and are not a replacement for veterinary advice.
                    Always consult with a veterinarian before starting any new medication or supplement regimen for your pet.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vaccinations" className="mt-6">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Recommended Vaccinations</h3>
                <p className="text-gray-600 mb-6">
                  Based on your pet's breed, age, and lifestyle, we recommend the following vaccination schedule.
                </p>
                
                <div className="space-y-6">
                  {healthData.vaccinations.map((vaccine, index) => (
                    <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">{vaccine.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            vaccine.status === 'Recommended' ? 'bg-green-100 text-green-800' :
                            vaccine.status === 'Optional' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          } border-0`}
                        >
                          {vaccine.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{vaccine.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                        <div className="bg-pet-gray rounded-lg p-3">
                          <span className="font-medium">Schedule:</span> {vaccine.schedule}
                        </div>
                        <div className="bg-pet-gray rounded-lg p-3">
                          <span className="font-medium">Next Due:</span> {vaccine.nextDue}
                        </div>
                      </div>
                      {index < healthData.vaccinations.length - 1 && <hr className="my-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-pet-green to-pet-blue/50 border-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-lg font-bold">Vaccination Record</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Keep track of your pet's vaccination history and upcoming appointments.
                  </p>
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    Download Record
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-pet-purple/30 border-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-lg font-bold">Schedule Reminder</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Set up automatic reminders for upcoming vaccinations and boosters.
                  </p>
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    Set Reminders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="checkups" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="h-full animate-bounce-in">
                  <CardHeader>
                    <CardTitle>Health Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Potential Health Issues</h3>
                    
                    <div className="space-y-6">
                      {healthData.healthIssues.map((issue, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{issue.condition}</h4>
                            <Badge 
                              variant="outline" 
                              className={`${
                                issue.risk === 'Low' ? 'bg-green-100 text-green-800' :
                                issue.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              } border-0`}
                            >
                              {issue.risk} Risk
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <Button className="w-full pet-btn-primary">
                        Consult Vet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card className="animate-fade-in-up">
                  <CardHeader>
                    <CardTitle>Recommended Check-ups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {healthData.checkups.map((checkup, index) => (
                        <div key={index} className="bg-pet-gray/50 rounded-lg p-4 animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-lg">{checkup.type}</h4>
                            <Badge variant="outline" className={checkup.lastDate.includes('Not') ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                              {checkup.lastDate.includes('Not') ? 'Schedule Needed' : 'Up to Date'}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{checkup.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium">Recommendation:</span> {checkup.recommendation}
                            </div>
                            <div>
                              <span className="font-medium">Last Performed:</span> {checkup.lastDate}
                            </div>
                            <div className="sm:col-span-2">
                              <span className="font-medium">Next Due:</span> {checkup.nextDate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link to="/chatbot" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Card className="h-full bg-pet-yellow/30 border-0 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2">Have Health Questions?</h3>
                        <p className="text-gray-700 mb-4">
                          Chat with PetBot about your pet's health and get instant answers.
                        </p>
                        <Button className="bg-white text-primary hover:bg-gray-100 w-full flex items-center justify-center">
                          Ask PetBot <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <Card className="h-full bg-gradient-to-r from-pet-pink to-pet-peach border-0">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2">Emergency Information</h3>
                        <p className="text-gray-700 mb-4">
                          Save your local emergency vet information for quick access.
                        </p>
                        <Button className="bg-white text-primary hover:bg-gray-100 w-full">
                          Set Emergency Contacts
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {activeTabContent === 'medications' && (
          <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Need Personalized Advice?</h3>
                <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.9 20L8 22L8.9 20Z" fill="currentColor" />
                  <path d="M16 20.5C16.5523 20.5 17 20.0523 17 19.5C17 18.9477 16.5523 18.5 16 18.5V20.5ZM16 18.5C15.4477 18.5 15 18.9477 15 19.5C15 20.0523 15.4477 20.5 16 20.5V18.5ZM8.9 20L8.2 18.1C7.9 18.2 7.6 18.4 7.5 18.7C7.4 19 7.3 19.4 7.5 19.7L8.9 20ZM16 18.5H8.9V20.5H16V18.5ZM9.6 21.9L11.6 19.9L10.2 18.5L8.2 20.5L9.6 21.9ZM12 19.5C12 19 11.8 18.5 11.6 18.1L10.2 19.5H12ZM11.6 18.1C11.3 17.7 10.8 17.5 10.3 17.5L10.3 19.5C10.7 19.5 11.1 19.7 11.3 20.1L11.6 18.1ZM10.3 17.5H8.9V19.5H10.3V17.5ZM9.6 18.1L8 22L9.8 22.8L11.4 18.9L9.6 18.1Z" fill="currentColor" />
                  <path d="M16 11.5C19.0376 11.5 21.5 9.0376 21.5 6C21.5 2.96243 19.0376 0.5 16 0.5C12.9624 0.5 10.5 2.96243 10.5 6C10.5 9.0376 12.9624 11.5 16 11.5Z" fill="currentColor" />
                  <path d="M0.5 19.5C0.5 14.8056 4.30558 11 9 11H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                Connect with a licensed veterinarian for personalized medication advice tailored to your pet's unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 pet-btn-primary">
                  Find Local Vets
                </Button>
                <Button variant="outline" className="flex-1">
                  Online Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;
