import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TravelPackage {
    id: bigint;
    title: string;
    destinationId: bigint;
    isActive: boolean;
    details: string;
    image: ExternalBlob;
    price: bigint;
}
export interface FeaturedDestination {
    duration: string;
    name: string;
    description: string;
    category: FeaturedCategory;
}
export type Time = bigint;
export interface Destination {
    id: bigint;
    name: string;
    description: string;
    isActive: boolean;
    image: ExternalBlob;
}
export interface Flight {
    id: bigint;
    arrival: string;
    date: Time;
    isActive: boolean;
    availableSeats: bigint;
    airline: string;
    price: bigint;
    departure: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    submissionTime: Time;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishDate: Time;
    isActive: boolean;
    summary: string;
    image: ExternalBlob;
}
export interface TermsAndConditions {
    gst: string;
    cancellationPolicy: string;
    pricing: string;
    advancePayment: string;
    rateChanges: string;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    user: Principal;
    passengerName: string;
    bookingDate: Time;
    flightId: bigint;
    packageId?: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Testimonial {
    id: bigint;
    review: string;
    displayOrder?: bigint;
    name: string;
    isActive: boolean;
    rating: bigint;
    photo?: ExternalBlob;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum FeaturedCategory {
    domestic = "domestic",
    international = "international"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(title: string, summary: string, content: string, image: ExternalBlob): Promise<void>;
    addDestination(name: string, description: string, image: ExternalBlob): Promise<void>;
    addFlight(airline: string, departure: string, arrival: string, date: Time, price: bigint, seats: bigint): Promise<void>;
    addTestimonial(name: string, photo: ExternalBlob | null, rating: bigint, review: string, displayOrder: bigint | null): Promise<void>;
    addTravelPackage(destinationId: bigint, title: string, details: string, price: bigint, image: ExternalBlob): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(flightId: bigint, packageId: bigint | null, passengerName: string): Promise<bigint>;
    getActiveBlogPosts(): Promise<Array<BlogPost>>;
    getActiveDestinations(): Promise<Array<Destination>>;
    getActivePackages(): Promise<Array<TravelPackage>>;
    getActiveTestimonials(limit: bigint): Promise<Array<Testimonial>>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedDestinations(): Promise<{
        terms: TermsAndConditions;
        domestic: Array<FeaturedDestination>;
        international: Array<FeaturedDestination>;
    }>;
    getUserBookings(user: Principal): Promise<Array<Booking>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchFlights(departure: string, arrival: string): Promise<Array<Flight>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    toggleBlogPost(id: bigint): Promise<void>;
    toggleDestination(id: bigint): Promise<void>;
    toggleFlight(id: bigint): Promise<void>;
    toggleTestimonial(id: bigint): Promise<void>;
    toggleTravelPackage(id: bigint): Promise<void>;
    updateBlogPost(id: bigint, title: string, summary: string, content: string): Promise<void>;
    updateBookingStatus(bookingId: bigint, status: BookingStatus): Promise<void>;
    updateDestination(id: bigint, name: string, description: string): Promise<void>;
    updateFlight(id: bigint, airline: string, departure: string, arrival: string, date: Time, price: bigint, seats: bigint): Promise<void>;
    updateTestimonial(id: bigint, name: string, rating: bigint, review: string, displayOrder: bigint | null): Promise<void>;
    updateTravelPackage(id: bigint, title: string, details: string, price: bigint): Promise<void>;
}
