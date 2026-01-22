import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import AudioInventory from "./component/AudioInventory";
import LightInventory from "./component/LightInventory";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory/audio" element={<AudioInventory />} />
        <Route path="/inventory/light" element={<LightInventory />} />
      </Routes>
    </>
  );
}
