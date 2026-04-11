import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Corner Stone Design & Media | Vision Made Visible",
  description: "The Studio Behind Brands That Get Noticed. Brand strategy, visual identity, social media management, and web development services.",
  keywords: ["branding", "social media management", "web design", "SEO", "digital marketing", "brand strategy", "visual identity", "India"],
  authors: [{ name: "Corner Stone Design & Media" }],
  creator: "Corner Stone Design & Media",
  publisher: "Corner Stone Design & Media",
  robots: "index, follow",
  alternates: {
    canonical: "https://cornerstonemedia.in",
  },
  openGraph: {
    title: "Corner Stone Design & Media | Vision Made Visible",
    description: "The Studio Behind Brands That Get Noticed. Brand strategy, visual identity, social media management, and web development services.",
    url: "https://cornerstonemedia.in",
    siteName: "Corner Stone Design & Media",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://cornerstonemedia.in/Logo%20Kit%20-%20CNRSTN/Cornerstone%20Secondary%20Logo%20Green.png",
        width: 1200,
        height: 630,
        alt: "Corner Stone Design & Media - Vision Made Visible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corner Stone Design & Media | Vision Made Visible",
    description: "The Studio Behind Brands That Get Noticed. Brand strategy, visual identity, social media management, and web development services.",
    images: ["https://cornerstonemedia.in/Logo%20Kit%20-%20CNRSTN/Cornerstone%20Secondary%20Logo%20Green.png"],
  },
  icons: {
    icon: '/Logo Kit - CNRSTN/Cornerstone Icon White.png',
    shortcut: '/Logo Kit - CNRSTN/Cornerstone Icon White.png',
    apple: '/Logo Kit - CNRSTN/Cornerstone Icon White.png',
  },
  verification: {
    google: "G-PWL0NKFD5B",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PWL0NKFD5B"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PWL0NKFD5B');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Corner Stone Design & Media",
              url: "https://cornerstonemedia.in",
              logo: "https://cornerstonemedia.in/Logo%20Kit%20-%20CNRSTN/Cornerstone%20Secondary%20Logo%20Green.png",
              description: "The Studio Behind Brands That Get Noticed. Brand strategy, visual identity, social media management, and web development services.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-63604-14393",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.instagram.com/cornerstonemedia.in",
              ],
              serviceType: [
                "Branding",
                "Social Media Management",
                "Web Design & Development",
                "SEO",
                "Performance Marketing",
                "Influencer Marketing",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
