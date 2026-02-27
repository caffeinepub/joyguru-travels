import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateBooking } from '../hooks/useQueries';
import type { Flight } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Plane, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface FlightSearchResultsProps {
  flights: Flight[];
  departure: string;
  arrival: string;
  onBack: () => void;
}

export default function FlightSearchResults({ flights, departure, arrival, onBack }: FlightSearchResultsProps) {
  const { identity } = useInternetIdentity();
  const createBooking = useCreateBooking();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengerName, setPassengerName] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const isAuthenticated = !!identity;

  const handleBookFlight = (flight: Flight) => {
    if (!isAuthenticated) {
      toast.error('Please login to book a flight');
      return;
    }
    setSelectedFlight(flight);
    setShowBookingDialog(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedFlight || !passengerName.trim()) {
      toast.error('Please enter passenger name');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        flightId: selectedFlight.id,
        packageId: null,
        passengerName,
      });
      toast.success(`Booking confirmed! Booking ID: ${bookingId.toString()}`);
      setShowBookingDialog(false);
      setPassengerName('');
      setSelectedFlight(null);
    } catch (error) {
      toast.error('Failed to create booking');
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container py-10 lg:py-12">
      <Button variant="ghost" onClick={onBack} className="mb-8 hover:bg-accent">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Search
      </Button>

      <div className="mb-10 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Flights from {departure} to {arrival}
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground">
          {flights.length} {flights.length === 1 ? 'flight' : 'flights'} found
        </p>
      </div>

      {flights.length === 0 ? (
        <Card className="text-center py-16 shadow-medium border-2">
          <CardContent className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
              <Plane className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">No flights found</h3>
              <p className="text-base text-muted-foreground mb-6">
                Try searching for different locations or dates
              </p>
              <Button onClick={onBack} size="lg">Search Again</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {flights.map((flight) => (
            <Card key={flight.id.toString()} className="hover:shadow-medium transition-all duration-300 border-2">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <CardTitle className="text-xl lg:text-2xl">{flight.airline}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {formatDate(flight.date)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl lg:text-4xl font-bold text-primary">
                      ${flight.price.toString()}
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4 p-5 rounded-lg bg-gradient-to-r from-muted/30 to-muted/50">
                  <div className="flex-1">
                    <div className="text-2xl lg:text-3xl font-bold">{flight.departure}</div>
                    <div className="text-sm text-muted-foreground mt-1">Departure</div>
                  </div>
                  <div className="flex-shrink-0 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 bg-border"></div>
                      <Plane className="h-6 w-6 text-primary" />
                      <div className="h-px w-8 bg-border"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-2xl lg:text-3xl font-bold">{flight.arrival}</div>
                    <div className="text-sm text-muted-foreground mt-1">Arrival</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Available seats:</span>
                  <span className="font-semibold text-foreground">{flight.availableSeats.toString()}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className="w-full shadow-sm" 
                  size="lg"
                  onClick={() => handleBookFlight(flight)}
                  disabled={flight.availableSeats === BigInt(0)}
                >
                  {flight.availableSeats === BigInt(0) ? 'Sold Out' : 'Book Now'}
                  {flight.availableSeats !== BigInt(0) && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl">Confirm Booking</DialogTitle>
            <DialogDescription className="text-base">
              Please enter passenger details to complete your booking
            </DialogDescription>
          </DialogHeader>
          {selectedFlight && (
            <div className="space-y-6 pt-2">
              <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-primary/20 space-y-3">
                <div className="font-semibold text-lg">{selectedFlight.airline}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{selectedFlight.departure}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-medium">{selectedFlight.arrival}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(selectedFlight.date)}
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-primary pt-2">
                  ${selectedFlight.price.toString()}
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="passengerName" className="text-sm font-semibold">Passenger Name</Label>
                <Input
                  id="passengerName"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Enter full name as on ID"
                  className="h-11"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  onClick={() => setShowBookingDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 shadow-sm"
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={createBooking.isPending}
                >
                  {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

