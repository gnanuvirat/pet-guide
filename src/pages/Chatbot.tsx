
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Dog, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{
    id: number;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>>([
    {
      id: 1,
      content: "Hi there! I'm PetBot, your AI pet care assistant. How can I help you with your pet today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample suggestions for the user to select
  const suggestions = [
    "What food is best for my pet?",
    "How much exercise does my pet need?",
    "My pet is scratching a lot, what should I do?",
    "How do I train my pet to stop biting?"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      generateBotResponse(inputValue);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: suggestion,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      generateBotResponse(suggestion);
      setLoading(false);
    }, 1500);
  };

  // Simulate AI responses (in a real app, this would call an API)
  const generateBotResponse = (userInput: string) => {
    let response = '';
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('food') || lowercaseInput.includes('eat')) {
      response = "For optimal nutrition, I recommend a balanced diet appropriate for your pet's age, size, and breed. High-quality commercial pet foods often provide complete nutrition. Always ensure fresh water is available, and limit treats to 10% of their daily caloric intake. Would you like specific brand recommendations?";
    } else if (lowercaseInput.includes('exercise') || lowercaseInput.includes('play')) {
      response = "Most dogs need 30-60 minutes of exercise daily, while cats benefit from several short play sessions. Exercise needs vary by breed, age, and health status. Interactive toys can provide mental stimulation along with physical activity. Would you like some exercise game ideas?";
    } else if (lowercaseInput.includes('scratch') || lowercaseInput.includes('itch')) {
      response = "Scratching can indicate parasites, allergies, dry skin, or anxiety. Check for fleas or ticks, look for red or irritated skin, and monitor for other symptoms. If scratching persists for more than a few days or is causing hair loss or skin damage, consult your veterinarian.";
    } else if (lowercaseInput.includes('train') || lowercaseInput.includes('bite')) {
      response = "To discourage biting, provide appropriate chew toys, use positive reinforcement when they play gently, and avoid rough play that encourages biting. If your pet bites, say 'ouch' loudly and stop playtime immediately. Consistency is key in training. Would you like more specific training tips?";
    } else {
      response = "That's an interesting question about your pet! To give you the best advice, could you provide more details about your pet's breed, age, and the specific situation you're dealing with?";
    }
    
    const botMessage = {
      id: messages.length + 2,
      content: response,
      sender: 'bot' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PetBot</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your AI pet care assistant
          </p>
        </div>
        
        <Card className="bg-white animate-bounce-in">
          <CardContent className="p-0">
            {/* Chat Header */}
            <div className="bg-primary text-white p-4 rounded-t-lg flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <Dog className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">PetBot</h2>
                <p className="text-xs opacity-75">AI Pet Care Assistant • Always Online</p>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-4 bg-pet-blue/20">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div 
                      className={`rounded-full p-2 flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-primary ml-3' : 'bg-white mr-3'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Dog className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div 
                      className={`max-w-xs sm:max-w-md rounded-2xl p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white shadow-sm rounded-tl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p 
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="flex">
                    <div className="bg-white rounded-full p-2 mr-3 flex items-center justify-center">
                      <Dog className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none shadow-sm p-3">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="h-3 w-3 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-3 w-3 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-r-none"
                  disabled={loading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={loading || inputValue.trim() === ''}
                  className="rounded-l-none"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Quick Suggestions */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={loading}
                      className="bg-pet-blue/50 hover:bg-pet-blue py-1 px-3 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          <Card className="bg-pet-peach/30 border-0">
            <CardContent className="p-5">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Assistance</h3>
              <p className="text-gray-700">
                PetBot is always available to answer your pet care questions, any time of day or night.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-pet-green/30 border-0">
            <CardContent className="p-5">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Knowledge</h3>
              <p className="text-gray-700">
                Access a wealth of information about pet health, training, nutrition, and behavior.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-pet-yellow/30 border-0">
            <CardContent className="p-5">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Personalized Advice</h3>
              <p className="text-gray-700">
                Get tailored recommendations based on your pet's unique characteristics and needs.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center text-gray-500 text-sm animate-fade-in-up">
          <p>
            Note: While PetBot provides helpful information, it should not replace professional veterinary care.
            Always consult with a veterinarian for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
