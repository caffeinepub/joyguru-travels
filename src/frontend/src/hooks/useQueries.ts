import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Destination, TravelPackage, Flight, Booking, ContactSubmission, BookingStatus, BlogPost, Testimonial, FeaturedDestination, TermsAndConditions } from '../backend';
import { ExternalBlob } from '../backend';
import { Principal } from '@dfinity/principal';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Destination Queries
export function useGetActiveDestinations() {
  const { actor, isFetching } = useActor();

  return useQuery<Destination[]>({
    queryKey: ['destinations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveDestinations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDestination() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, image }: { name: string; description: string; image: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDestination(name, description, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}

export function useUpdateDestination() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, description }: { id: bigint; name: string; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateDestination(id, name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}

export function useToggleDestination() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleDestination(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}

// Travel Package Queries
export function useGetActivePackages() {
  const { actor, isFetching } = useActor();

  return useQuery<TravelPackage[]>({
    queryKey: ['packages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTravelPackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ destinationId, title, details, price, image }: { destinationId: bigint; title: string; details: string; price: bigint; image: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTravelPackage(destinationId, title, details, price, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useUpdateTravelPackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, details, price }: { id: bigint; title: string; details: string; price: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTravelPackage(id, title, details, price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useToggleTravelPackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleTravelPackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

// Flight Queries
export function useSearchFlights() {
  const { actor } = useActor();

  return useMutation<Flight[], Error, { departure: string; arrival: string }>({
    mutationFn: async ({ departure, arrival }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.searchFlights(departure, arrival);
    },
  });
}

export function useAddFlight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ airline, departure, arrival, date, price, seats }: { airline: string; departure: string; arrival: string; date: bigint; price: bigint; seats: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addFlight(airline, departure, arrival, date, price, seats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

export function useUpdateFlight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, airline, departure, arrival, date, price, seats }: { id: bigint; airline: string; departure: string; arrival: string; date: bigint; price: bigint; seats: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateFlight(id, airline, departure, arrival, date, price, seats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

export function useToggleFlight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleFlight(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

// Booking Queries
export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ flightId, packageId, passengerName }: { flightId: bigint; packageId: bigint | null; passengerName: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBooking(flightId, packageId, passengerName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useGetUserBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      const identity = await actor.getCallerUserProfile();
      if (!identity) return [];
      // Get caller's principal from identity
      const principal = Principal.anonymous(); // This will be replaced by actual principal
      return actor.getUserBookings(principal);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: bigint; status: BookingStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

// Contact Form
export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(name, email, message);
    },
  });
}

export function useGetAllContacts() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

// Blog Post Queries
export function useGetActiveBlogPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, summary, content, image }: { title: string; summary: string; content: string; image: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBlogPost(title, summary, content, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, summary, content }: { id: bigint; title: string; summary: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBlogPost(id, title, summary, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

export function useToggleBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

// Testimonial Queries
export function useGetActiveTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveTestimonials(BigInt(4));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, photo, rating, review, displayOrder }: { name: string; photo: ExternalBlob | null; rating: bigint; review: string; displayOrder: bigint | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTestimonial(name, photo, rating, review, displayOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, rating, review, displayOrder }: { id: bigint; name: string; rating: bigint; review: string; displayOrder: bigint | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTestimonial(id, name, rating, review, displayOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useToggleTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

// Featured Destinations Queries
export function useGetFeaturedDestinations() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    domestic: FeaturedDestination[];
    international: FeaturedDestination[];
    terms: TermsAndConditions;
  }>({
    queryKey: ['featuredDestinations'],
    queryFn: async () => {
      if (!actor) return { domestic: [], international: [], terms: { pricing: '', rateChanges: '', advancePayment: '', cancellationPolicy: '', gst: '' } };
      return actor.getFeaturedDestinations();
    },
    enabled: !!actor && !isFetching,
  });
}
