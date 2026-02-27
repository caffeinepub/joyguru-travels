import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { buildWhatsAppEnquiryLink } from '../utils/whatsappLinkBuilder';

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    travelDate: '',
    persons: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.destination.trim()) {
      toast.error('Please enter your destination');
      return;
    }
    if (!formData.travelDate.trim()) {
      toast.error('Please enter your travel date');
      return;
    }
    if (!formData.persons.trim()) {
      toast.error('Please enter number of persons');
      return;
    }

    const whatsappUrl = buildWhatsAppEnquiryLink({
      name: formData.name,
      destination: formData.destination,
      travelDate: formData.travelDate,
      persons: formData.persons,
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp...');
  };

  return (
    <div className="container py-16 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-medium border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl lg:text-3xl">Send us a Message</CardTitle>
            <CardDescription className="text-base">
              Fill out the form below and we'll get back to you via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-semibold">
                  Destination *
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Where do you want to go?"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelDate" className="text-sm font-semibold">
                  Travel Date *
                </Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="persons" className="text-sm font-semibold">
                  Number of Persons *
                </Label>
                <Input
                  id="persons"
                  type="number"
                  min="1"
                  value={formData.persons}
                  onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                  placeholder="How many people?"
                  className="h-11"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full shadow-sm"
                size="lg"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
