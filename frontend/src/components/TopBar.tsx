import React from 'react';
import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { buildWhatsAppEnquiryLink } from '@/utils/whatsappLinkBuilder';

export default function TopBar() {
  const whatsappLink = buildWhatsAppEnquiryLink({
    name: '',
    destination: '',
    travelDate: '',
    persons: '',
  });

  return (
    <div className="bg-primary text-primary-foreground text-xs py-2">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
        <p className="font-medium tracking-wide text-center sm:text-left">
          ✈️ <span className="font-bold">Joyguru Travels</span> — Your Trusted Travel Partner for Domestic &amp; International Tours
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors font-semibold whitespace-nowrap"
        >
          <SiWhatsapp className="w-3.5 h-3.5" />
          <Phone className="w-3 h-3" />
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
