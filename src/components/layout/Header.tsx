"use client";

import { useCallback } from "react";
import { FiLogIn, FiUserPlus, FiMenu, FiX } from "react-icons/fi";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogin,
  onRegister,
}: HeaderProps) {
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/80 backdrop-blur-sm border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Text */}
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            TroK!
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLogin}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-lg shadow-orange-500/25 transition-all duration-200"
            >
              <FiLogIn className="w-5 h-5" />
              Login
            </button>
            <button
              onClick={onRegister}
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-medium transition-all duration-200"
            >
              <FiUserPlus className="w-5 h-5" />
              Criar Conta
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-in slide-in-from-top">
            <button
              onClick={() => {
                onLogin();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-lg shadow-orange-500/25 transition-all duration-200"
            >
              <FiLogIn className="w-5 h-5" />
              Login
            </button>
            <button
              onClick={() => {
                onRegister();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-2.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-medium transition-all duration-200"
            >
              <FiUserPlus className="w-5 h-5" />
              Criar Conta
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
