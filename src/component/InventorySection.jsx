import audioImg from "../assets/audio-img.jpg";
import videoImg from "../assets/video-img.jpg";

const inventory = [
  {
    id: 1,
    title: "Audio",
    subtitle: "Professional Sound Systems",
    image: audioImg,
  },
//   {
//     id: 2,
//     title: "Lighting",
//     subtitle: "Stage & Event Lighting",
//     image: lightingImg,
//   },
  {
    id: 3,
    title: "Video",
    subtitle: "LED Walls & Visuals",
    image: videoImg,
  },
//   {
//     id: 4,
//     title: "Backline",
//     subtitle: "Instruments & Stage Gear",
//     image: backlineImg,
//   },
];

export default function InventorySection() {
  return (
    <section className="w-full bg-slate-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Inventory
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Complete technical solutions for every event
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 overflow-hidden cursor-pointer bg-slate-300"
            >
              <div
                className="absolute inset-0 
                           bg-center bg-cover
                           saturate-100 md:saturate-0 
                           md:group-hover:saturate-100
                           group-hover:scale-110
                           transition-all duration-700"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500" />
              <div className="relative z-10 h-full p-6 flex flex-col justify-between text-slate-300 group-hover:text-white transition-colors duration-500">
                <div className="ml-auto text-3xl transform group-hover:-rotate-45 transition-transform duration-500">
                  →
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-80">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
