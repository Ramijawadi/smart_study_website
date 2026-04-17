import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Smart Study Space | Monastir",
  description: "Un coworking moderne, calme et inspirant — ouvert 16h/24.",
  icons: {
    icon: "/assets/logosmart1.png",
    apple: "/assets/logosmart1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${cairo.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
