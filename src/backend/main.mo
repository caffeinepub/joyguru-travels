import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Migration "migration";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

(with migration = Migration.run)
actor {
  // Include prefabricated functionality
  include MixinStorage();

  // Include authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Destination = {
    id : Nat;
    name : Text;
    description : Text;
    image : Storage.ExternalBlob;
    isActive : Bool;
  };

  module Destination {
    public func compare(a : Destination, b : Destination) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextDestinationId = 1;
  let destinations = Map.empty<Nat, Destination>();

  // Travel Package Management
  type TravelPackage = {
    id : Nat;
    destinationId : Nat;
    title : Text;
    details : Text;
    price : Nat;
    image : Storage.ExternalBlob;
    isActive : Bool;
  };

  module TravelPackage {
    public func compare(a : TravelPackage, b : TravelPackage) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextPackageId = 1;
  let packages = Map.empty<Nat, TravelPackage>();

  // Flight Management
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

  module Flight {
    public func compare(a : Flight, b : Flight) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextFlightId = 1;
  let flights = Map.empty<Nat, Flight>();

  // User Profiles
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Booking Management
  type Booking = {
    id : Nat;
    user : Principal;
    flightId : Nat;
    packageId : ?Nat;
    passengerName : Text;
    status : BookingStatus;
    bookingDate : Time.Time;
  };

  module Booking {
    public func compare(a : Booking, b : Booking) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public type BookingStatus = {
    #confirmed;
    #cancelled;
    #pending;
  };

  var nextBookingId = 1;
  let bookings = List.empty<Booking>();

  // Contact Form Submissions
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    submissionTime : Time.Time;
  };

  let contacts = List.empty<ContactSubmission>();

  // Blog Post Management
  type BlogPost = {
    id : Nat;
    title : Text;
    summary : Text;
    content : Text;
    image : Storage.ExternalBlob;
    publishDate : Time.Time;
    isActive : Bool;
  };

  module BlogPost {
    public func compare(a : BlogPost, b : BlogPost) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextBlogId = 1;
  let blogPosts = Map.empty<Nat, BlogPost>();

  // Testimonial Management
  type Testimonial = {
    id : Nat;
    name : Text;
    photo : ?Storage.ExternalBlob;
    rating : Nat;
    review : Text;
    isActive : Bool;
    displayOrder : ?Nat;
  };

  module Testimonial {
    public func compare(a : Testimonial, b : Testimonial) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextTestimonialId = 1;
  let testimonials = Map.empty<Nat, Testimonial>();

  // Featured Destinations (Now Only References)
  public type FeaturedDestination = {
    name : Text;
    description : Text;
    duration : Text;
    category : FeaturedCategory;
  };

  public type FeaturedCategory = {
    #domestic;
    #international;
  };

  // Hardcoded Featured Destinations
  let domesticFeatured = [
    {
      name = "Goa & Mumbai Getaway";
      description = "Explore the vibrant beaches of Goa and the bustling city of Mumbai.";
      duration = "06 Nights / 7 Days";
      category = #domestic;
    },
    {
      name = "Kerala With Kanyakumari";
      description = "Experience the serene backwaters and Kerala's natural beauty.";
      duration = "09 Nights / 10 Days";
      category = #domestic;
    },
    {
      name = "Himachal Hills (Shimla, Kulu, Manikaran Manali)";
      description = "Discover the picturesque hills and valleys of Himachal Pradesh.";
      duration = "06 Nights / 07 Days";
      category = #domestic;
    },
    {
      name = "Golden Triangle (Delhi–Agra–Jaipur)";
      description = "Uncover the rich history of northern India.";
      duration = "06 Nights / 07 Days";
      category = #domestic;
    },
    {
      name = "Andaman Escape";
      description = "Relax on the pristine beaches and explore the islands.";
      duration = "6 Nights / 7 Days";
      category = #domestic;
    },
  ];

  let internationalFeatured = [
    {
      name = "Dubai Delight";
      description = "Visit the luxury and splendor of Dubai.";
      duration = "4 Nights / 5 Days";
      category = #international;
    },
    {
      name = "Thailand Explorer";
      description = "Explore the vibrant culture of Thailand.";
      duration = "5 Nights / 6 Days";
      category = #international;
    },
    {
      name = "Singapore Getaway";
      description = "Discover the modern city-state of Singapore.";
      duration = "4 Nights / 5 Days";
      category = #international;
    },
    {
      name = "Bali Bliss";
      description = "Relax in the tropical paradise of Bali.";
      duration = "5 Nights / 6 Days";
      category = #international;
    },
    {
      name = "Vietnam (Hanoi & Da Nang)";
      description = "Experience the rich culture of Vietnam.";
      duration = "06 Nights / 07 Days";
      category = #international;
    },
  ];

  // Terms & Conditions
  public type TermsAndConditions = {
    pricing : Text;
    rateChanges : Text;
    advancePayment : Text;
    cancellationPolicy : Text;
    gst : Text;
  };

  let termsAndConditions : TermsAndConditions = {
    pricing = "Prices are per person on twin-sharing basis.";
    rateChanges = "Rates are subject to change based on season and availability.";
    advancePayment = "Advance payment required for booking confirmation.";
    cancellationPolicy = "Cancellation charges apply as per policy.";
    gst = "GST applicable as per government norms.";
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Destination Management
  public shared ({ caller }) func addDestination(
    name : Text,
    description : Text,
    image : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add destinations");
    };

    let id = nextDestinationId;
    let destination : Destination = {
      id;
      name;
      description;
      image;
      isActive = true;
    };
    destinations.add(id, destination);
    nextDestinationId += 1;
  };

  public shared ({ caller }) func updateDestination(id : Nat, name : Text, description : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update destinations");
    };

    switch (destinations.get(id)) {
      case (null) { Runtime.trap("Destination not found") };
      case (?destination) {
        let updated = { destination with name; description };
        destinations.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func toggleDestination(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle destinations");
    };

    switch (destinations.get(id)) {
      case (null) { Runtime.trap("Destination not found") };
      case (?destination) {
        let updated = { destination with isActive = not destination.isActive };
        destinations.add(id, updated);
      };
    };
  };

  public query func getActiveDestinations() : async [Destination] {
    destinations.values().toArray().filter(func(d) { d.isActive }).sort();
  };

  // Travel Package Management
  public shared ({ caller }) func addTravelPackage(
    destinationId : Nat,
    title : Text,
    details : Text,
    price : Nat,
    image : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add packages");
    };

    let id = nextPackageId;
    let package : TravelPackage = {
      id;
      destinationId;
      title;
      details;
      price;
      image;
      isActive = true;
    };
    packages.add(id, package);
    nextPackageId += 1;
  };

  public shared ({ caller }) func updateTravelPackage(id : Nat, title : Text, details : Text, price : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update packages");
    };

    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found") };
      case (?package) {
        let updated = {
          package with
          title;
          details;
          price;
        };
        packages.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func toggleTravelPackage(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle packages");
    };

    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found") };
      case (?package) {
        let updated = { package with isActive = not package.isActive };
        packages.add(id, updated);
      };
    };
  };

  public query func getActivePackages() : async [TravelPackage] {
    packages.values().toArray().filter(func(p) { p.isActive }).sort();
  };

  // Flight Management
  public shared ({ caller }) func addFlight(
    airline : Text,
    departure : Text,
    arrival : Text,
    date : Time.Time,
    price : Nat,
    seats : Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add flights");
    };

    let id = nextFlightId;
    let flight : Flight = {
      id;
      airline;
      departure;
      arrival;
      date;
      price;
      availableSeats = seats;
      isActive = true;
    };
    flights.add(id, flight);
    nextFlightId += 1;
  };

  public shared ({ caller }) func updateFlight(
    id : Nat,
    airline : Text,
    departure : Text,
    arrival : Text,
    date : Time.Time,
    price : Nat,
    seats : Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update flights");
    };

    switch (flights.get(id)) {
      case (null) { Runtime.trap("Flight not found") };
      case (?flight) {
        let updated = {
          flight with
          airline;
          departure;
          arrival;
          date;
          price;
          availableSeats = seats;
        };
        flights.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func toggleFlight(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle flights");
    };

    switch (flights.get(id)) {
      case (null) { Runtime.trap("Flight not found") };
      case (?flight) {
        let updated = { flight with isActive = not flight.isActive };
        flights.add(id, updated);
      };
    };
  };

  public query func searchFlights(departure : Text, arrival : Text) : async [Flight] {
    let activeFlights = flights.values().toArray().filter(func(f) { f.isActive });
    activeFlights.filter(
      func(f) {
        f.departure.startsWith(#text departure) and f.arrival.startsWith(#text arrival);
      }
    ).sort();
  };

  // Booking Management
  public shared ({ caller }) func createBooking(
    flightId : Nat,
    packageId : ?Nat,
    passengerName : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };

    let bookingId = nextBookingId;
    let booking : Booking = {
      id = bookingId;
      user = caller;
      flightId;
      packageId;
      passengerName;
      status = #pending;
      bookingDate = Time.now();
    };

    bookings.add(booking);
    nextBookingId += 1;
    bookingId;
  };

  public query ({ caller }) func getUserBookings(user : Principal) : async [Booking] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own bookings");
    };

    bookings.toArray().filter(func(b) { b.user == user }).sort();
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, status : BookingStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };

    let allBookings = bookings.toArray();
    let updatedBookings = allBookings.map(
      func(b) { if (b.id == bookingId) { { b with status } } else { b } }
    );

    let newBookings = List.empty<Booking>();
    updatedBookings.forEach(func(b) { newBookings.add(b) });
    bookings.clear();
    bookings.addAll(newBookings.values());
  };

  // Contact Form Handling - Public access, no authentication required
  public shared func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      submissionTime = Time.now();
    };
    contacts.add(submission);
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contacts.toArray();
  };

  // Blog Post Management
  public shared ({ caller }) func addBlogPost(
    title : Text,
    summary : Text,
    content : Text,
    image : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add blogs");
    };

    let id = nextBlogId;
    let blogPost : BlogPost = {
      id;
      title;
      summary;
      content;
      image;
      publishDate = Time.now();
      isActive = true;
    };
    blogPosts.add(id, blogPost);
    nextBlogId += 1;
  };

  public shared ({ caller }) func updateBlogPost(id : Nat, title : Text, summary : Text, content : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update blogs");
    };

    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) {
        let updated = {
          post with
          title;
          summary;
          content;
        };
        blogPosts.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func toggleBlogPost(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle blogs");
    };

    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) {
        let updated = { post with isActive = not post.isActive };
        blogPosts.add(id, updated);
      };
    };
  };

  public query func getActiveBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().filter(func(p) { p.isActive }).sort();
  };

  // Testimonial Management
  public shared ({ caller }) func addTestimonial(
    name : Text,
    photo : ?Storage.ExternalBlob,
    rating : Nat,
    review : Text,
    displayOrder : ?Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };

    let id = nextTestimonialId;
    let testimonial : Testimonial = {
      id;
      name;
      photo;
      rating;
      review;
      isActive = true;
      displayOrder;
    };
    testimonials.add(id, testimonial);
    nextTestimonialId += 1;
  };

  public shared ({ caller }) func updateTestimonial(
    id : Nat,
    name : Text,
    rating : Nat,
    review : Text,
    displayOrder : ?Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };

    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        let updated = {
          testimonial with
          name;
          rating;
          review;
          displayOrder;
        };
        testimonials.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func toggleTestimonial(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle testimonials");
    };

    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        let updated = { testimonial with isActive = not testimonial.isActive };
        testimonials.add(id, updated);
      };
    };
  };

  public query func getActiveTestimonials(limit : Nat) : async [Testimonial] {
    let activeTestimonials = testimonials.values().toArray().filter(func(t) { t.isActive });
    if (activeTestimonials.size() <= limit) {
      return activeTestimonials;
    };

    Array.tabulate<Testimonial>(limit, func(i) { activeTestimonials[i] });
  };

  // Featured Destinations Management
  public query func getFeaturedDestinations() : async {
    domestic : [FeaturedDestination];
    international : [FeaturedDestination];
    terms : TermsAndConditions;
  } {
    {
      domestic = domesticFeatured;
      international = internationalFeatured;
      terms = termsAndConditions;
    };
  };
};
