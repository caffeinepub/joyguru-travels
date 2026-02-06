import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-10 lg:py-12">
        <div className="text-center space-y-6">
          <div>
            <p className="text-lg font-semibold text-foreground mb-4">Joyguru Travels</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:somenath110d@gmail.com" className="hover:underline">
                  somenath110d@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919531757771" className="hover:underline">
                  +91 9531757771
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Junbedia Road By Pass more, Bankura, West Bengal, India</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2025. Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500 mx-0.5" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline transition-colors"
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

