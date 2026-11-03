export const siteConfig = {
  name: "BloodLine",
  tagline: "Give Blood • Save Lives",
  positioning: "Bangladesh National Blood Donation Network",
  description:
    "BloodLine is a nationwide blood donation, donor discovery, emergency blood request, volunteer coordination, digital identity, hospital directory, and community management platform for Bangladesh.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  logo: "/brand/bloodline-logo.png",
  hotline: process.env.NEXT_PUBLIC_NATIONAL_HOTLINE || "10672",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@bloodline.org",
  disclaimer:
    "BloodLine is a nationwide blood discovery and volunteer coordination network. It does not provide medical services, laboratory screening, or clinical compatibility guarantees. Blood testing, grouping confirmation, and transfusions must be executed by certified medical professionals and authorized healthcare facilities.",
  idCardDisclaimer:
    "BloodLine Digital Identity — Not a Government-Issued Identity Document or Medical License.",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Find Donors", href: "/donors" },
    { title: "Emergency Requests", href: "/emergency" },
    { title: "Donation Camps", href: "/camps" },
    { title: "Hospitals", href: "/hospitals" },
    { title: "Blood Banks", href: "/blood-banks" },
    { title: "Volunteer", href: "/volunteer" },
    { title: "About Us", href: "/about" },
    { title: "Resources", href: "/resources" },
    { title: "Contact", href: "/contact" },
  ],
  socialLinks: {
    facebook: "https://facebook.com/bloodline.bd",
    youtube: "https://youtube.com/@bloodlinebd",
    linkedin: "https://linkedin.com/company/bloodline-bd",
    twitter: "https://x.com/bloodline_bd",
  },
  bloodGroups: [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ] as const,
};

export type SiteConfig = typeof siteConfig;
