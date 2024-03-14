import { Poppins } from "next/font/google";

import { LandingNavbar } from "@/components/LandingPage/Navbar";
import { HeroSection } from "@/components/LandingPage/heroSection";
import { Footer } from "@/components/LandingPage/footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <LandingNavbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
