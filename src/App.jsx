import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import AudioInventory from "./component/AudioInventory";
import LightInventory from "./component/LightInventory";
import ContactConsole from "./component/ContactConsole";
import AboutEngineers from "./component/AboutEngineers";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory/audio" element={<AudioInventory />} />
        <Route path="/inventory/light" element={<LightInventory />} />
        <Route path="/contact" element={<ContactConsole />} />
        <Route path="/about" element={<AboutEngineers />} />

      </Routes>
    </>
  );
}
