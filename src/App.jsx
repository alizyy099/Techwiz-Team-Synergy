import React, { useState, useEffect } from 'react';
import './styles/variables.css';
import './styles/globals.css';
import './styles/animations.css';
import './styles/responsive.css';

// Common Components
import SplashScreen from './components/common/SplashScreen';
import Navbar from './components/navbar/Navbar';
import ScrollingTicker from './components/ticker/ScrollingTicker';
import Footer from './components/footer/Footer';
import Toast from './components/common/Toast';
import Modal from './components/common/Modal';

// Section Components
import Hero from './components/hero/Hero';
import UserCategorySelector from './components/onboarding/UserCategorySelector';
import PetProfileCard from './components/petCare/PetProfileCard';
import FeedingGuide from './components/petCare/FeedingGuide';
import GroomingVideos from './components/petCare/GroomingVideos';
import HealthTips from './components/petCare/HealthTips';
import TrainingTips from './components/petCare/TrainingTips';
import CareTimeline from './components/timeline/CareTimeline';
import ProductGrid from './components/products/ProductGrid';
import VetProfileHub from './components/veterinarian/VetProfileHub';
import AppointmentSlots from './components/veterinarian/AppointmentSlots';
import MedicalHistory from './components/veterinarian/MedicalHistory';
import AdoptablePetGallery from './components/adoption/AdoptablePetGallery';
import AdoptionStories from './components/adoption/AdoptionStories';
import ShelterEvents from './components/adoption/ShelterEvents';
import EmergencyHub from './components/emergency/EmergencyHub';
import AboutUs from './components/about/AboutUs';
import BlogSection from './components/blog/BlogSection';
import ContactSection from './components/contact/ContactSection';
import FeedbackSection from './components/feedback/FeedbackSection';
import PawPulse from "./components/PawPulse/PawPulse";

// Hooks & Data
import { useLocalStorage } from './hooks/useLocalStorage';
import { Calendar, Heart, Stethoscope, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  // Splash entrance state (shown once on initial visit)
  const [showSplash, setShowSplash] = useState(true);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('home');

  // User Profile state
  const [userName, setUserName] = useLocalStorage('furever_user_name', '');
  const [userRole, setUserRole] = useLocalStorage('furever_user_role', 'Pet Owner');

  // Pet Profile data
  const [petProfile, setPetProfile] = useLocalStorage('furever_pet_profile', {
    name: 'Barnaby',
    species: 'Dog',
    breed: 'Golden Retriever & Spaniel Mix',
    age: '2.5 Years',
    weight: '11.5 kg',
    microchip: '985-1410-0092-814',
    vaccinations: 'DHPP Booster (Jul 2026), Rabies 3-Yr (Valid till 2028), Bordetella Oral'
  });

  // Global Toast state
  const [toast, setToast] = useState(null);

  // Global Quick Appointment Modal state
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    petName: petProfile.name || '',
    serviceType: 'General Wellness Consultation',
    preferredDoctor: 'Dr. Eleanor Vance, DVM',
    date: '2026-08-27',
    time: '10:00 AM'
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const showToast = (toastData) => {
    setToast(toastData);
  };

  const handleOnboardingProceed = () => {
    // Navigate to the role-specific experience
    if (userRole === 'Veterinarian') {
      setActiveTab('veterinarian');
    } else if (userRole === 'Animal Shelter') {
      setActiveTab('adoption');
    } else {
      setActiveTab('petcare');
    }

    showToast({
      type: 'success',
      title: `Welcome, ${userName || 'Guardian'}!`,
      message: `Your ${userRole} workspace is now active.`
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    setAppointmentBooked(true);

    showToast({
      type: 'success',
      title: 'Appointment Request Simulated',
      message: `Consultation reserved with ${appointmentForm.preferredDoctor} for ${appointmentForm.petName || 'your pet'}.`
    });

    setTimeout(() => {
      setAppointmentBooked(false);
      setAppointmentModalOpen(false);
    }, 2400);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Opening Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={userName}
        userRole={userRole}
        onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
      />

      {/* 3. Real-Time Marquee Ticker */}
      <ScrollingTicker />

      {/* 4. Dynamic Page View Router */}
      <main style={{ flex: 1 }}>
        {/* VIEW: HOME / LANDING */}
        {activeTab === 'home' && (
          <div className="animate-fadeInUp">
            {/* Hero Section inspired by Figma Reference */}
            <Hero
              onGetStarted={() => {
                const el = document.getElementById('onboarding-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Onboarding & Role Selection */}
            <UserCategorySelector
              userName={userName}
              setUserName={setUserName}
              userRole={userRole}
              setUserRole={setUserRole}
              onProceed={handleOnboardingProceed}
            />
            

            {/* Role-Adaptive Portal Highlights */}
            <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-8) auto' }}>
                  <span className="badge badge-caramel" style={{ marginBottom: '4px' }}>
                    Personalized For {userRole}
                  </span>
                  <h2 style={{ fontSize: 'var(--text-3xl)' }}>
                    Your Tailored Care Hub
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    Quick access to the features most relevant to your active session.
                  </p>
                </div>

                {/* Adaptive Highlights based on role */}
                {userRole === 'Pet Owner' && (
                  <div className="grid-3">
                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('petcare')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🐾 {petProfile.name}'s Passport
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Manage vaccine certificates, microchip tags, and vital records.
                      </p>
                      <span className="btn btn-primary btn-sm">View Pet Passport</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('petcare')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🥣 Daily Portion Calculator
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Calculate exact caloric guidelines tailored to {petProfile.name}'s weight.
                      </p>
                      <span className="btn btn-outline-accent btn-sm">Calculate Portion</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('petcare')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        📅 Health & Vaccine Timeline
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Track past and upcoming checkups, grooming, and heartworm chews.
                      </p>
                      <span className="btn btn-outline btn-sm">Open Care Timeline</span>
                    </div>
                  </div>
                )}

                {userRole === 'Veterinarian' && (
                  <div className="grid-3">
                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('veterinarian')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🩺 Clinical Case Studies
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Examine differential diagnoses, allergy trials, and orthopedic follow-ups.
                      </p>
                      <span className="btn btn-primary btn-sm">Review Medical Archive</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('veterinarian')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        ⏱️ Consultation Slots
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Monitor booked surgical suites and open outpatient wellness slots.
                      </p>
                      <span className="btn btn-outline-accent btn-sm">View Schedule</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('veterinarian')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🏥 Hospital Specialists
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Explore physician credentials, dermatology departments, and surgical bays.
                      </p>
                      <span className="btn btn-outline btn-sm">Physician Directory</span>
                    </div>
                  </div>
                )}

                {userRole === 'Animal Shelter' && (
                  <div className="grid-3">
                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('adoption')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🐕 Adoptable Pet Showcase
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Browse rescue dogs, bonded felines, and friendly rabbits looking for forever love.
                      </p>
                      <span className="btn btn-primary btn-sm">Browse Pet Gallery</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('adoption')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        ✨ Adoption Success Stories
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Read inspiring before/after transformation journeys of rescued companions.
                      </p>
                      <span className="btn btn-outline-accent btn-sm">Read Stories</span>
                    </div>

                    <div
                      className="card-warm hover-lift"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface-warm)' }}
                      onClick={() => setActiveTab('adoption')}
                    >
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                        🎪 Upcoming Adoption Drives
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Explore community park festivals and low-cost vaccine drives.
                      </p>
                      <span className="btn btn-outline btn-sm">Explore Events</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Products Highlight on Home */}
            <ProductGrid onShowToast={showToast} />

            {/* Quick Emergency Teaser Banner */}
            <section
              style={{
                backgroundColor: 'var(--color-surface-warm)',
                padding: 'var(--space-10) 0',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                <div>
                  <span className="badge badge-terracotta" style={{ marginBottom: '4px' }}>
                    24/7 Clinical Emergency Support
                  </span>
                  <h3 style={{ fontSize: 'var(--text-2xl)', margin: '4px 0' }}>
                    Need Urgent Veterinary or Poison Assistance?
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Our emergency helpline and triage guides are always on standby.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('emergency')}
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--color-danger)' }}
                >
                  <span>Open Emergency Hub</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* {PawPulse} */}
        {activeTab === "pawpulse" && (
  <main className="pawpulse-page">

    <PawPulse pet={petProfile}/>

  </main>
)}

        {/* VIEW: PET CARE / PET OWNER EXPERIENCE */}
        {activeTab === 'petcare' && (
          <div className="container section-padding animate-fadeInUp">
            <PetProfileCard
              userName={userName}
              petProfile={petProfile}
              setPetProfile={setPetProfile}
              onShowToast={showToast}
            />
            <FeedingGuide />
            <GroomingVideos />
            <HealthTips />
            <TrainingTips />
            <CareTimeline petName={petProfile.name} onShowToast={showToast} />
          </div>
        )}

        {/* VIEW: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="animate-fadeInUp">
            <ProductGrid onShowToast={showToast} />
          </div>
        )}

        {/* VIEW: ADOPTION & SHELTER */}
        {activeTab === 'adoption' && (
          <div className="container section-padding animate-fadeInUp">
            <AdoptablePetGallery onShowToast={showToast} />
            <AdoptionStories />
            <ShelterEvents />
          </div>
        )}

        {/* VIEW: VETERINARIAN HUB */}
        {activeTab === 'veterinarian' && (
          <div className="container section-padding animate-fadeInUp">
            <VetProfileHub
              onSelectVetForAppointment={(vet) => {
                setAppointmentForm({
                  ...appointmentForm,
                  preferredDoctor: `${vet.name}`
                });
                setAppointmentModalOpen(true);
              }}
            />
            <AppointmentSlots onShowToast={showToast} />
            <MedicalHistory />
          </div>
        )}

        {/* VIEW: EMERGENCY & 24/7 HELPLINE */}
        {activeTab === 'emergency' && (
          <div className="animate-fadeInUp">
            <EmergencyHub />
          </div>
        )}

        {/* VIEW: ABOUT US */}
        {activeTab === 'about' && (
          <div className="animate-fadeInUp">
            <AboutUs />
          </div>
        )}

        {/* VIEW: BLOG / TIPS */}
        {activeTab === 'blog' && (
          <div className="animate-fadeInUp">
            <BlogSection />
          </div>
        )}

        {/* VIEW: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="animate-fadeInUp">
            <ContactSection onShowToast={showToast} />
          </div>
        )}

        {/* VIEW: FEEDBACK */}
        {activeTab === 'feedback' && (
          <div className="animate-fadeInUp">
            <FeedbackSection onShowToast={showToast} />
          </div>
        )}
      </main>

      {/* 5. Editorial Footer */}
      <Footer onNavigate={setActiveTab} activeTab={activeTab} />

      {/* 6. Global Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* 7. Book Vet Appointment Global Modal */}
      <Modal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        title="Schedule a Veterinary Visit"
        maxWidth="580px"
      >
        {appointmentBooked ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
            <CheckCircle2 size={44} color="var(--color-wellness)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '6px' }}>
              Consultation Reserved (Simulated)
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Your appointment with <strong>{appointmentForm.preferredDoctor}</strong> for <strong>{appointmentForm.petName || 'your pet'}</strong> has been registered in the local session.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAppointmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                  Pet Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barnaby"
                  value={appointmentForm.petName}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, petName: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                  Preferred Physician
                </label>
                <select
                  value={appointmentForm.preferredDoctor}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredDoctor: e.target.value })}
                >
                  <option value="Dr. Eleanor Vance, DVM">Dr. Eleanor Vance, DVM (Internal Medicine)</option>
                  <option value="Dr. Marcus Chen, BVSc">Dr. Marcus Chen, BVSc (Dermatology)</option>
                  <option value="Dr. Sophia Al-Mansoor, DVM">Dr. Sophia Al-Mansoor, DVM (Cardiology)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                Type of Consultation
              </label>
              <select
                value={appointmentForm.serviceType}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, serviceType: e.target.value })}
              >
                <option value="General Wellness Consultation">General Wellness Consultation</option>
                <option value="Vaccination Booster & Microchip">Vaccination Booster & Microchip</option>
                <option value="Dermatology & Skin Cytology Review">Dermatology & Skin Allergy Review</option>
                <option value="Senior Pet Mobility Evaluation">Senior Pet Mobility Evaluation</option>
                <option value="Dental Scaling & Cleaning Review">Dental Scaling & Cleaning Review</option>
              </select>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                  Preferred Time *
                </label>
                <select
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                >
                  <option value="09:00 AM">09:00 AM - 09:45 AM</option>
                  <option value="10:15 AM">10:15 AM - 11:00 AM</option>
                  <option value="01:30 PM">01:30 PM - 02:15 PM</option>
                  <option value="03:00 PM">03:00 PM - 03:45 PM</option>
                  <option value="04:30 PM">04:30 PM - 05:15 PM</option>
                </select>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-surface-warm)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)'
              }}
            >
              <strong>Demo Notice:</strong> This appointment request is simulated on the client without database writes in accordance with SRS constraints.
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Calendar size={16} />
              <span>Confirm Appointment Booking</span>
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
