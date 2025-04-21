
import { Link } from 'react-router-dom';
import { ArrowRight, Dog, Cat, Upload, MessageSquare, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Landing = () => {
  const features = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: 'Easy Upload',
      description: 'Quickly upload photos or videos of your pet for instant analysis'
    },
    {
      icon: <Dog className="h-10 w-10 text-primary" />,
      title: 'Breed Identification',
      description: 'Advanced AI accurately identifies breed, age, and unique traits'
    },
    {
      icon: <Cat className="h-10 w-10 text-primary" />,
      title: 'Behavior Analysis',
      description: 'Get insights into your pet\'s behavior patterns and needs'
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Health Recommendations',
      description: 'Receive customized health advice and medication suggestions'
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: 'AI Chat Assistant',
      description: 'Chat with PetBot for real-time answers to your pet care questions'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pet-gradient py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                The AI-Powered Pet Care Assistant
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Upload a photo or video of your pet and get instant insights on breed, age, behavior, and personalized care recommendations.
              </p>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link to="/upload">
                  <button className="pet-btn-primary flex items-center">
                    Start Pet Analysis <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
              <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-gray-600 italic">
                  "Pet Guide helped me understand my rescue dog's needs better than any vet could explain. Highly recommended!"
                </p>
                <p className="text-gray-800 font-medium mt-2">— Sarah & Max the Golden Retriever</p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-pet-yellow rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pet-pink rounded-full opacity-60"></div>
                <img 
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Cute pet" 
                  className="w-full max-w-md rounded-3xl shadow-lg relative z-10 animate-bounce-in"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How Pet Guide Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Our AI-powered platform analyzes photos and videos to provide personalized insights for your pet
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="pet-card p-6 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="bg-pet-blue inline-block p-3 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-pet-purple">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to better understand your pet?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Upload a photo now and get instant AI-powered insights about your furry friend
          </p>
          <Link to="/upload">
            <button className="pet-btn-primary inline-flex items-center">
              Start Pet Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <p className="mt-4 text-gray-600">
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
