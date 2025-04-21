
import { Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Pet Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Helping pet owners understand and care for their furry companions through AI-powered insights
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12 animate-bounce-in">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="bg-pet-blue rounded-full p-6 inline-block">
                <svg className="h-20 w-20 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 19.9V4.1C10.5 2.6 9.86 2 8.27 2H4.23C2.64 2 2 2.6 2 4.1V19.9C2 21.4 2.64 22 4.23 22H8.27C9.86 22 10.5 21.4 10.5 19.9Z" fill="currentColor"/>
                  <path d="M22 19.9V15.9C22 14.4 21.36 13.8 19.77 13.8H15.73C14.14 13.8 13.5 14.4 13.5 15.9V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z" fill="currentColor"/>
                  <path d="M22 8.1V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V8.1C13.5 9.6 14.14 10.2 15.73 10.2H19.77C21.36 10.2 22 9.6 22 8.1Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Pet Guide, we believe every pet deserves the best care possible. Our mission is to make expert pet care knowledge accessible to everyone through innovative AI technology.
              </p>
              <p className="text-gray-700">
                By analyzing photos and videos of your pets, we provide personalized recommendations for health, nutrition, behavior, and training - helping you understand your furry friends better.
              </p>
            </div>
          </div>
          
          <hr className="my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pet-pink/30 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16.01C14.76 16.01 17 13.77 17 11.01C17 8.25 14.76 6.01 12 6.01C9.24 6.01 7 8.25 7 11.01C7 13.77 9.24 16.01 12 16.01Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C16.67 22 22 19.97 22 15.31V15C22 14.45 21.55 14 21 14C18.58 14 16.59 12.88 15.58 11.22C14.95 10.24 13.73 9.96 12.74 10.6C12.26 10.93 11.73 11.13 11.15 11.22C10.8 11.27 10.42 11.4 10.08 11.62C9.28 12.11 8.3 12.38 7.23 12.38C5.41 12.38 3.88 13.18 3.29 14.31C3.11 14.68 3 15.08 3 15.5C3 15.68 3 15.84 3.03 16C3.53 19.58 6.96 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 10V9C2 4 4 2 9 2H15C20 2 22 4 22 9V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced computer vision and machine learning algorithms analyze your pet's physical characteristics and behaviors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pet-green/30 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.25 11H14.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 13.75V8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Personalized Care</h3>
              <p className="text-gray-600">
                Tailored recommendations based on your pet's specific breed, age, and unique characteristics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pet-yellow/30 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Knowledge</h3>
              <p className="text-gray-600">
                Built with insights from veterinarians and animal behaviorists for accurate, reliable guidance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 bg-pet-peach/40 overflow-hidden animate-fade-in-up">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Our Team</h3>
              <p className="text-gray-700 mb-4">
                Pet Guide was created by a dedicated team of animal lovers, veterinarians, AI specialists, and software engineers who share a passion for improving pet care through technology.
              </p>
              <p className="text-gray-700">
                We continuously collaborate with pet care professionals to ensure our platform provides the most accurate and helpful information.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-pet-purple/40 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Privacy & Ethics</h3>
              <p className="text-gray-700 mb-4">
                We respect your privacy and handle all pet data with care. Photos and videos are used solely for analysis purposes and are never shared with third parties without consent.
              </p>
              <p className="text-gray-700">
                Our AI is designed to complement professional veterinary care, not replace it. We always recommend consulting with a vet for medical concerns.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center pb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-red-500 mr-2 animate-pulse" />
            <h2 className="text-2xl font-bold">Join Our Community</h2>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Connect with other pet lovers, share your experiences, and get the latest updates on pet care innovations.
            Together, we can create a world where every pet receives the best possible care.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#1877F2] text-white p-3 rounded-full">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
            </button>
            <button className="bg-[#1DA1F2] text-white p-3 rounded-full">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
              </svg>
            </button>
            <button className="bg-[#E4405F] text-white p-3 rounded-full">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.054-.058 1.37-.058 4.04 0 2.668.01 2.985.058 4.038.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058z"></path>
                <path d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm6.538-8.669a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
