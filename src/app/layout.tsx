import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Study Space | Monastir",
  description: "Un coworking moderne, calme et inspirant — ouvert 24h/24.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${playfairDisplay.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
