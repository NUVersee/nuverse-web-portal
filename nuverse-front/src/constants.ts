export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5297";
export interface NavItem {
    name: string;
    href: string;
    /** For hash links that need different behavior on home vs other pages */
    homeHref?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "360 Tour", href: "/#360-tour", homeHref: "#360-tour" },
    { name: "VR Services", href: "/#services", homeHref: "#services" },
    { name: "Request Tour", href: "/#contact", homeHref: "#contact" },
    { name: "About Us", href: "/#about", homeHref: "#about" },
];

export const CONTACT_INFO = {
    email: "nuverse6@gmail.com",
    phone: "+20 2 3847 6656",
    location: "Sheikh Zayed, Giza, Egypt",
} as const;

// =============================================================================
// Social Media Links
// =============================================================================

export const SOCIAL_LINKS = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/nu_versee?igsh=cHRxcDQwNzcxMDN2",
} as const;

export const BRAND = {
    name: "NUverse",
    logoPath: "/Images/NUverse Logo.webp",
    faviconPath: "/Images/NUverse Logo.webp",
    vrIconPath: "/Images/VR.webp",
    tagline: "Experience the future of education through immersive virtual reality technology.",
} as const;

export const META = {
    title: "NUverse - Virtual Reality University Tour",
    description: "Experience Nile University in immersive 360° VR. Explore campus, labs, and student life from anywhere.",
    copyright: `© ${new Date().getFullYear()} NUverse - Nile University VR. All rights reserved.`,
} as const;
