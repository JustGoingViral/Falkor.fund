import { Link, useLocation } from "wouter";
import { useState } from "react";
import CoinbaseConnectButton from "./CoinbaseConnectButton";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-emerald-400 font-bold text-2xl tracking-tight">
                X<span className="text-white">Emerald</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute("/dashboard") 
                      ? "bg-slate-800 text-white" 
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/properties"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute("/properties") 
                      ? "bg-slate-800 text-white" 
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Properties
                </Link>
                <Link 
                  href="/market"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute("/market") 
                      ? "bg-slate-800 text-white" 
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Market
                </Link>
                <Link 
                  href="/terminal"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute("/terminal") 
                      ? "bg-slate-800 text-white" 
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Terminal
                </Link>
                <Link 
                  href="/explorer"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute("/explorer") 
                      ? "bg-slate-800 text-white" 
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Explorer
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <CoinbaseConnectButton variant="primary" size="md" />
              <Link href="/properties">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md text-sm font-bold shadow-lg transform transition-transform hover:scale-105 flex items-center space-x-1">
                  <span>Start Investing Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/dashboard"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActiveRoute("/dashboard") 
                ? "bg-slate-800 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/properties"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActiveRoute("/properties") 
                ? "bg-slate-800 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Properties
          </Link>
          <Link 
            href="/market"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActiveRoute("/market") 
                ? "bg-slate-800 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Market
          </Link>
          <Link 
            href="/terminal"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActiveRoute("/terminal") 
                ? "bg-slate-800 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Terminal
          </Link>
          <Link 
            href="/explorer"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActiveRoute("/explorer") 
                ? "bg-slate-800 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Explorer
          </Link>
          <div className="mt-4 flex flex-col space-y-3">
            <div className="flex justify-center">
              <CoinbaseConnectButton variant="primary" size="md" />
            </div>
            <Link href="/properties" onClick={closeMenu}>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md text-base font-bold shadow-lg transform transition-transform hover:scale-105 flex items-center justify-center">
                <span>Start Investing Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
