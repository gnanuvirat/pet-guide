
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Behavior from "./pages/Behavior";
import Health from "./pages/Health";
import Chatbot from "./pages/Chatbot";
import ApiDocs from "./pages/ApiDocs";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/upload" element={<Upload />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/behavior" element={<Behavior />} />
              <Route path="/health" element={<Health />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/api-docs" element={<ApiDocs />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
