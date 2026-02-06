# Specification

## Summary
**Goal:** Prevent existing Tour/Travel Package (and other) data from being wiped during canister upgrades, and ensure the Home page continues to display travel package details clearly.

**Planned changes:**
- Backend: Persist all existing stored data across canister upgrades so previously created Destinations, Travel Packages, Flights, Bookings, Contacts, Blog Posts, Testimonials, and User Profiles remain readable after redeploys.
- Backend: Preserve and restore all ID counters across upgrades so new records continue from previous IDs (no ID reuse).
- Frontend (HomePage): Ensure each “Holiday Packages” card shows package title and the admin-entered details text (pkg.details), with a non-destructive way to access long details.
- Frontend (HomePage/AdminDashboard): Add a clear empty-state message when no active packages are returned, and keep AdminDashboard’s “Current Packages” list/count obvious for detecting missing data.

**User-visible outcome:** After upgrades/redeploys, previously entered travel content remains available, and users/admins can reliably see holiday package titles and details on the Home page, with clear messaging when no packages are available.
