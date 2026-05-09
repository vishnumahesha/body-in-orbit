import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://body-in-orbit.vercel.app"),
  title: "Body in Orbit — Astronaut Molecular Debrief",
  description: "Interactive post-flight molecular debrief built from Inspiration4 omics data.",
  openGraph: {
    title: "Body in Orbit",
    description: "The astronaut landed in three days. The biology did not land all at once.",
    url: "https://body-in-orbit.vercel.app",
    images: [{ url: "/figures/living-baseline.png", width: 1920, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body in Orbit",
    description: "Communication-safety prototype for post-flight molecular debriefs.",
    images: ["/figures/living-baseline.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
