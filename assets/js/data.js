/* ==========================================================================
   Mirha Vitals Home Healthcare LLC
   data.js : site-wide constants, services, review screenshots, FAQs, image paths
   Loaded on every page before main.js. Plain globals, no modules.
   ========================================================================== */

/* DEMO VALUES - REPLACE BEFORE PUBLISHING
   Every page reads these at load time, so one edit here updates the header,
   footer, floating buttons, contact page, founder icons and structured data.
   (The HTML files carry the same values as a no-JavaScript fallback.) */
var SITE = {
  // licenceNo:        "0000000", 
                         // shown as "DHA Licence No. 0000000"
  founderWhatsApp:  "https://wa.me/971554816039",
  founderInstagram: "https://www.instagram.com/mirhavitals/",
  founderLinkedIn:  "https://www.facebook.com/mirhavitals",
  siteInstagram:    "https://www.instagram.com/mirhavitals/",
  siteFacebook:     "https://www.facebook.com/mirhavitals",
  siteWebsite:      "https://mirhavitals.com",
  siteWhatsApp:     "https://wa.me/971554816039",
  siteYoutube:      "https://www.youtube.com/@MirhaVitals",
  phone:            "+971554816039",
  email:            "info@mirhavitals.com"
};

var FOUNDER = {
  name:  "Naina Javed",
  role:  "Founder",
  photo: "assets/images/founder/founder.jpg",   // DEMO IMAGE - replace with the real photo of Naina Javed
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
  "nurse-on-call-card":       "assets/images/services/nurse-on-call-card.jpeg",
  "nurse-on-call-banner":     "assets/images/services/nurse-on-call-banner.jpg",
  "lab-collection-card":      "assets/images/services/lab-collection-card.jpg",
  "lab-collection-banner":    "assets/images/services/lab-collection-banner.jpg",
  "iv-therapy-card":          "assets/images/services/iv-therapy-card.jpg",
  "iv-therapy-banner":        "assets/images/services/iv-therapy-banner.jpg",
  "wound-care-card":          "assets/images/services/wound-care-card.jpg",
  "wound-care-banner":        "assets/images/services/wound-care-banner.jpg",
  "elderly-care-card":        "assets/images/services/elderly-care-card.jpg",
  "elderly-care-banner":      "assets/images/services/elderly-care-banner.jpg",
  "weight-management-card":   "assets/images/services/weight-management-card.jpg",       // 800x1000
  "weight-management-banner": "assets/images/services/weight-management-banner.jpg",     // 1920x800
  "vision":                   "assets/images/about/vision.jpg",                      // 1200x900
  "mission":                  "assets/images/about/mission.jpg",
  "team-care":                "assets/images/about/team-care.jpg",
  "founder":                  FOUNDER.photo
};

/* The eight services, in the client's display order. */
var SERVICES = [
  { name: "Laboratory Sample Collection at Home", page: "services/lab-sample-collection.html",   image: "lab-collection" },
  { name: "IV Therapy at Home",                   page: "services/iv-therapy.html",              image: "iv-therapy" },
  { name: "Doctor Teleconsultation",              page: "services/doctor-teleconsultation.html", image: "teleconsultation" },
  { name: "Doctor on Call",                       page: "services/doctor-on-call.html",          image: "doctor-on-call" },
  { name: "Nurse on Call / Home Nursing",         page: "services/nurse-on-call.html",           image: "nurse-on-call" },
  { name: "Wound Care at Home",                   page: "services/wound-care.html",              image: "wound-care" },
  { name: "Elderly Care at Home",                 page: "services/elderly-care.html",            image: "elderly-care" },
  { name: "Medical Weight Management Program",    page: "services/medical-weight-management.html", image: "weight-management" }
];

/* Google review screenshots shown in the home page testimonials carousel.
   One entry per card, in display order. To use the client's screenshots, save
   each image over the matching file in assets/images/reviews/ (or point src at a
   new file) and set width and height to that image's pixel size.
   The 18 screenshots were supplied by the client (empty space below each review trimmed). */
var REVIEW_SHOTS = [
  { src: "assets/images/reviews/google-review-01.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-02.jpg", width: 738, height: 627 },
  { src: "assets/images/reviews/google-review-03.jpg", width: 738, height: 1077 },
  { src: "assets/images/reviews/google-review-04.jpg", width: 738, height: 533 },
  { src: "assets/images/reviews/google-review-05.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-06.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-07.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-08.jpg", width: 738, height: 674 },
  { src: "assets/images/reviews/google-review-09.jpg", width: 738, height: 445 },
  { src: "assets/images/reviews/google-review-10.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-11.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-12.jpg", width: 738, height: 629 },
  { src: "assets/images/reviews/google-review-13.jpg", width: 738, height: 623 },
  { src: "assets/images/reviews/google-review-14.jpg", width: 738, height: 629 },
  { src: "assets/images/reviews/google-review-15.jpg", width: 738, height: 442 },
  { src: "assets/images/reviews/google-review-16.jpg", width: 738, height: 674 },
  { src: "assets/images/reviews/google-review-17.jpg", width: 738, height: 443 },
  { src: "assets/images/reviews/google-review-18.jpg", width: 738, height: 534 }
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
