import AboutSection from "./AboutSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
// InventorySection is removed from Home as we have separate pages, 
// or maybe we keep a teaser? The plan implies separating it. 
// But commonly a landing page might still have the summary section.
// However, the user said "separate pages for audio and light products", 
// and "work on the implementation plan" which said "Home Page: Moving the current landing page content to a distinct Home route."
// I will keep the existing sections but maybe remove InventorySection if it's redundant, 
// OR keep it as a "Featured" section. 
// Given the user wants "separate pages", usually the main "Inventory" section on Home might just link to them.
// Let's check what InventorySection currently does. 
// It currently seems to be a placeholder or the one I was supposed to edit.
// I'll keep the structure of the original App.jsx but maybe without InventorySection if it conflicts,
// or I will leave it for now and the user can decide to remove it. 
// actually, I'll keep it as per "Move current App.jsx content".
import InventorySection from "./InventorySection";
import VideoSection from "./VideoSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <VideoSection />
            <InventorySection />
            <AboutSection />
            <Footer />
        </>
    );
}
