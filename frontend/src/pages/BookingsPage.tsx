import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetUserBookings } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plane, User, Package } from 'lucide-react';

export default function BookingsPage() {
  const { identity } = useInternetIdentity();
  const { data: bookings = [], isLoading } = useGetUserBookings();

  const isAuthenticated = !!identity;

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/15 text-success border-success/30';
      case 'pending':
        return 'bg-warning/15 text-warning border-warning/30';
      case 'cancelled':
        return 'bg-destructive/15 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto text-center shadow-medium border-2">
          <CardHeader className="space-y-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Plane className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Login Required</CardTitle>
            <CardDescription className="text-base">Please login to view your bookings</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 lg:py-16">
      <div className="mb-10 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">My Bookings</h1>
        <p className="text-base lg:text-lg text-muted-foreground">View and manage your flight reservations</p>
      </div>

      {isLoading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-2">
              <CardHeader className="space-y-3">
                <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <Card className="text-center py-16 shadow-medium border-2">
          <CardContent className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
              <Plane className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">No bookings yet</h3>
              <p className="text-base text-muted-foreground">
                Start exploring and book your first flight!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <Card key={booking.id.toString()} className="hover:shadow-medium transition-all duration-300 border-2">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <span>Booking #{booking.id.toString()}</span>
                      <Badge className={`${getStatusColor(booking.status)} border font-semibold`}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Booked on {formatDate(booking.bookingDate)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Passenger</p>
                      <p className="text-sm font-semibold">{booking.passengerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Flight ID</p>
                      <p className="text-sm font-semibold">{booking.flightId.toString()}</p>
                    </div>
                  </div>
                  {booking.packageId && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Package ID</p>
                        <p className="text-sm font-semibold">{booking.packageId.toString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

