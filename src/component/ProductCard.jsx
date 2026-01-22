import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ProductCard({ image, name, brand, stock, status }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.2 1"]
    });

    // Slide up effect on scroll
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, opacity }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${status === 'Available'
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : status === 'Low Stock'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                            }`}
                    >
                        {status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 relative">
                <div className="mb-2">
                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{brand}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors">{name}</h3>

                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-blue-500' : 'bg-gray-600'} animate-pulse`} />
                        <span>Stock: {stock}</span>
                    </div>
                    <button className="text-white hover:text-blue-400 transition-colors">
                        Details →
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
