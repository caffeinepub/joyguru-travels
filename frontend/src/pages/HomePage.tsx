import React, { useState } from 'react';
import { MapPin, Clock, Star, ChevronRight, Phone, Mail, Search, Plane, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PackageDetailsDialog from '@/components/PackageDetailsDialog';
import MessageSection from '@/components/MessageSection';
import {
  useGetActiveDestinations,
  useGetActivePackages,
  useGetActiveBlogPosts,
  useGetActiveTestimonials,
  useGetFeaturedDestinations,
} from '@/hooks/useQueries';
import { buildFlightSearchWhatsAppLink } from '@/utils/whatsappLinkBuilder';
import type { TravelPackage, FeaturedDestination } from '@/backend';
import type { Page } from '@/App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
      <img
        src="/assets/generated/airplane-hero.dim_1024x600.jpg"
        alt="Travel hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <Badge className="mb-4 bg-accent text-accent-foreground text-sm px-4 py-1 rounded-full">
          ✈️ Your Dream Journey Awaits
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          Explore the World<br />
          <span className="text-yellow-300">with Joyguru Travels</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
          Discover handcrafted tour packages, seamless flight bookings, and unforgettable experiences across India and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 rounded-full shadow-lg">
            Explore Packages
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-semibold px-8 rounded-full">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Promotional Banner ───────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/assets/generated/promo-banner.dim_1200x400.jpg"
        alt="Special Offers"
        className="w-full h-48 md:h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow">🎉 Special Offers This Season!</h2>
          <p className="text-base md:text-lg mb-4 opacity-90">
            Book now and get exclusive discounts on select domestic &amp; international packages.
          </p>
          <Button className="bg-white text-primary font-bold px-8 rounded-full hover:bg-white/90 shadow-md">
            View Offers
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Flight Search ────────────────────────────────────────────────────────────
function FlightSearchSection() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [cabinClass, setCabinClass] = useState('Economy');

  const handleSearch = () => {
    const link = buildFlightSearchWhatsAppLink({ departure, arrival, travelDate, passengers, cabinClass });
    window.open(link, '_blank');
  };

  return (
    <section className="py-12 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Search Flights</h2>
          <p className="text-muted-foreground">Find the best flights for your journey</p>
        </div>
        <div className="bg-card rounded-2xl shadow-medium p-6 md:p-8 max-w-4xl mx-auto border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <Plane className="w-4 h-4 text-primary" /> From
              </label>
              <Input
                placeholder="Departure city"
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" /> To
              </label>
              <Input
                placeholder="Arrival city"
                value={arrival}
                onChange={e => setArrival(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" /> Date
              </label>
              <Input
                type="date"
                value={travelDate}
                onChange={e => setTravelDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" /> Passengers
              </label>
              <Input
                type="number"
                min="1"
                max="20"
                value={passengers}
                onChange={e => setPassengers(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <Star className="w-4 h-4 text-primary" /> Cabin Class
              </label>
              <select
                value={cabinClass}
                onChange={e => setCabinClass(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 gap-2"
              >
                <Search className="w-4 h-4" /> Search via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Destinations ────────────────────────────────────────────────────
function FeaturedDestinationsSection() {
  const { data: destinations, isLoading } = useGetActiveDestinations();

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our most sought-after travel destinations handpicked for you.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : destinations && destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(dest => (
              <div key={dest.id.toString()} className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer">
                <img
                  src={dest.image.getDirectURL()}
                  alt={dest.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Destinations coming soon. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Holiday Packages ─────────────────────────────────────────────────────────
function HolidayPackagesSection() {
  const { data: packages, isLoading } = useGetActivePackages();

  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Holiday Packages</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated travel packages for every budget and preference.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Card key={pkg.id.toString()} className="group overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border">
                <div className="relative overflow-hidden">
                  <img
                    src={pkg.image.getDirectURL()}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1 rounded-full shadow">
                      ₹{Number(pkg.price).toLocaleString('en-IN')}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-1">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{pkg.details}</p>
                  <PackageDetailsDialog package={pkg}>
                    <Button size="sm" className="w-full rounded-xl">
                      View Details
                    </Button>
                  </PackageDetailsDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Plane className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Packages coming soon. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Domestic Tour Packages ───────────────────────────────────────────────────
function DomesticToursSection({ featured, onNavigate }: { featured: FeaturedDestination[]; onNavigate: (page: Page) => void }) {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">Domestic Tour Packages</h2>
            <p className="text-muted-foreground">Explore the beauty of India with our curated domestic tours</p>
          </div>
          <Badge variant="secondary" className="hidden md:flex items-center gap-1 px-4 py-2 text-sm font-medium">
            <MapPin className="w-4 h-4" /> India
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {featured.map((dest, idx) => (
            <div
              key={idx}
              className="group bg-card border border-border rounded-2xl p-5 hover:shadow-medium hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1 leading-tight">{dest.name}</h3>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{dest.description}</p>
              <div className="flex items-center gap-1 text-xs text-primary font-medium mb-3">
                <Clock className="w-3 h-3" />
                <span>{dest.duration}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs rounded-lg"
                onClick={() => onNavigate('enquiry')}
              >
                Enquire Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── International Tour Packages ──────────────────────────────────────────────
function InternationalToursSection({ featured, onNavigate }: { featured: FeaturedDestination[]; onNavigate: (page: Page) => void }) {
  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">International Tour Packages</h2>
            <p className="text-muted-foreground">Discover the world with our premium international packages</p>
          </div>
          <Badge variant="secondary" className="hidden md:flex items-center gap-1 px-4 py-2 text-sm font-medium">
            <Plane className="w-4 h-4" /> Worldwide
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {featured.map((dest, idx) => (
            <div
              key={idx}
              className="group bg-card border border-border rounded-2xl p-5 hover:shadow-medium hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1 leading-tight">{dest.name}</h3>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{dest.description}</p>
              <div className="flex items-center gap-1 text-xs text-primary font-medium mb-3">
                <Clock className="w-3 h-3" />
                <span>{dest.duration}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs rounded-lg"
                onClick={() => onNavigate('enquiry')}
              >
                Enquire Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Terms & Conditions ───────────────────────────────────────────────────────
function TermsSection({ terms }: { terms: { pricing: string; rateChanges: string; advancePayment: string; cancellationPolicy: string; gst: string } }) {
  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full inline-block" />
          Terms &amp; Conditions
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[terms.pricing, terms.rateChanges, terms.advancePayment, terms.cancellationPolicy, terms.gst].map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────
function BlogSection() {
  const { data: posts, isLoading } = useGetActiveBlogPosts();

  const staticPosts = [
    {
      id: 'static-1',
      title: 'Top 10 Travel Tips for First-Time Travelers',
      summary: 'Essential advice to make your first international trip smooth and memorable.',
      image: '/assets/generated/blog-travel-tips.dim_600x300.jpg',
      publishDate: 'Jan 15, 2025',
    },
    {
      id: 'static-2',
      title: 'Best Destinations to Visit in India This Summer',
      summary: 'Discover the most beautiful and refreshing places to escape the heat.',
      image: '/assets/generated/blog-destinations.dim_600x300.jpg',
      publishDate: 'Feb 3, 2025',
    },
    {
      id: 'static-3',
      title: 'How to Plan a Budget-Friendly International Trip',
      summary: 'Smart strategies to travel the world without breaking the bank.',
      image: '/assets/generated/blog-planning.dim_600x300.jpg',
      publishDate: 'Mar 10, 2025',
    },
  ];

  const displayPosts = posts && posts.length > 0 ? posts : null;

  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Travel Blog</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tips, guides, and stories to inspire your next adventure.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : displayPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.slice(0, 3).map(post => (
              <Card key={post.id.toString()} className="group overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border">
                <div className="overflow-hidden">
                  <img
                    src={post.image.getDirectURL()}
                    alt={post.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(Number(post.publishDate) / 1_000_000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-foreground text-base mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.summary}</p>
                  <Button variant="link" className="p-0 mt-2 text-primary font-medium text-sm h-auto">
                    Read More <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticPosts.map(post => (
              <Card key={post.id} className="group overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border">
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">{post.publishDate}</p>
                  <h3 className="font-bold text-foreground text-base mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.summary}</p>
                  <Button variant="link" className="p-0 mt-2 text-primary font-medium text-sm h-auto">
                    Read More <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  // useGetActiveTestimonials takes no arguments — limit is hardcoded in the hook
  const { data: testimonials, isLoading } = useGetActiveTestimonials();

  const staticTestimonials = [
    {
      id: 'st-1',
      name: 'Rajesh Kumar',
      review: 'Joyguru Travels made our Goa trip absolutely wonderful! Everything was perfectly organized and the team was very helpful.',
      rating: 5,
      photo: '/assets/generated/testimonial-john.dim_150x150.jpg',
    },
    {
      id: 'st-2',
      name: 'Priya Sharma',
      review: 'We had an amazing experience with the Kerala backwaters tour. Highly recommend Joyguru Travels for family trips!',
      rating: 5,
      photo: '/assets/generated/testimonial-sarah.dim_150x150.jpg',
    },
    {
      id: 'st-3',
      name: 'Amit & Sunita',
      review: 'Our Dubai trip was beyond expectations. The hotel, transfers, and sightseeing were all top-notch. Thank you!',
      rating: 5,
      photo: '/assets/generated/testimonial-couple.dim_150x150.jpg',
    },
    {
      id: 'st-4',
      name: "Maria D'Souza",
      review: 'The Thailand package was excellent value for money. Our guide was knowledgeable and the itinerary was well-planned.',
      rating: 4,
      photo: '/assets/generated/testimonial-maria.dim_150x150.jpg',
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : null;

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real experiences from our happy customers around the world.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayTestimonials
              ? displayTestimonials.map(t => ({
                  id: t.id.toString(),
                  name: t.name,
                  review: t.review,
                  rating: Number(t.rating),
                  photo: t.photo ? t.photo.getDirectURL() : null,
                }))
              : staticTestimonials.map(t => ({
                  id: t.id,
                  name: t.name,
                  review: t.review,
                  rating: t.rating,
                  photo: t.photo,
                }))
            ).map(t => (
              <Card key={t.id} className="rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border p-5">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const features = [
    { icon: '🏆', title: 'Expert Guidance', desc: 'Our experienced travel experts craft personalized itineraries just for you.' },
    { icon: '💰', title: 'Best Price Guarantee', desc: 'We offer competitive pricing with no hidden charges.' },
    { icon: '🛡️', title: 'Safe & Secure', desc: 'Your safety is our top priority with 24/7 support throughout your journey.' },
    { icon: '🌍', title: 'Wide Coverage', desc: 'From domestic getaways to international adventures, we cover it all.' },
  ];

  return (
    <section className="py-14 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Why Choose Joyguru Travels?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are committed to making every journey memorable and hassle-free.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 bg-card rounded-2xl border border-border shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Strip ────────────────────────────────────────────────────────────
function ContactStrip() {
  return (
    <section className="py-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Ready to Plan Your Dream Trip?</h2>
            <p className="opacity-90 text-sm">Get in touch with our travel experts today.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919531757771"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-full transition-colors font-medium text-sm"
            >
              <Phone className="w-4 h-4" /> +91 9531757771
            </a>
            <a
              href="mailto:somenath110d@gmail.com"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-full transition-colors font-medium text-sm"
            >
              <Mail className="w-4 h-4" /> somenath110d@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedDestinations();

  const domesticFeatured = featuredData?.domestic ?? [];
  const internationalFeatured = featuredData?.international ?? [];
  const terms = featuredData?.terms;

  return (
    <main>
      <HeroSection />
      <PromoBanner />
      <FlightSearchSection />
      <FeaturedDestinationsSection />
      <HolidayPackagesSection />

      {featuredLoading ? (
        <div className="py-14 flex justify-center">
          <div className="space-y-4 w-full max-w-4xl px-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
            </div>
          </div>
        </div>
      ) : (
        <>
          {domesticFeatured.length > 0 && (
            <DomesticToursSection featured={domesticFeatured} onNavigate={onNavigate} />
          )}
          {internationalFeatured.length > 0 && (
            <InternationalToursSection featured={internationalFeatured} onNavigate={onNavigate} />
          )}
          {terms && <TermsSection terms={terms} />}
        </>
      )}

      <BlogSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactStrip />
      <MessageSection />
    </main>
  );
}
