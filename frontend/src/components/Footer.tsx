import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import type { Page } from '@/App';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'joyguru-travels');

  return (
    <footer className="bg-card border-t border-border text-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/assets/generated/joyguru-travels-logo-transparent.dim_300x100.png"
                alt="Joyguru Travels"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Your trusted travel partner for unforgettable journeys across India and the world. We craft experiences that last a lifetime.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919531757771"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-green-500/10 hover:text-green-500 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {(
                [
                  { label: 'Home', page: 'home' },
                  { label: 'Tour Packages', page: 'packages' },
                  { label: 'Flight Search', page: 'flights' },
                  { label: 'Enquiry', page: 'enquiry' },
                  { label: 'Contact Us', page: 'contact' },
                ] as { label: string; page: Page }[]
              ).map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              {['Goa', 'Kerala', 'Himachal Pradesh', 'Rajasthan', 'Dubai', 'Thailand', 'Singapore', 'Bali'].map(dest => (
                <li key={dest}>
                  <span className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
                    {dest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919531757771"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary text-sm transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-primary" />
                  <span>+91 9531757771</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:somenath110d@gmail.com"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary text-sm transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-primary" />
                  <span>somenath110d@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Junbedia Road By Pass more, Bankura, West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>© {currentYear} Joyguru Travels. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{' '}
              <span className="text-red-500 mx-0.5">❤️</span>
              {' '}using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
