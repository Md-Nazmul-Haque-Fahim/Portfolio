import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Md. Nazmul Haque Fahim | CSE Graduate & AI/Data Science Enthusiast",
  description:
    "Portfolio of Md. Nazmul Haque Fahim — CSE Graduate from United International University (UIU), passionate about AI, Machine Learning, Data Science, and Full-Stack Development.",
  keywords: [
    "Md. Nazmul Haque Fahim",
    "Fahim",
    "Data Science",
    "Machine Learning",
    "Sign Language Recognition",
    "Full-Stack Developer",
    "UIU",
    "Bangladesh",
    "Python",
    "TensorFlow",
    "Portfolio",
  ],
  authors: [{ name: "Md. Nazmul Haque Fahim" }],
  openGraph: {
    title: "Md. Nazmul Haque Fahim | CSE Graduate & AI/Data Science Enthusiast",
    description:
      "Portfolio of Md. Nazmul Haque Fahim — CSE Graduate from United International University (UIU).",
    siteName: "Fahim Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Nazmul Haque Fahim | CSE Graduate & AI/Data Science Enthusiast",
    description:
      "Portfolio of Md. Nazmul Haque Fahim — CSE Graduate from United International University (UIU).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
