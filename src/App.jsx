import AboutSection from "./component/AboutSection";
import Footer from "./component/Footer";
import HeroSection from "./component/HeroSection";
import InventorySection from "./component/InventorySection";
import Navbar from "./component/Navbar";
import VideoSection from "./component/VideoSection";

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <VideoSection />
      <InventorySection />
      <AboutSection />
      <Footer />
    </>
  );
}
