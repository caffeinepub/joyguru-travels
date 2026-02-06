import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Page = 'home' | 'bookings' | 'admin' | 'contact' | 'enquiry';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      onNavigate('home');
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    ...(isAuthenticated ? [{ id: 'bookings' as Page, label: 'My Bookings' }] : []),
    ...(isAdmin ? [{ id: 'admin' as Page, label: 'Admin' }] : []),
    { id: 'contact' as Page, label: 'Contact' },
  ];

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xs">
      <div className="container flex h-20 lg:h-24 items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
          <img 
            src="/assets/generated/joyguru-travels-logo-transparent.dim_300x100.png" 
            alt="Joyguru Travels" 
            className="h-11 w-auto sm:h-12 lg:h-14 transition-transform group-hover:scale-105"
          />
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary tracking-tight transition-colors group-hover:text-primary/90">
            Joyguru Travels
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-all hover:text-primary relative ${
                currentPage === item.id 
                  ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          {isAuthenticated && userProfile && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50">
              <User className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                {userProfile.name}
              </span>
            </div>
          )}
          <Button
            onClick={handleAuth}
            disabled={disabled}
            variant={isAuthenticated ? 'outline' : 'default'}
            className="hidden lg:inline-flex shadow-sm"
            size="default"
          >
            {disabled ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background shadow-soft">
          <nav className="container py-6 flex flex-col gap-4">
            {isAuthenticated && userProfile && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 mb-2">
                <User className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">
                  {userProfile.name}
                </span>
              </div>
            )}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 text-base font-medium transition-colors rounded-lg ${
                  currentPage === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                handleAuth();
                setMobileMenuOpen(false);
              }}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              className="w-full mt-2"
              size="lg"
            >
              {disabled ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
