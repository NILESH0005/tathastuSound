module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        cloud: {
          "0%, 100%": { transform: "translateX(0px) rotate(0deg)" },
          "50%": { transform: "translateX(20px) rotate(8deg)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 0.7 },
        },
        soundWave: {
          "0%, 100%": { height: "20%" },
          "50%": { height: "80%" },
        },
        soundWaveHover: {
          "0%, 100%": { height: "30%" },
          "50%": { height: "100%" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-shift": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            filter: "brightness(1)" 
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            filter: "brightness(1.3)" 
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 },
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 10s ease-in-out infinite",
        cloud: "cloud 12s ease-in-out infinite",
        "fade-in-up": "fadeInUp 1.5s ease-out forwards",
        "spin-slow": "spinSlow 30s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 25s linear infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "sound-wave": "soundWave 1s ease-in-out infinite",
        "sound-wave-hover": "soundWaveHover 0.8s ease-in-out infinite",
        "gradient": "gradient 3s ease infinite",
        "gradient-shift": "gradient-shift 2s ease infinite",
        shimmer: "shimmer 2s infinite",
        ripple: "ripple 1s linear forwards",
      },
    },
  },
  plugins: [],
};