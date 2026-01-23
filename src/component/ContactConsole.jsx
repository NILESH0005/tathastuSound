import { useState } from "react";

export default function ContactConsole() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (later connect to backend)");
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* 🎛 LEFT: REALISTIC STUDIO MIXING CONSOLE */}
        <div className="relative bg-gradient-to-b from-zinc-950 to-black rounded-3xl p-8 shadow-2xl border border-white/10">

          <h2 className="text-3xl font-bold mb-8 tracking-wide text-center">
            🎚 Studio Mixing Console
          </h2>

          {/* Channel Strips */}
          <div className="grid grid-cols-4 gap-6 mb-10">

            {[1, 2, 3, 4].map((ch) => (
              <div
                key={ch}
                className="relative flex flex-col items-center bg-zinc-900 rounded-2xl p-4 border border-white/5 shadow-inner"
              >
                {/* Channel Label */}
                <span className="text-xs text-white/60 mb-2">CH {ch}</span>

                {/* VU Meter */}
                <div className="w-6 h-32 bg-black rounded-full border border-white/10 overflow-hidden mb-4 relative">
                  <div
                    className="absolute bottom-0 left-0 w-full 
                               bg-gradient-to-t from-green-500 via-yellow-400 to-red-500
                               animate-vu"
                    style={{ height: `${30 + ch * 15}%` }}
                  />
                </div>

                {/* Fader */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="rotate-[-90deg] w-28 accent-purple-500 mb-6"
                />

                {/* Knob */}
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 
                                flex items-center justify-center shadow-inner mb-3">
                  <div className="w-1 h-4 bg-white/70 rounded-full" />
                </div>

                {/* LED Indicator */}
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />

              </div>
            ))}

          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <ConsoleButton label="GAIN" />
            <ConsoleButton label="EQ" />
            <ConsoleButton label="COMP" />
            <ConsoleButton label="FX" />
            <ConsoleButton label="AUX" />
            <ConsoleButton label="MUTE" danger />
          </div>

          {/* MASTER SECTION */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 shadow-inner">
            <p className="text-sm text-white/60 mb-3 text-center">
              MASTER OUTPUT
            </p>

            <div className="flex items-end justify-center gap-6 h-32">

              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-full bg-black rounded-full border border-white/10 overflow-hidden relative"
                >
                  <div
                    className="absolute bottom-0 left-0 w-full 
                               bg-gradient-to-t from-green-500 via-yellow-400 to-red-500
                               animate-vu-slow"
                    style={{ height: `${60 + i * 10}%` }}
                  />
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* 📩 RIGHT: CONTACT FORM */}
        <div className="bg-zinc-900/80 rounded-3xl p-10 shadow-2xl border border-white/10">

          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Contact the Sound Engineer
          </h2>

          <p className="text-white/60 mb-8">
            Let us know about your event, setup requirements, and sound needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm mb-2 text-white/70">
                Event Details / Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold tracking-wide
                         bg-gradient-to-r from-purple-500 to-blue-500
                         hover:scale-[1.02] transition-all shadow-lg"
            >
              🎤 Send to Engineer
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

/* --------- Small Components --------- */

function ConsoleButton({ label, danger }) {
  return (
    <button
      className={`py-3 rounded-xl text-sm font-semibold tracking-wide
      ${danger
        ? "bg-red-600/80 hover:bg-red-600"
        : "bg-zinc-800 hover:bg-zinc-700"}
      border border-white/10 transition shadow-inner`}
    >
      {label}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-2 text-white/70">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
