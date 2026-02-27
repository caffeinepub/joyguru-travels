import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";

module {
  type OldActor = {
    nextDestinationId : Nat;
    destinations : Map.Map<Nat, Destination>;
    nextPackageId : Nat;
    packages : Map.Map<Nat, TravelPackage>;
    nextFlightId : Nat;
    flights : Map.Map<Nat, Flight>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextBookingId : Nat;
    bookings : List.List<Booking>;
    contacts : List.List<ContactSubmission>;
    nextBlogId : Nat;
    blogPosts : Map.Map<Nat, BlogPost>;
    nextTestimonialId : Nat;
    testimonials : Map.Map<Nat, Testimonial>;
  };

  type Destination = {
    id : Nat;
    name : Text;
    description : Text;
    image : Storage.ExternalBlob;
    isActive : Bool;
  };

  type TravelPackage = {
    id : Nat;
    destinationId : Nat;
    title : Text;
    details : Text;
    price : Nat;
    image : Storage.ExternalBlob;
    isActive : Bool;
  };

  type Flight = {
    id : Nat;
    airline : Text;
    departure : Text;
    arrival : Text;
    date : Time.Time;
    price : Nat;
    availableSeats : Nat;
    isActive : Bool;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  type Booking = {
    id : Nat;
    user : Principal;
    flightId : Nat;
    packageId : ?Nat;
    passengerName : Text;
    status : BookingStatus;
    bookingDate : Time.Time;
  };

  type BookingStatus = {
    #confirmed;
    #cancelled;
    #pending;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    submissionTime : Time.Time;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    summary : Text;
    content : Text;
    image : Storage.ExternalBlob;
    publishDate : Time.Time;
    isActive : Bool;
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    photo : ?Storage.ExternalBlob;
    rating : Nat;
    review : Text;
    isActive : Bool;
    displayOrder : ?Nat;
  };

  public func run(old : OldActor) : OldActor {
    old;
  };
};
