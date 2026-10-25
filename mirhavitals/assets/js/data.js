/* ==========================================================================
   Mirha Vitals Home Healthcare LLC
   data.js : site-wide constants, services, testimonials, FAQs, image paths
   Loaded on every page before main.js. Plain globals, no modules.
   ========================================================================== */

/* DEMO VALUES - REPLACE BEFORE PUBLISHING
   Every page reads these at load time, so one edit here updates the header,
   footer, floating buttons, contact page, founder icons and structured data.
   (The HTML files carry the same values as a no-JavaScript fallback.) */
var SITE = {
  licenceNo:        "0000000",                        // shown as "DHA Licence No. 0000000"
  founderWhatsApp:  "https://wa.me/971554816039",
  founderInstagram: "https://www.instagram.com/",
  founderLinkedIn:  "https://www.linkedin.com/",
  siteInstagram:    "https://www.instagram.com/",
  siteLinkedIn:     "https://www.linkedin.com/",
  siteWebsite:      "https://mirhavitals.com",
  siteWhatsApp:     "https://wa.me/971554816039",
  phone:            "+971554816039",
  email:            "info@mirhavitals.com"
};

var FOUNDER = {
  name:  "Naina Javed",
  role:  "Founder",
  photo: "assets/images/founder/founder-demo.jpg",   // DEMO IMAGE - replace with the real photo of Naina Javed
  alt:   "Naina Javed, Founder of Mirha Vitals"
};

/* Locked business details (from the client's document) */
var BUSINESS = {
  name:     "Mirha Vitals Home Healthcare LLC",
  tagline:  "Healing, Closer to You",
  address:  "205 - GBH Business Center, Al Rasheed Road, Al Muteena, Dubai, UAE",
  street:   "205 - GBH Business Center, Al Rasheed Road, Al Muteena",
  locality: "Dubai",
  country:  "AE",
  hours:    "24 hours a day, 7 days a week (24/7).",
  bookingMessage: "Hello Mirha Vitals, I would like to book: "
};

/* DEMO IMAGES - every photograph on the site is a demo image the client will
   replace. Paths are relative to the site root. Swap a file on disk (same
   name) or point the path below at a new file. */
var IMAGES = {
  "hero":                     "assets/images/hero/hero-home.jpg",                    // 1920x1200
  "cta":                      "assets/images/hero/cta.jpg",                          // 1600x700
  "teleconsultation-card":    "assets/images/services/teleconsultation-card.jpg",    // 800x1000
  "teleconsultation-banner":  "assets/images/services/teleconsultation-banner.jpg",  // 1920x800
  "doctor-on-call-card":      "assets/images/services/doctor-on-call-card.jpg",
  "doctor-on-call-banner":    "assets/images/services/doctor-on-call-banner.jpg",
  "nurse-on-call-card":       "assets/images/services/nurse-on-call-card.jpg",
  "nurse-on-call-banner":     "assets/images/services/nurse-on-call-banner.jpg",
  "lab-collection-card":      "assets/images/services/lab-collection-card.jpg",
  "lab-collection-banner":    "assets/images/services/lab-collection-banner.jpg",
  "iv-therapy-card":          "assets/images/services/iv-therapy-card.jpg",
  "iv-therapy-banner":        "assets/images/services/iv-therapy-banner.jpg",
  "wound-care-card":          "assets/images/services/wound-care-card.jpg",
  "wound-care-banner":        "assets/images/services/wound-care-banner.jpg",
  "elderly-care-card":        "assets/images/services/elderly-care-card.jpg",
  "elderly-care-banner":      "assets/images/services/elderly-care-banner.jpg",
  "vision":                   "assets/images/about/vision.jpg",                      // 1200x900
  "mission":                  "assets/images/about/mission.jpg",
  "team-care":                "assets/images/about/team-care.jpg",
  "founder":                  FOUNDER.photo
};

/* The seven services, exactly as listed by the client, in order. */
var SERVICES = [
  { name: "Doctor Teleconsultation",              page: "services/doctor-teleconsultation.html", image: "teleconsultation" },
  { name: "Doctor on Call / Home Visit",          page: "services/doctor-on-call.html",          image: "doctor-on-call" },
  { name: "Nurse on Call / Home Nursing",         page: "services/nurse-on-call.html",           image: "nurse-on-call" },
  { name: "Laboratory Sample Collection at Home", page: "services/lab-sample-collection.html",   image: "lab-collection" },
  { name: "IV Therapy at Home",                   page: "services/iv-therapy.html",              image: "iv-therapy" },
  { name: "Wound Care at Home",                   page: "services/wound-care.html",              image: "wound-care" },
  { name: "Elderly Care at Home",                 page: "services/elderly-care.html",            image: "elderly-care" }
];

/* DEMO - REPLACE WITH REAL CLIENT TESTIMONIALS
   demo: true shows a small "Sample" chip on the card. Set demo: false (or
   remove it) once a card holds a real testimonial from a previous client. */
var TESTIMONIALS = [
  { demo: true, name: "Client Name", service: "Doctor on Call / Home Visit",
    text: "The doctor arrived at our home and took the time to listen carefully. Everything was explained clearly and we felt well looked after." },
  { demo: true, name: "Client Name", service: "Nurse on Call / Home Nursing",
    text: "The nurse was kind, patient and very professional with my mother. It made a difficult week much easier for our family." },
  { demo: true, name: "Client Name", service: "Laboratory Sample Collection at Home",
    text: "Having the sample collected at home saved me a trip to the clinic. The visit was simple, tidy and respectful of my time." },
  { demo: true, name: "Client Name", service: "Elderly Care at Home",
    text: "My father was treated with real warmth and dignity. The team kept us informed at every step." },
  { demo: true, name: "Client Name", service: "Doctor Teleconsultation",
    text: "I spoke to a doctor from my hotel room without any fuss. The advice was clear and the follow-up was thoughtful." },
  { demo: true, name: "Client Name", service: "Wound Care at Home",
    text: "The dressing changes were handled gently and with great attention to hygiene. I felt comfortable and reassured throughout." }
];

/* Locked FAQ text (from the client's document). The pages render this text
   directly in the HTML; it is kept here for reference and reuse. */
var FAQS = [
  { q: "What is a Doctor On Call service in Dubai?",
    a: "A Doctor On Call service allows you to receive professional medical consultation and care at your home, hotel, office or preferred location in Dubai without visiting a clinic." },
  { q: "How can I book a Doctor On Call in Dubai with Mirha Vitals?",
    steps: [
      "Call or WhatsApp Mirha Vitals.",
      "Give your name, location, phone number, and symptoms/reason for consultation.",
      "Mirha Vitals will confirm the doctor and estimated arrival time."
    ] },
  { q: "Are Mirha Vitals doctors DHA-licensed?",
    a: "Our doctors are DHA-licensed healthcare professionals who have successfully completed DHA DataFlow verification and the required DHA examination." },
  { q: "Is Doctor On Call available 24/7 in Dubai?",
    a: "Yes, Mirha Vitals healthcare professionals are available 24/7 to your home, hotel, villa, or office - whenever you need it." },
  { q: "What conditions can a Doctor On Call treat at home?",
    a: "A Doctor On Call can assess many common medical concerns, including general consultations, acute and chronic pain, fever, flu, bacterial, viral and fungal infections, and other acute emergency healthcare needs. The doctor will evaluate your condition, recommend appropriate treatment and give a referral according to your problem." },
  { q: "Can I get Doctor On Call services at a hotel in Dubai?",
    a: "Yes, Doctor On Call services can be arranged at hotels and other locations in Dubai wherever needed." },
  { q: "Can elderly patients use Doctor On Call services?",
    a: "Yes. Doctor On Call services can be a convenient option for adults and elderly patients who require medical assessment or home healthcare support." },
  { q: "How quickly can a Doctor On Call reach my location?",
    a: "Response time can vary depending on your location, traffic, or weather condition. Mirha Vitals aims to arrange medical assistance as promptly as possible." }
];
