import { useState, useEffect } from 'react';
import { Search, Filter, Lightbulb } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';

export default function LightInventory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const lightProducts = products.filter(p => p.category === 'light');
    const brands = Array.from(new Set(lightProducts.map(p => p.brand)));

    const filteredProducts = lightProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });

    return (
        <div className="min-h-screen bg-black pt-24 pb-8 px-4 md:px-8">
            {/* Background Gradients (Gold/Amber for Light) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-full bg-amber-600/20 border border-amber-500/30">
                            <Lightbulb className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">
                                Video Inventory
                            </h1>
                            <p className="text-gray-400 mt-1">Professional stage lighting & effects</p>
                        </div>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search lights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-3">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                            >
                                <option value="all">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                image={product.image}
                                name={product.name}
                                brand={product.brand}
                                stock={product.stock}
                                status={product.status}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                        <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-xl">No lighting equipment found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
