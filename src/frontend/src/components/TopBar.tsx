import { SiWhatsapp } from 'react-icons/si';
import { buildWhatsAppEnquiryLink } from '../utils/whatsappLinkBuilder';

export default function TopBar() {
  const whatsappUrl = buildWhatsAppEnquiryLink();

  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 py-4 shadow-sm">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center sm:text-left leading-relaxed tracking-wide">
            Discover Your Next Adventure — Book flights and explore amazing destinations around the world with Joyguru Travels
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <SiWhatsapp className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#25D366' }} />
            <span className="text-sm sm:text-base md:text-lg font-semibold">+91 9531757771</span>
          </a>
        </div>
      </div>
    </div>
  );
}
