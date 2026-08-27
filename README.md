# FurEver Care — They Deserve Forever Love
**A Premium, Competition-Ready Pet Care Single Page Application (ReactJS + JSON)**

---

## ✨ 2026 Redesign Notes

This build includes a full visual and mobile-experience refresh on top of the original app:

- **New color system** — "Digital Lavender × Sunset Coral" gradient palette (`src/styles/variables.css`), replacing the previous maroon/mauve theme. Because the app is built on CSS custom properties, this change cascades through every screen.
- **Glassmorphism navbar** with a gradient logo mark and gradient headline text.
- **Autoplaying hero video** (muted, loop, with a sound toggle) replacing the static hero image.
- **App-like mobile experience** — a fixed glass bottom tab bar (Home / Pet Care / Adopt / Vet Hub / More), safe-area support for notched phones, and 44px+ touch targets.
- **Installable PWA** — `manifest.json`, a gradient app icon set (`public/icons`), and a lightweight service worker (`public/sw.js`) so the site can be added to a phone's home screen and opens like a native app (no browser chrome, own icon, offline app-shell).
- Small correctness fixes: a duplicate CSS property, an invalid nested CSS rule, and a mismatched overlay color.

To run locally: `npm install && npm run dev`. To build for production: `npm run build`.

---

## 🌟 Executive Overview
**FurEver Care** is an original, competition-grade, responsive Single Page Application (SPA) designed to bridge the gap between compassionate pet guardians, licensed veterinary medical practitioners, and ethical shelter adoption networks.

The application follows an **editorial, warm, and sophisticated design system** (warm ivory, dark chocolate cocoa, golden caramel, and subtle sage) inspired by the FurEver Care visual guidelines. In strict compliance with the project's Software Requirements Specification (SRS), **all data is decoupled into pre-populated, read-only JSON datasets**, and all forms (Pet Passport, Adoption Inquiries, Consultation Scheduling, Contact, and Feedback) operate client-side without requiring a backend server or database writes.

---

## 🛠️ Core Technologies & Architecture
- **Core Framework**: React 18 / 19 (Vite Build System)
- **Styling Architecture**: Tokenized Pure CSS with CSS Custom Properties (`variables.css`, `globals.css`, `animations.css`, `responsive.css`)
- **Typography**: 
  - *Display Serif*: `Fraunces` & `Playfair Display` (Google Fonts)
  - *Modern Body Sans*: `Plus Jakarta Sans` (Google Fonts)
- **Data Layer**: 15 Modular JSON datasets (`src/data/*.json`)
- **Real-Time Telemetry**:
  - `Date API` for a dynamic live clock and date formatter (`useLiveClock.js`)
  - `HTML5 Geolocation API` with graceful error and permission-denied fallback (`useGeolocation.js`)
- **Interactive Multimedia**:
  - Embedded YouTube NoCookie video masterclass player with responsive modal
  - Synthetic Web Audio API Clicker Simulator for positive behavioral reinforcement training
  - Responsive Google Maps embed
- **Accessibility & Motion**:
  - Hardware-accelerated infinite marquee ticker
  - Full `@media (prefers-reduced-motion: reduce)` support

---

## 📂 Project Folder Structure

```
c:/Users/asus/Desktop/petcare-website/
├── index.html                   # HTML entry point with Google Fonts preconnect & meta
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite build configuration
├── public/
│   └── favicon.svg              # Brand paw & heart SVG favicon
└── src/
    ├── App.jsx                  # Main SPA router, role orchestration, modals & toast manager
    ├── main.jsx                 # React root mount
    ├── index.css                # Global CSS forwarder
    │
    ├── components/
    │   ├── common/
    │   │   ├── SplashScreen.jsx         # 750ms branded opening entrance transition
    │   │   ├── SectionHeading.jsx       # Reusable editorial section header with badge
    │   │   ├── Modal.jsx                # Accessible modal dialog (ESC key, backdrop blur)
    │   │   ├── Toast.jsx                # Global notification toast
    │   │   ├── EmptyState.jsx           # Empty state UI for search/filter queries
    │   │   ├── LiveClockDisplay.jsx     # Live ticking clock & formatted date badge
    │   │   └── LocationDisplay.jsx      # Geolocation status & fallback badge
    │   │
    │   ├── navbar/
    │   │   ├── Navbar.jsx               # Responsive top bar with role badge & CTA
    │   │   └── MobileDrawer.jsx         # Animated mobile navigation drawer
    │   │
    │   ├── hero/
    │   │   └── Hero.jsx                 # Editorial Hero with dog+cat frame & floating badge
    │   │
    │   ├── onboarding/
    │   │   └── UserCategorySelector.jsx # First name input + 3 custom interactive radio cards
    │   │
    │   ├── ticker/
    │   │   └── ScrollingTicker.jsx      # Infinite horizontal news & telemetry marquee
    │   │
    │   ├── petCare/
    │   │   ├── PetProfileCard.jsx       # Pet Health Passport creator/editor & digital badge
    │   │   ├── FeedingGuide.jsx         # Portion guide & interactive daily calorie calculator
    │   │   ├── GroomingVideos.jsx       # Video tutorials with step breakdowns & modal player
    │   │   ├── HealthTips.jsx           # Dental hygiene, vitals, and summer safety cards
    │   │   └── TrainingTips.jsx         # Training guides with interactive clicker tool
    │   │
    │   ├── timeline/
    │   │   └── CareTimeline.jsx         # Vertical healthcare milestone timeline
    │   │
    │   ├── products/
    │   │   ├── ProductCard.jsx          # Reusable product card with price & Buy Now CTA
    │   │   └── ProductGrid.jsx          # Search bar, category pills, sort dropdown & grid
    │   │
    │   ├── veterinarian/
    │   │   ├── VetProfileHub.jsx        # Physician bios, credentials, and specialties
    │   │   ├── AppointmentSlots.jsx     # Booked vs. Available consultation slots
    │   │   └── MedicalHistory.jsx       # Clinical case studies (Max, Bella, Milo, Charlie)
    │   │
    │   ├── adoption/
    │   │   ├── AdoptablePetGallery.jsx  # Rescue pet cards with species/age filters
    │   │   ├── AdoptionModal.jsx        # Simulated adoption application form
    │   │   ├── AdoptionStories.jsx      # Before/after emotional story transformation cards
    │   │   └── ShelterEvents.jsx        # Adoption fairs & vaccination drive announcements
    │   │
    │   ├── emergency/
    │   │   └── EmergencyHub.jsx         # 24/7 Poison Control, ER Hotlines & First-Aid Guides
    │   │
    │   ├── about/
    │   │   └── AboutUs.jsx              # Brand story, philosophy, core values, & team
    │   │
    │   ├── blog/
    │   │   └── BlogSection.jsx          # Pet wellness articles with modal article reader
    │   │
    │   ├── contact/
    │   │   └── ContactSection.jsx       # Contact cards, responsive Google Map, & contact form
    │   │
    │   ├── feedback/
    │   │   └── FeedbackSection.jsx      # 5-Star rating review form & community testimonials
    │   │
    │   └── footer/
    │       └── Footer.jsx               # Editorial footer with links & local visitor counter
    │
    ├── data/                            # 100% Read-only JSON Datasets
    │   ├── products.json                # Food, Toys, Grooming, Bedding, Supplements
    │   ├── pets.json                    # Adoptable dogs, cats, rabbits with health notes
    │   ├── vets.json                    # Veterinarian credentials and contact info
    │   ├── appointments.json            # Booked & available time slots
    │   ├── medicalHistory.json          # Clinical case studies & treatment logs
    │   ├── feedingGuides.json           # Nutritional tables for puppies, adults, and cats
    │   ├── groomingVideos.json          # Video masterclasses with runtime and steps
    │   ├── healthTips.json              # Preventive health tips and vital signs guides
    │   ├── trainingTips.json            # Behavioral guidance modules
    │   ├── adoptionStories.json         # Heartwarming before/after stories & quotes
    │   ├── events.json                  # Community adoption drives & clinics
    │   ├── emergencyContacts.json       # 24/7 Emergency hotlines & first aid protocols
    │   ├── team.json                    # About Us team profiles
    │   ├── blogPosts.json               # Long-form wellness articles
    │   └── tickerUpdates.json           # News updates and seasonal alerts
    │
    ├── hooks/
    │   ├── useLiveClock.js              # Real-time Date API ticking hook
    │   ├── useGeolocation.js            # Geolocation API with graceful fallback
    │   ├── useLocalStorage.js           # Safe local storage wrapper for active session
    │   └── useReducedMotion.js          # Prefers-reduced-motion media query listener
    │
    ├── utils/
    │   ├── formatters.js                # Currency ($USD), string capitalizers & truncators
    │   └── filterHelpers.js             # Client-side multi-parameter filtering & sorting
    │
    └── styles/
        ├── variables.css                # Design tokens (--color-*, --font-*, --radius-*, etc.)
        ├── globals.css                  # Base typography, button styles, badges, container grids
        ├── animations.css               # Keyframes (fadeInUp, float, marquee ticker, pulse)
        └── responsive.css               # Fluid breakpoints (320px, 480px, 768px, 1024px, 1440px)
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- NPM (v9.0.0 or higher)

### Development Mode
```bash
# 1. Navigate to the project directory
cd petcare-website

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview the built distribution locally
npm run preview
```

---

## 🎨 Design Tokens & Customization Guide

All styling is centralized in `src/styles/variables.css`. Modifying colors, typography, or border radii across the entire application takes just seconds.

### Changing Brand Colors
Edit `src/styles/variables.css`:
```css
:root {
  --color-bg: #FAF7F2;          /* Canvas background */
  --color-primary: #2C1810;     /* Deep Cocoa / Dark Chocolate Text */
  --color-accent: #C98A4B;      /* Warm Golden Caramel Accent */
  --color-wellness: #4E6E58;    /* Sage Green */
  --color-danger: #B84735;      /* Terracotta Red for Emergency */
}
```

### Changing Fonts
1. Add your desired font links to the `<head>` in `index.html`.
2. Update the font variables in `src/styles/variables.css`:
```css
--font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
--font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
```

### Modifying Card Elevation & Corners
```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-xl: 32px;

--shadow-sm: 0 4px 12px rgba(44, 24, 16, 0.05);
--shadow-lg: 0 16px 36px rgba(44, 24, 16, 0.09);
```

---

## 📝 Content Management via JSON

Every piece of website content is decoupled from JSX and stored in `src/data/`:

### Adding a New Product
Open `src/data/products.json` and append:
```json
{
  "id": "prod-9",
  "name": "Botanical Paw Conditioning Balm",
  "category": "Grooming Essentials",
  "price": 12.99,
  "rating": 4.9,
  "reviewCount": 45,
  "image": "https://images.unsplash.com/photo-example.jpg",
  "badge": "Handmade",
  "description": "Organic shea butter and calendula wax for cracked paw pads.",
  "weight": "60 g",
  "species": "Dog & Cat"
}
```

### Adding an Adoptable Pet
Open `src/data/pets.json` and append:
```json
{
  "id": "pet-7",
  "name": "Rosie",
  "species": "Dog",
  "breed": "Corgi Mix",
  "age": "1.5 Years",
  "ageCategory": "Young",
  "gender": "Female",
  "size": "Medium (11 kg)",
  "location": "North Haven Rescue Shelter",
  "vaccinated": true,
  "neutered": true,
  "goodWith": ["Kids", "Dogs"],
  "image": "https://images.unsplash.com/photo-example.jpg",
  "description": "Playful and spirited companion with big expressive ears.",
  "story": "Rescued from rural foster home. Loves tennis balls.",
  "healthStatus": "Fully vaccinated & microchipped."
}
```

### Modifying the Live Ticker Messages
Open `src/data/tickerUpdates.json` to edit or add announcements and reminders.

### Updating Medical History Case Studies
Open `src/data/medicalHistory.json` to modify clinical diagnoses, symptoms, treatments, and follow-up timelines.

---

## 🧪 Testing Checklist Verification

- [x] **Opening Entrance**: 750ms branded splash animation with smooth dissolve into portal.
- [x] **Personalized Onboarding**: First name state + custom radio-card selector for Pet Owner, Veterinarian, and Animal Shelter.
- [x] **Live Clock**: Live seconds ticking using JS Date API with formatted time & date.
- [x] **Geolocation**: HTML5 Geolocation API with graceful fallback when access is denied/unavailable.
- [x] **Scrolling Ticker**: Infinite hardware-accelerated ticker combining live time, region, and JSON updates.
- [x] **Pet Owner Dashboard**: Interactive Pet Passport editor, feeding calculator, video masterclasses, and care timeline.
- [x] **Product Showcase**: Real-time debounce search, category filters, price & name sorting, and non-functional "Buy Now" demo modal.
- [x] **Veterinarian Hub**: Board-certified physician bios, display-only consultation slots, and searchable clinical case studies.
- [x] **Animal Shelter Portal**: Adoptable pet gallery with multi-criteria filters, adoption inquiry modal, success stories, and shelter events.
- [x] **Emergency 24/7 Helpline**: Direct click-to-call links for Poison Control and critical first-aid guides.
- [x] **About Us & Blog**: Original brand story, core values, leadership team, and full article reader modal.
- [x] **Forms & Validations**: Client-side validated Contact & Feedback forms with simulated success states.
- [x] **Responsive Adaptation**: Tested across mobile (320-480px), tablet (768px), laptop (1024px), and desktop (1440px+).
- [x] **Zero Errors**: Vite build compiles with 0 errors and 0 warnings.

---

## 📄 License & Academic Note
Developed as an original competition project strictly adhering to the FurEver Care Software Requirements Specification. Free for academic presentation and demonstration.
