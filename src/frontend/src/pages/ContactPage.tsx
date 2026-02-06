import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { buildWhatsAppEnquiryLink } from '../utils/whatsappLinkBuilder';

export default function ContactPage() {
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
    <div className="container py-12 lg:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <Card className="shadow-medium border-2">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-base">Fill out the form below and we'll get back to you via WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Name *</Label>
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
                  <Label htmlFor="destination" className="text-sm font-semibold">Destination *</Label>
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
                  <Label htmlFor="travelDate" className="text-sm font-semibold">Travel Date *</Label>
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
                  <Label htmlFor="persons" className="text-sm font-semibold">Number of Persons *</Label>
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
                <Button type="submit" className="w-full shadow-sm" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-medium border-2">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription className="text-base">Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Email</h3>
                    <a 
                      href="mailto:somenath110d@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      somenath110d@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Phone</h3>
                    <a 
                      href="tel:+919531757771"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 9531757771
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Office Address</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Junbedia Road By Pass more<br />
                      Bankura, West Bengal<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-2">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground font-medium">Sunday</span>
                  <span className="font-semibold text-destructive">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
