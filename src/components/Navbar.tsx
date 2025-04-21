
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Upload, MessageSquare, Heart, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-1" /> },
    { name: 'Upload', path: '/upload', icon: <Upload className="h-5 w-5 mr-1" /> },
    { name: 'Chatbot', path: '/chatbot', icon: <MessageSquare className="h-5 w-5 mr-1" /> },
    { name: 'Vet Help', path: '/health', icon: <Heart className="h-5 w-5 mr-1" /> },
    { name: 'About Us', path: '/about', icon: <Info className="h-5 w-5 mr-1" /> },
  ];

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="inline-block w-8 h-8 bg-pet-blue rounded-full mr-2 animate-float">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mx-auto my-1">
                <path fill="#3B82F6" d="M256,224c-79.41,0-192,122.76-192,200.25,0,34.9,26.81,55.75,71.74,55.75,48.84,0,81.45-25.08,120.26-25.08,39.59,0,71.85,25.08,120.26,25.08,44.93,0,71.74-20.85,71.74-55.75C448,346.76,335.41,224,256,224zm-147.28-12.61c-7.46,0-14.73-1.87-21.2-5.61L32.33,178.26a16,16,0,0,1,17.61-26.82l55.19,27.52a16,16,0,0,1,7.13,21.47A16.26,16.26,0,0,1,108.72,211.39Zm290.56,0a16.26,16.26,0,0,1-14.54-10.2,16,16,0,0,1,7.13-21.47l55.19-27.52a16,16,0,0,1,17.61,26.82l-55.19,27.52C414,209.52,406.74,211.39,399.28,211.39ZM279.2,108.8a16,16,0,0,1-14.42-8.91L243.31,54.44a16,16,0,1,1,28.85-13.9l21.47,45.46a16,16,0,0,1-14.43,23.09ZM232.8,108.8a16,16,0,0,1-14.43-23.09l21.47-45.46a16,16,0,1,1,28.85,13.9L247.22,99.89A16,16,0,0,1,232.8,108.8Z"/>
              </svg>
            </span>
            <span className="font-bold text-2xl text-primary">Pet Guide</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="flex items-center text-gray-600 hover:text-primary transition duration-200"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button variant="outline" className="ml-4">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-4 pb-6 px-6 animate-fade-in-up">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center py-2 text-gray-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full mt-2">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
