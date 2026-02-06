import { useState, useEffect } from 'react';
import { useGetActiveDestinations, useGetActivePackages, useSearchFlights, useGetActiveBlogPosts, useGetActiveTestimonials, useGetFeaturedDestinations } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Plane, Sparkles, BookOpen, Star, Quote, Globe, MapPinned, Clock, Info } from 'lucide-react';
import FlightSearchResults from '../components/FlightSearchResults';
import PackageDetailsDialog from '../components/PackageDetailsDialog';
import { toast } from 'sonner';

type Page = 'home' | 'bookings' | 'admin' | 'contact' | 'enquiry';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: destinations = [], isLoading: destinationsLoading } = useGetActiveDestinations();
  const { data: packages = [], isLoading: packagesLoading, isFetched: packagesFetched } = useGetActivePackages();
  const { data: blogPosts = [], isLoading: blogPostsLoading } = useGetActiveBlogPosts();
  const { data: testimonials = [], isLoading: testimonialsLoading } = useGetActiveTestimonials();
  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedDestinations();
  const searchFlights = useSearchFlights();

  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Developer warning when packages load as empty
  useEffect(() => {
    if (packagesFetched && packages.length === 0) {
      console.warn('⚠️ Travel Packages loaded as empty array. If packages were previously added, they may have been lost during an upgrade or deployment.');
    }
  }, [packagesFetched, packages.length]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departure.trim() || !arrival.trim()) {
      toast.error('Please enter both departure and arrival locations');
      return;
    }

    try {
      await searchFlights.mutateAsync({ departure, arrival });
      setShowResults(true);
    } catch (error) {
      toast.error('Failed to search flights');
      console.error(error);
    }
  };

  if (showResults && searchFlights.data) {
    return (
      <FlightSearchResults
        flights={searchFlights.data}
        departure={departure}
        arrival={arrival}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with 002.png background */}
      <section className="relative h-[450px] md:h-[550px] lg:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/assets/002.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-primary via-primary to-primary/90 py-5 shadow-soft">
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-primary-foreground">
            <Sparkles className="h-5 w-5 lg:h-6 lg:w-6" />
            <p className="text-base lg:text-lg font-semibold tracking-wide">
              Special Offer: Save up to 30% on selected destinations!
            </p>
            <Sparkles className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
      </section>

      {/* Flight Search */}
      <section className="container py-16 lg:py-20">
        <Card className="max-w-4xl mx-auto shadow-medium border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl lg:text-3xl">Search Flights</CardTitle>
            <CardDescription className="text-base">Find the perfect flight for your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Departure
                  </label>
                  <Input
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="e.g., New York"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Arrival
                  </label>
                  <Input
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    placeholder="e.g., London"
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full shadow-sm" size="lg" disabled={searchFlights.isPending}>
                <Search className="mr-2 h-5 w-5" />
                {searchFlights.isPending ? 'Searching...' : 'Search Flights'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Featured Destinations */}
      <section className="container py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">Featured Destinations</h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular travel destinations
          </p>
        </div>
        {destinationsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-56 bg-muted animate-pulse" />
                <CardHeader className="space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Plane className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No destinations available at the moment</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {destinations.map((destination) => (
              <Card key={destination.id.toString()} className="overflow-hidden hover:shadow-medium transition-all duration-300 group border-2">
                <div className="h-56 overflow-hidden">
                  <img
                    src={destination.image.getDirectURL()}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{destination.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{destination.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Holiday Packages */}
      <section className="bg-gradient-to-b from-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Holiday Packages</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated travel packages for unforgettable experiences
            </p>
          </div>
          {packagesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="h-56 bg-muted animate-pulse" />
                  <CardHeader className="space-y-3">
                    <div className="h-6 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Plane className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold">No travel packages are currently available</p>
              <p className="text-sm mt-2">Please check back later or contact us for custom packages</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.id.toString()} className="overflow-hidden hover:shadow-medium transition-all duration-300 group border-2">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={pkg.image.getDirectURL()}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{pkg.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">{pkg.details}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-4">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl lg:text-3xl font-bold text-primary">
                        ${pkg.price.toString()}
                      </span>
                      <PackageDetailsDialog package={pkg}>
                        <Button className="shadow-sm">View Details</Button>
                      </PackageDetailsDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Tour Packages Section */}
      <section className="container py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">Featured Tour Packages</h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked domestic and international tour packages
          </p>
        </div>

        {featuredLoading ? (
          <div className="space-y-12">
            {[1, 2].map((section) => (
              <div key={section}>
                <div className="h-8 w-64 bg-muted animate-pulse rounded mb-6" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader className="space-y-3">
                        <div className="h-6 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Domestic Tour Packages */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPinned className="h-7 w-7 text-primary" />
                <h3 className="text-2xl lg:text-3xl font-bold">Domestic Tour Packages</h3>
              </div>
              {featuredData?.domestic && featuredData.domestic.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {featuredData.domestic.map((tour, index) => (
                    <Card key={index} className="hover:shadow-medium transition-all duration-300 border-2">
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span>{tour.name}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {tour.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full shadow-sm"
                          onClick={() => onNavigate('enquiry')}
                        >
                          Enquire Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No domestic tour packages available at the moment</p>
                </div>
              )}
            </div>

            {/* International Tour Packages */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-7 w-7 text-primary" />
                <h3 className="text-2xl lg:text-3xl font-bold">International Tour Packages</h3>
              </div>
              {featuredData?.international && featuredData.international.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {featuredData.international.map((tour, index) => (
                    <Card key={index} className="hover:shadow-medium transition-all duration-300 border-2">
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl flex items-start gap-2">
                          <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span>{tour.name}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {tour.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full shadow-sm"
                          onClick={() => onNavigate('enquiry')}
                        >
                          Enquire Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No international tour packages available at the moment</p>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            {featuredData?.terms && (
              <Card className="bg-muted/30 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Info className="h-6 w-6 text-primary" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{featuredData.terms.pricing}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{featuredData.terms.rateChanges}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{featuredData.terms.advancePayment}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{featuredData.terms.cancellationPolicy}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{featuredData.terms.gst}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </section>

      {/* Blog Section */}
      <section className="bg-gradient-to-b from-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Travel Stories & Tips</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover helpful travel tips and inspiring stories from around the world
            </p>
          </div>
          {blogPostsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardHeader className="space-y-3">
                    <div className="h-6 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No blog posts available at the moment</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id.toString()} className="overflow-hidden hover:shadow-medium transition-all duration-300 group border-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image.getDirectURL()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">What Our Travelers Say</h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from travelers who chose Joyguru Travels
          </p>
        </div>
        {testimonialsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
                  <div className="h-5 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </div>
              </Card>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Quote className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No testimonials available at the moment</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id.toString()} className="p-6 hover:shadow-medium transition-all duration-300 border-2">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo.getDirectURL()}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-4 border-primary/20">
                        <span className="text-2xl font-bold text-primary">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{testimonial.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Number(testimonial.rating)
                              ? 'fill-warning text-warning'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                    <p className="text-sm text-muted-foreground leading-relaxed italic pl-4">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
