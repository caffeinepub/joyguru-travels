interface WhatsAppEnquiryData {
  name?: string;
  destination?: string;
  travelDate?: string;
  persons?: string;
}

export function buildWhatsAppEnquiryLink(data: WhatsAppEnquiryData = {}): string {
  const phoneNumber = '919531757771';
  
  const message = `Hello, I would like to enquire about a trip.
Name: ${data.name || ''}
Destination: ${data.destination || ''}
Travel Date: ${data.travelDate || ''}
Number of Persons: ${data.persons || ''}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
