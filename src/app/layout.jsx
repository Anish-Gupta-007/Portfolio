import { Outfit, Syne } from "next/font/google";
import "./globals.css";

// Import our new components
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/sections/Navbar";
import Cursor from "@/components/ui/Cursor";
import Hero3D from "@/components/three/Hero3D";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata = {
  title: "Anish Portfolio",
  description: "A futuristic 3D portfolio showcasing high-end software development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${syne.variable} font-sans antialiased bg-primary text-text-main`}>
        <Hero3D />
        <SmoothScroll>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
