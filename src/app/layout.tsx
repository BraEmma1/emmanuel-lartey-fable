import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import "./globals.css";

// Display: variable width axis lets one family speak in two voices
// (expanded and heavy for the name, normal width for headings).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Text: a calm, open grotesque for comfortable reading.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const description =
  "Emmanuel Lartey is an IT Manager and technology operations professional who implements business systems, manages digital infrastructure and leads operational teams.";

export const metadata: Metadata = {
  // Inner pages set a short title; the site name is appended to it.
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  authors: [{ name: site.name }],
  keywords: [
    "Emmanuel Lartey",
    "IT Manager",
    "IT Operations",
    "Technology Operations",
    "Digital Systems",
    "Business Systems Implementation",
    "Ghana",
  ],
  openGraph: {
    type: "profile",
    title: `${site.name} — ${site.role}`,
    description,
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e9eae6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${hanken.variable} antialiased`}
    >
      <body>
        {/* The shell every page shares: header, main landmark, footer. */}
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
