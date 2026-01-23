import engineer1 from "../assets/engineer1.jpg"; 
import engineer2 from "../assets/engineer2.jpeg";


const engineers = [
  {
    id: 1,
    name: "Nilesh Thakur",
    role: "Chief Sound Engineer",
    experience: "12+ Years Experience",
    skills: ["Live Sound", "FOH Mixing", "System Tuning"],
    image: engineer1,
  },
  {
    id: 2,
    name: "Sudhanshu Kotiyal",
    role: "Monitor Engineer",
    experience: "8+ Years Experience",
    skills: ["Stage Monitoring", "In-Ear Systems", "Artist Support"],
    image: engineer2,
  },
  {
    id: 3,
    name: "Sudhanshu Kotiyal",
    role: "Studio & Recording Engineer",
    experience: "7+ Years Experience",
    skills: ["Recording", "Post Production", "Mix & Master"],
    image: engineer2,
  },
  {
    id: 4,
    name: "Sudhanshu Kotiyal",
    role: "Lighting & Visual Engineer",
    experience: "10+ Years Experience",
    skills: ["Stage Lighting", "DMX", "Visual Programming"],
    image: engineer2,
  },
];

export default function AboutEngineers() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 
                         bg-gradient-to-r from-purple-400 to-blue-400 
                         bg-clip-text text-transparent">
            Meet Our Engineers
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            The professionals behind every perfect sound, flawless mix, and unforgettable live experience.
          </p>
        </div>

        {/* ENGINEER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {engineers.map((eng) => (
            <div
              key={eng.id}
              className="relative group rounded-3xl overflow-hidden
                         bg-gradient-to-b from-zinc-900 to-black
                         border border-white/10 shadow-2xl
                         hover:scale-[1.02] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" />

              <div className="relative h-64 overflow-hidden">
                <img
                  src={eng.image}
                  alt={eng.name}
                  className="w-full h-full object-cover 
                             group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold mb-1">
                  {eng.name}
                </h3>

                <p className="text-purple-400 font-medium mb-2">
                  {eng.role}
                </p>

                <p className="text-sm text-white/60 mb-4">
                  {eng.experience}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {eng.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full 
                                 bg-zinc-800 border border-white/10 
                                 text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* STATUS BAR */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-xs text-white/50">STATUS</span>
                  <div className="flex-1 h-2 bg-black rounded-full overflow-hidden border border-white/10">
                    <div className="h-full w-3/4 bg-green-500 shadow-[0_0_8px_#22c55e]" />
                  </div>
                  <span className="text-xs text-green-400">ONLINE</span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
