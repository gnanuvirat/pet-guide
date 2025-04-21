
import { Link } from 'react-router-dom';
import { Heart, Mail, MessageSquare, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pet-blue py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="inline-block w-8 h-8 bg-white rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mx-auto my-1">
                  <path fill="#3B82F6" d="M256,224c-79.41,0-192,122.76-192,200.25,0,34.9,26.81,55.75,71.74,55.75,48.84,0,81.45-25.08,120.26-25.08,39.59,0,71.85,25.08,120.26,25.08,44.93,0,71.74-20.85,71.74-55.75C448,346.76,335.41,224,256,224zm-147.28-12.61c-7.46,0-14.73-1.87-21.2-5.61L32.33,178.26a16,16,0,0,1,17.61-26.82l55.19,27.52a16,16,0,0,1,7.13,21.47A16.26,16.26,0,0,1,108.72,211.39Zm290.56,0a16.26,16.26,0,0,1-14.54-10.2,16,16,0,0,1,7.13-21.47l55.19-27.52a16,16,0,0,1,17.61,26.82l-55.19,27.52C414,209.52,406.74,211.39,399.28,211.39ZM279.2,108.8a16,16,0,0,1-14.42-8.91L243.31,54.44a16,16,0,1,1,28.85-13.9l21.47,45.46a16,16,0,0,1-14.43,23.09ZM232.8,108.8a16,16,0,0,1-14.43-23.09l21.47-45.46a16,16,0,1,1,28.85,13.9L247.22,99.89A16,16,0,0,1,232.8,108.8Z"/>
                </svg>
              </span>
              <span className="font-bold text-xl text-primary">Pet Guide</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your AI-powered companion for all pet care needs.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white rounded-full p-2 transition-colors hover:bg-primary hover:text-white">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 transition-colors hover:bg-primary hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 transition-colors hover:bg-primary hover:text-white">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">Upload</Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-600 hover:text-primary transition-colors">Chatbot</Link>
              </li>
              <li>
                <Link to="/health" className="text-gray-600 hover:text-primary transition-colors">Health & Medication</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Pet Care Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Breed Encyclopedia</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Training Guides</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Nutrition Info</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Health Advice</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-4">
              Have questions or suggestions? Reach out to our team.
            </p>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-gray-700">Made with love for pets</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-200 mt-8 pt-6 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Pet Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
