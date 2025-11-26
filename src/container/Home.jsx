import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../constant/images.js";
import ParallaxSection from "../component/ParallaxSection";
import ContentSection from "../component/ContentSection";
import CommunityHighlights from "../component/CommunityHighlights";
import AboutCompany from "../component/AboutCompany.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexUS, setCurrentIndexUS] = useState(0);

  // Static mock data (replace with actual if needed)
  const homeData = {
    parallax: {
      title: "Welcome to Our Community",
      subtitle: "Innovate. Learn. Grow.",
      image: images.us1,
    },
    content: {
      heading: "About Us",
      text: "We are committed to providing knowledge, growth, and opportunities for everyone.",
    },
  };

  const usSlides = [
    images.us1,
    images.us2,
    images.us3,
    images.us4,
    images.us5,
    images.us6,
    images.us7,
    images.us9,
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === usSlides.length - 1 ? 0 : prevIndex + 1
      );
      setCurrentIndexUS((prevIndex) =>
        prevIndex === usSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [usSlides.length]);

  const handleRedirect = () => navigate("/EventWorkshopPage");
  const handleRedirect01 = () => navigate("/Discussion");

  // Final render
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black to-blue-500">
      <ParallaxSection data={homeData?.parallax} />
      <CommunityHighlights />
      <ContentSection data={homeData?.content} />
      <AboutCompany />
    </div>
  );
};

export default Home;
