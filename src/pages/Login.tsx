
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // This would be where you integrate with Google Auth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/upload');
    }, 1500);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/upload');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 animate-bounce-in">
        <div className="text-center">
          <div className="flex justify-center">
            <span className="inline-block w-16 h-16 bg-pet-blue rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 mx-auto mt-3">
                <path fill="#3B82F6" d="M256,224c-79.41,0-192,122.76-192,200.25,0,34.9,26.81,55.75,71.74,55.75,48.84,0,81.45-25.08,120.26-25.08,39.59,0,71.85,25.08,120.26,25.08,44.93,0,71.74-20.85,71.74-55.75C448,346.76,335.41,224,256,224zm-147.28-12.61c-7.46,0-14.73-1.87-21.2-5.61L32.33,178.26a16,16,0,0,1,17.61-26.82l55.19,27.52a16,16,0,0,1,7.13,21.47A16.26,16.26,0,0,1,108.72,211.39Zm290.56,0a16.26,16.26,0,0,1-14.54-10.2,16,16,0,0,1,7.13-21.47l55.19-27.52a16,16,0,0,1,17.61,26.82l-55.19,27.52C414,209.52,406.74,211.39,399.28,211.39ZM279.2,108.8a16,16,0,0,1-14.42-8.91L243.31,54.44a16,16,0,1,1,28.85-13.9l21.47,45.46a16,16,0,0,1-14.43,23.09ZM232.8,108.8a16,16,0,0,1-14.43-23.09l21.47-45.46a16,16,0,1,1,28.85,13.9L247.22,99.89A16,16,0,0,1,232.8,108.8Z"/>
              </svg>
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800">Welcome to Pet Guide</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access personalized pet care analysis
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="flex items-center justify-between">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500 bg-white">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
              />
            </div>

            <div>
              <Button
                className="w-full pet-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={handleGuestLogin}
                className="text-primary hover:underline font-medium"
                disabled={isLoading}
              >
                Continue as Guest <ArrowRight className="ml-1 h-4 w-4 inline" />
              </button>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">
              Don't have an account?{' '}
              <Link to="#" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
