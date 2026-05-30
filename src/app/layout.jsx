import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Import our new components
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/sections/Navbar";
import Cursor from "@/components/ui/Cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata = {
  title: "Anish Portfolio",
  description: "A futuristic 3D portfolio showcasing high-end software development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-primary text-text-main`}>
        <SmoothScroll>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
