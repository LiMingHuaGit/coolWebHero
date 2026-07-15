import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-hero-bg">
      <Navbar />
      <HeroSection />
    </div>
  );
}
