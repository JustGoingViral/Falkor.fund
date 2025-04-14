import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import NotFound from "@/pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard.tsx";
import Properties from "./pages/Properties";
import Market from "./pages/Market";
import Terminal from "./pages/Terminal";
import Explorer from "./pages/Explorer";
import Home from "./pages/Home";
import { InvestorProvider } from "./contexts/InvestorContext";
import { handleError } from "./lib/errorHandler";
import { Component, ErrorInfo, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Error boundary with Mark Twain style errors
class AppErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Show toast with Twain-style error
    const twainMessage = handleError(error);
    toast({
      title: "An Error Occurred",
      description: twainMessage,
      variant: "destructive"
    });
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error ? handleError(this.state.error) : 
        "Like a riverboat caught in the fog, we've run aground on unforeseen troubles.";
      
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Trouble on the Mississippi!</h1>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md"
            >
              Try charting a new course
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={Properties} />
      <Route path="/market" component={Market} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/explorer" component={Explorer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // State for tracking if Falkor Exchange is loading
  const [isLaunchingFalkor, setIsLaunchingFalkor] = useState(false);
  
  // Function to handle opening Falkor Exchange
  const handleLaunchFalkorExchange = async () => {
    setIsLaunchingFalkor(true);
    
    try {
      // First, ping the Falkor Exchange to ensure it's available
      const response = await fetch('/falkor/health', { 
        method: 'HEAD',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        // Exchange is ready, open it in a new tab
        window.open('/falkor', '_blank');
        
        toast({
          title: "Falkor Exchange Ready",
          description: "The trading platform is opening in a new tab",
          variant: "default"
        });
      } else {
        // Exchange responded but with an error
        toast({
          title: "Falkor Exchange Starting",
          description: "The trading platform is warming up, please try again in a moment",
          variant: "default"
        });
      }
    } catch (error) {
      // Exchange is not ready yet or there was an error
      toast({
        title: "Falkor Exchange Starting",
        description: "The trading platform is still initializing. Please try again in a moment.",
        variant: "default"
      });
    } finally {
      setIsLaunchingFalkor(false);
    }
  };

  return (
    <AppErrorBoundary>
      <InvestorProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Router />
            
            {/* Fixed position Falkor Exchange launch button */}
            <div className="fixed bottom-20 right-8 z-50">
              <Button
                onClick={handleLaunchFalkorExchange}
                disabled={isLaunchingFalkor}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 px-6"
              >
                {isLaunchingFalkor ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Launch Falkor Exchange</span>
                  </>
                )}
              </Button>
            </div>
            
            <Footer />
          </div>
          <Toaster />
        </QueryClientProvider>
      </InvestorProvider>
    </AppErrorBoundary>
  );
}

export default App;
