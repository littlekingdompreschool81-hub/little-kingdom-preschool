import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SCHOOL_INFO } from "@/lib/constants";

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
};

function getValidSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new URL("https://littlekingdomedu.com");
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol);
  } catch {
    return new URL("https://littlekingdomedu.com");
  }
}

export const metadata: Metadata = {
  metadataBase: getValidSiteUrl(),
  title: {
    default: `${SCHOOL_INFO.name} — ${SCHOOL_INFO.motto}`,
    template: `%s | ${SCHOOL_INFO.name}`,
  },
  description:
    "Little Kingdom Preschool in Dombivli West. A joyful, nurturing early childhood learning center for Play Group, Nursery, Junior KG, and Senior KG. Learning by doing.",
  keywords: [
    "Little Kingdom Preschool",
    "Preschool in Dombivli",
    "Preschool in Dombivli West",
    "Best Preschool Dombivli",
    "Nursery Admission Dombivli",
    "Play Group Dombivli",
    "Junior KG Dombivli",
    "Senior KG Dombivli",
    "Little Mind Big Dreams",
    "Neeta Jadhav",
  ],
  authors: [{ name: `${SCHOOL_INFO.name} - Principal ${SCHOOL_INFO.principal}` }],
  creator: SCHOOL_INFO.name,
  publisher: SCHOOL_INFO.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SCHOOL_INFO.name,
    title: `${SCHOOL_INFO.name} — ${SCHOOL_INFO.motto}`,
    description:
      "A joyful, nurturing early childhood center for Play Group, Nursery, Junior KG, and Senior KG across 2 campuses in Dombivli West. Admissions open for 2026–2027.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: `${SCHOOL_INFO.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SCHOOL_INFO.name} — ${SCHOOL_INFO.motto}`,
    description:
      "Play Group, Nursery, Jr. KG & Sr. KG admissions open across 2 campuses in Dombivli West.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Preschool",
        "@id": "https://littlekingdomedu.com/#organization",
        "name": SCHOOL_INFO.name,
        "alternateName": "Little Kingdom Pre-School",
        "url": "https://littlekingdomedu.com",
        "logo": "https://littlekingdomedu.com/images/logo.png",
        "telephone": "+917039015296",
        "email": "littlekingdompreschool81@gmail.com",
        "slogan": SCHOOL_INFO.motto,
        "description":
          "Joyful, nurturing early childhood education center for Play Group, Nursery, Junior KG, and Senior KG across 2 campuses in Dombivli West.",
        "founder": {
          "@type": "Person",
          "name": SCHOOL_INFO.principal,
          "jobTitle": "Principal",
        },
        "department": [
          {
            "@type": "EducationalOrganization",
            "name": SCHOOL_INFO.branches[0].name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": SCHOOL_INFO.branches[0].address,
              "addressLocality": "Dombivli, Kalyan",
              "addressRegion": "Maharashtra",
              "postalCode": "421202",
              "addressCountry": "IN",
            },
            "telephone": "+917039015296",
            "hasMap": SCHOOL_INFO.branches[0].googleMapsUrl,
          },
          {
            "@type": "EducationalOrganization",
            "name": SCHOOL_INFO.branches[1].name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": SCHOOL_INFO.branches[1].address,
              "addressLocality": "Dombivli, Kalyan",
              "addressRegion": "Maharashtra",
              "postalCode": "421202",
              "addressCountry": "IN",
            },
            "telephone": "+917039015296",
            "hasMap": SCHOOL_INFO.branches[1].googleMapsUrl,
          },
        ],
        "sameAs": [
          SCHOOL_INFO.branches[0].googleMapsUrl,
          SCHOOL_INFO.branches[1].googleMapsUrl,
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory-100 text-brand-text antialiased selection:bg-sunshine-200 selection:text-sky-900 min-h-screen flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
