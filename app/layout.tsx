import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vertical Constructions | Building with Strength & Purpose",
    template: "%s | Vertical Constructions",
  },
  icons: {
    icon: "/favicon.png",
  },

  description:
    "Vertical Constructions delivers professional construction, renovation, exterior and interior solutions with a focus on quality, precision, and lasting results.",
  keywords: [
    "Vertical Constructions",
    "construction",
    "renovation",
    "remodeling",
    "commercial construction",
    "residential construction",
    "project planning",
  ],
  authors: [{ name: "Vertical Constructions" }],
  creator: "Vertical Constructions",
  metadataBase: new URL("http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}