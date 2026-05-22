# MERN IT Solutions Web App - TODO

## Initial Build
- [x] Initialize project structure (client + server)
- [x] Create backend secure Express server setup
- [x] Add MongoDB models (Lead, Admin/User)
- [x] Add secure routes (contact, newsletter, auth placeholder)
- [x] Add validation and security middleware
- [x] Create professional React frontend structure
- [x] Build pages: Home, About, Services, Process, Pricing, Portfolio, Testimonials, FAQ, Contact
- [x] Connect contact form to backend API
- [x] Add environment examples and run instructions
- [x] Final review for production readiness

## Redesign Sprint (Futuristic 3D + UX Fixes)
- [x] Upgrade frontend dependencies for 3D + animation
- [x] Build 3D hero and immersive visual sections
- [x] Redesign Navbar/Footer with futuristic glass style
- [ ] Rebuild Home/About/Services with advanced interactions
- [ ] Fix Contact validation UX (inline field errors + backend error mapping)
- [ ] Replace global styling with futuristic design system
- [ ] Run frontend + backend verification after redesign

## Current Task (Audio + Branding Update)
- [x] Update GlobalAudioPlayer for autoplay + auto-stop timer + shared control events
- [x] Add on-video sound toggle overlay in CinematicHeroMedia
- [x] Update footer brand/contact details to Samaaroh
- [x] Add required CSS for hero sound toggle and responsive behavior
- [ ] Verify and finalize

## Current Task (English Content + Location + Working Footer Links)
- [x] Update Contact page heading/description content to English
- [x] Correct map/location details in Contact page
- [x] Update Footer content to English
- [x] Fix mail click behavior (directly open email client with correct address)
- [x] Make Privacy/Terms/Security links functional
- [x] Add required policy pages and routes
- [ ] Run frontend build verification

## Current Task (Critical-path Fixes Requested)
- [x] Improve Contact submission error handling (network/validation/server)
- [x] Ensure sound starts ON attempt at load and auto turns OFF when audio ends
- [x] Add global page loader for route/page loading delays
- [x] Add frontend error boundary with friendly fallback UI
- [x] Add CSS for loader and error states
- [x] Run critical-path verification

## Current Task (Professional Pricing Section)
- [x] Read reference pricing structure and map to existing Services page
- [x] Add comprehensive professional pricing blocks in Services page
- [x] Add pricing-specific responsive styles
- [x] Add post-plan execution roadmap + payment/advance details
- [x] Auto-fill Contact form when a pricing plan is selected
- [x] Verify formatting/consistency and run frontend build check

## Current Task (Pricing Section Premium Upgrade)
- [ ] Add pricing controls (billing toggle + use-case chips)
- [ ] Add urgency strip + trust badges above pricing cards
- [ ] Add recommendation highlighting logic for selected use-case
- [ ] Add comparison table under each pricing category
- [ ] Normalize visible pricing labels to "Starting from ..." where applicable
- [ ] Preserve and verify Contact prefill behavior from plan selection
- [ ] Add/adjust pricing styles in `client/src/styles.css`
- [ ] Run frontend build verification

## Current Task (Security Hardening + Hosting Readiness)
- [x] Audit backend security middleware/auth/models/controllers
- [ ] Remove sensitive internal error leakage from auth responses
- [ ] Strengthen `server/src/server.js` security config (helmet/cors/body limits/startup checks)
- [ ] Add graceful CORS error response
- [ ] Add optional field-level encryption utility for sensitive lead fields
- [ ] Wire encryption for lead create/read flow
- [ ] Add production security + deployment checklist to README
- [ ] Run backend security verification with curl edge-case tests
