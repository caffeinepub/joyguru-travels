import { useState } from 'react';
import { useIsCallerAdmin, useGetActiveDestinations, useGetActivePackages, useAddDestination, useAddTravelPackage, useAddFlight, useGetAllContacts } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';
import { MapPin, Package, Plane, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: destinations = [] } = useGetActiveDestinations();
  const { data: packages = [] } = useGetActivePackages();
  const { data: contacts = [] } = useGetAllContacts();
  
  const addDestination = useAddDestination();
  const addPackage = useAddTravelPackage();
  const addFlight = useAddFlight();

  // Destination form
  const [destName, setDestName] = useState('');
  const [destDesc, setDestDesc] = useState('');
  const [destImage, setDestImage] = useState<File | null>(null);

  // Package form
  const [pkgDestId, setPkgDestId] = useState('');
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgDetails, setPkgDetails] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgImage, setPkgImage] = useState<File | null>(null);

  // Flight form
  const [flightAirline, setFlightAirline] = useState('');
  const [flightDeparture, setFlightDeparture] = useState('');
  const [flightArrival, setFlightArrival] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightPrice, setFlightPrice] = useState('');
  const [flightSeats, setFlightSeats] = useState('');

  const handleAddDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destImage) {
      toast.error('Please select an image');
      return;
    }

    try {
      const arrayBuffer = await destImage.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);

      await addDestination.mutateAsync({
        name: destName,
        description: destDesc,
        image: blob,
      });

      toast.success('Destination added successfully');
      setDestName('');
      setDestDesc('');
      setDestImage(null);
    } catch (error) {
      toast.error('Failed to add destination');
      console.error(error);
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgImage) {
      toast.error('Please select an image');
      return;
    }

    try {
      const arrayBuffer = await pkgImage.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);

      await addPackage.mutateAsync({
        destinationId: BigInt(pkgDestId),
        title: pkgTitle,
        details: pkgDetails,
        price: BigInt(pkgPrice),
        image: blob,
      });

      toast.success('Package added successfully');
      setPkgDestId('');
      setPkgTitle('');
      setPkgDetails('');
      setPkgPrice('');
      setPkgImage(null);
    } catch (error) {
      toast.error('Failed to add package');
      console.error(error);
    }
  };

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const date = new Date(flightDate);
      const timestamp = BigInt(date.getTime() * 1000000);

      await addFlight.mutateAsync({
        airline: flightAirline,
        departure: flightDeparture,
        arrival: flightArrival,
        date: timestamp,
        price: BigInt(flightPrice),
        seats: BigInt(flightSeats),
      });

      toast.success('Flight added successfully');
      setFlightAirline('');
      setFlightDeparture('');
      setFlightArrival('');
      setFlightDate('');
      setFlightPrice('');
      setFlightSeats('');
    } catch (error) {
      toast.error('Failed to add flight');
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (adminLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage destinations, packages, flights, and more</p>
      </div>

      <Tabs defaultValue="destinations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Add New Destination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDestination} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="destName">Destination Name</Label>
                  <Input
                    id="destName"
                    value={destName}
                    onChange={(e) => setDestName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destDesc">Description</Label>
                  <Textarea
                    id="destDesc"
                    value={destDesc}
                    onChange={(e) => setDestDesc(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destImage">Image</Label>
                  <Input
                    id="destImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setDestImage(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit" disabled={addDestination.isPending}>
                  {addDestination.isPending ? 'Adding...' : 'Add Destination'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Destinations ({destinations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {destinations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-semibold">No destinations found</p>
                  <p className="text-sm mt-1">Add your first destination using the form above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {destinations.map((dest) => (
                    <div key={dest.id.toString()} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={dest.image.getDirectURL()}
                        alt={dest.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{dest.name}</h3>
                        <p className="text-sm text-muted-foreground">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Add New Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPackage} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pkgDestId">Destination ID</Label>
                  <Input
                    id="pkgDestId"
                    type="number"
                    value={pkgDestId}
                    onChange={(e) => setPkgDestId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pkgTitle">Package Title</Label>
                  <Input
                    id="pkgTitle"
                    value={pkgTitle}
                    onChange={(e) => setPkgTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pkgDetails">Details</Label>
                  <Textarea
                    id="pkgDetails"
                    value={pkgDetails}
                    onChange={(e) => setPkgDetails(e.target.value)}
                    rows={6}
                    required
                    placeholder="Enter detailed package information..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pkgPrice">Price ($)</Label>
                  <Input
                    id="pkgPrice"
                    type="number"
                    value={pkgPrice}
                    onChange={(e) => setPkgPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pkgImage">Image</Label>
                  <Input
                    id="pkgImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPkgImage(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit" disabled={addPackage.isPending}>
                  {addPackage.isPending ? 'Adding...' : 'Add Package'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Packages ({packages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {packages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-semibold">No travel packages found</p>
                  <p className="text-sm mt-1">Add your first package using the form above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id.toString()} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={pkg.image.getDirectURL()}
                        alt={pkg.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{pkg.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.details}</p>
                        <p className="text-lg font-bold text-primary mt-1">${pkg.price.toString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Add New Flight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddFlight} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flightAirline">Airline</Label>
                    <Input
                      id="flightAirline"
                      value={flightAirline}
                      onChange={(e) => setFlightAirline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightDate">Date & Time</Label>
                    <Input
                      id="flightDate"
                      type="datetime-local"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightDeparture">Departure</Label>
                    <Input
                      id="flightDeparture"
                      value={flightDeparture}
                      onChange={(e) => setFlightDeparture(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightArrival">Arrival</Label>
                    <Input
                      id="flightArrival"
                      value={flightArrival}
                      onChange={(e) => setFlightArrival(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightPrice">Price ($)</Label>
                    <Input
                      id="flightPrice"
                      type="number"
                      value={flightPrice}
                      onChange={(e) => setFlightPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightSeats">Available Seats</Label>
                    <Input
                      id="flightSeats"
                      type="number"
                      value={flightSeats}
                      onChange={(e) => setFlightSeats(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={addFlight.isPending}>
                  {addFlight.isPending ? 'Adding...' : 'Add Flight'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Submissions ({contacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>
                ) : (
                  contacts.map((contact, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(contact.submissionTime)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      <p className="text-sm">{contact.message}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
