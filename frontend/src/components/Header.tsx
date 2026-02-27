import React, { useState } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import type { Page } from '@/App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isAdmin: boolean;
}

export default function Header({ currentPage, onNavigate, isAdmin }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      setUserMenuOpen(false);
      onNavigate('home');
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Contact', page: 'contact' },
    { label: 'Enquiry', page: 'enquiry' },
  ];

  if (isAuthenticated) {
    navLinks.push({ label: 'My Bookings', page: 'bookings' });
  }

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 focus:outline-none group"
          >
            <img
              src="/assets/generated/joyguru-travels-logo-transparent.dim_300x100.png"
              alt="Joyguru Travels"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  currentPage === 'admin'
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </button>
            )}
          </nav>

          {/* Auth Controls */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="max-w-[120px] truncate">{userProfile?.name || 'My Account'}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-medium py-1 z-50">
                    <button
                      onClick={() => { onNavigate('bookings'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      My Bookings
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleAuth}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                size="sm"
                className="rounded-full px-5 font-semibold"
              >
                {isLoggingIn ? 'Signing in...' : 'Login'}
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card/98 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => { onNavigate('admin'); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentPage === 'admin'
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Admin
              </button>
            )}
            <div className="border-t border-border mt-2 pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleAuth(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out ({userProfile?.name || 'Account'})
                </button>
              ) : (
                <Button
                  onClick={() => { handleAuth(); setMobileOpen(false); }}
                  disabled={isLoggingIn}
                  className="w-full rounded-lg font-semibold"
                >
                  {isLoggingIn ? 'Signing in...' : 'Login'}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
