import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import ProfileSetupModal from './components/ProfileSetupModal';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BookingsPage from './pages/BookingsPage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import EnquiryPage from './pages/EnquiryPage';
import { useState } from 'react';

export type Page = 'home' | 'bookings' | 'admin' | 'contact' | 'enquiry' | 'destinations' | 'packages' | 'flights';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header currentPage={currentPage} onNavigate={handleNavigate} isAdmin={isAdmin} />
        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'bookings' && <BookingsPage />}
          {currentPage === 'admin' && <AdminDashboard />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'enquiry' && <EnquiryPage />}
          {/* destinations, packages, flights fall back to home content for now */}
          {(currentPage === 'destinations' || currentPage === 'packages' || currentPage === 'flights') && (
            <HomePage onNavigate={handleNavigate} />
          )}
        </main>
        <Footer onNavigate={handleNavigate} />
        <WhatsAppButton />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
