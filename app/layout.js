import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Windows XP Portfolio",
    template: "%s | Windows XP Portfolio"
  },
  description: "An interactive Windows XP-themed portfolio showcasing my web development projects and skills",
  keywords: [
    "Windows XP",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Interactive Portfolio"
  ],
  authors: [{ name: "Digvijay Mangaonkar" }],
  creator: "Digvijay Mangaonkar",
  publisher: "Digvijay Mangaonkar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dj07.me',
    siteName: 'Windows XP Portfolio',
    title: 'Windows XP Portfolio',
    description: 'An interactive Windows XP-themed portfolio showcasing my web development projects and skills',
    images: [
      {
        url: 'https://dj07.me/images/image.png', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Windows XP Portfolio Preview',
      },
    ],
  },
  alternates: {
    canonical: 'https://dj07.me' ,
  },
  manifest: '/manifest.json', // If you have a web manifest file
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add any additional meta tags or links here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
