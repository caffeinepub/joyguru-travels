import { useState } from 'react';
import { MessageCircle, User, MapPin, Calendar, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildWhatsAppEnquiryLink } from '../utils/whatsappLinkBuilder';
import { toast } from 'sonner';

export default function MessageSection() {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [persons, setPersons] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !destination.trim() || !travelDate.trim() || !persons.trim()) {
      toast.error('Please fill in all fields before sending');
      return;
    }

    const link = buildWhatsAppEnquiryLink({
      name: name.trim(),
      destination: destination.trim(),
      travelDate: travelDate.trim(),
      persons: persons.trim(),
    });

    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 lg:py-20 border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Send Us a Message</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-lg mx-auto">
              Didn't find what you were looking for? Tell us your travel plans and we'll get back to you on WhatsApp instantly.
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-medium border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Enquire Now
              </CardTitle>
              <CardDescription>
                Fill in your details and we'll connect with you on WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="msg-name" className="text-sm font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Your Name
                  </Label>
                  <Input
                    id="msg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-11"
                  />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="msg-destination" className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Destination
                  </Label>
                  <Input
                    id="msg-destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where would you like to go?"
                    className="h-11"
                  />
                </div>

                {/* Travel Date */}
                <div className="space-y-2">
                  <Label htmlFor="msg-date" className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Travel Date
                  </Label>
                  <Input
                    id="msg-date"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="h-11"
                  />
                </div>

                {/* Number of Persons */}
                <div className="space-y-2">
                  <Label htmlFor="msg-persons" className="text-sm font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Number of Persons
                  </Label>
                  <Input
                    id="msg-persons"
                    type="number"
                    min="1"
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                    placeholder="How many travellers?"
                    className="h-11"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full shadow-sm bg-[#25D366] hover:bg-[#1ebe5d] text-white mt-2"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Message via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
