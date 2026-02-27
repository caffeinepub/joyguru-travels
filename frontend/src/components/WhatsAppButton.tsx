import { MessageCircle } from 'lucide-react';
import { buildWhatsAppEnquiryLink } from '../utils/whatsappLinkBuilder';

export default function WhatsAppButton() {
  const displayNumber = '+91 9531757771';
  const whatsappUrl = buildWhatsAppEnquiryLink();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 md:px-5 md:py-4"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      <span className="text-sm font-semibold md:text-base">{displayNumber}</span>
    </a>
  );
}
