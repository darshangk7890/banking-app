import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({  variable: "--font-geist-sans", subsets: ["latin"] });
const ibmPlexserif = IBM_Plex_Serif({ 
  variable: "--font-geist-sans",
  subsets : ['latin'],
  weight : ['400','700']
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HASHIRA",
  description: "HASHIRA BANKING APP IS THE BEST BANK IN INDIA AND JAPAN",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ibmPlexserif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
