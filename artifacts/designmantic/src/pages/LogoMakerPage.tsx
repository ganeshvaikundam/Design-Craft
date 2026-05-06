import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";

export default function LogoMakerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialIndustry = searchParams.get("industry") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [industry, setIndustry] = useState(initialIndustry);
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const industries = [
    "Restaurant", "Real Estate", "Construction", "Technology", "Photography", "Gaming", 
    "Beauty", "Music", "Education", "Fashion", "Finance", "Fitness", 
    "Medical", "Legal", "Sports", "Hospitality", "Security", "Jewelry"
  ];
  
  const colors = ['#c61e53', '#1e3a8a', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#db2777', '#ca8a04', '#0f766e', '#b91c1c'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (industry) params.set("industry", industry);
    setSearchParams(params);
  };

  // Pre-generate 18 cards
  const cards = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    industry: industries[i % industries.length],
    name: `${industries[i % industries.length]} Logo`,
    color: colors[i % colors.length]
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header */}
      <section className="bg-white border-b py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">Free Logo Maker with 10,000+ Creative Logos</h1>
        <p className="text-gray-600 mb-8 text-lg">Our AI-logo creator helps you build an impactful brand in minutes.</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="logo-search-input"
            placeholder="Search logos by industry e.g. restaurant, tech..." 
            className="flex-1 border rounded px-4 py-3 outline-none focus:ring-2 focus:ring-[#c61e53] text-lg shadow-sm"
          />
          <button type="submit" data-testid="logo-search-btn" className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-8 py-3 rounded font-bold text-lg shadow-sm">
            Get a Logo
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">Free Download. No credit card required.</p>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              id="industry-filter" 
              name="industry" 
              data-testid="industry-select" 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-[#c61e53] flex-1 md:w-48"
            >
              <option value="">All Industries</option>
              <option value="restaurant">Restaurant</option>
              <option value="real-estate">Real Estate</option>
              <option value="construction">Construction</option>
              <option value="technology">Technology</option>
              <option value="photography">Photography</option>
              <option value="gaming">Gaming</option>
              <option value="beauty">Beauty</option>
              <option value="music">Music</option>
              <option value="education">Education</option>
              <option value="fashion">Fashion</option>
              <option value="finance">Finance</option>
              <option value="fitness">Fitness</option>
              <option value="medical">Medical</option>
              <option value="legal">Legal</option>
              <option value="sports">Sports</option>
              <option value="hospitality">Hospitality</option>
              <option value="security">Security</option>
              <option value="jewelry">Jewelry</option>
              <option value="publishing">Publishing</option>
              <option value="religious">Religious</option>
              <option value="agriculture">Agriculture</option>
              <option value="automotive">Automotive</option>
              <option value="cleaning">Cleaning</option>
            </select>

            <select 
              id="style-filter" 
              name="style" 
              data-testid="style-select" 
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-[#c61e53] flex-1 md:w-40 hidden sm:block"
            >
              <option value="">All Styles</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimalist">Minimalist</option>
              <option value="bold">Bold</option>
              <option value="playful">Playful</option>
              <option value="elegant">Elegant</option>
              <option value="vintage">Vintage</option>
              <option value="abstract">Abstract</option>
              <option value="geometric">Geometric</option>
            </select>

            <select 
              id="color-filter" 
              name="color" 
              data-testid="color-select" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-[#c61e53] flex-1 md:w-40 hidden sm:block"
            >
              <option value="">All Colors</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
              <option value="pink">Pink</option>
              <option value="brown">Brown</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 font-medium hidden lg:block">Showing {cards.length} logos</div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} data-testid={`logo-card-${i}`} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden group">
              <div className="h-48 flex items-center justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZTllOWU5Ii8+Cjwvc3ZnPg==')]">
                <svg className="w-20 h-20 drop-shadow-sm transition-transform group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {i % 3 === 0 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 22h20L12 2z" fill={card.color} stroke={card.color} /> : 
                   i % 3 === 1 ? <circle cx="12" cy="12" r="10" fill={card.color} stroke={card.color} /> :
                   <rect x="3" y="3" width="18" height="18" rx="2" fill={card.color} stroke={card.color} />}
                </svg>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => modalEvents.open('logoEditor', { logoName: card.name })}
                    className="bg-[#c61e53] hover:bg-[#a01843] text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Customize
                  </button>
                  <button 
                    onClick={(e) => toggleFavorite(e, i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 ${favorites.has(i) ? 'bg-[#c61e53] text-white' : 'bg-white text-gray-500 hover:text-[#c61e53]'}`}
                  >
                    <svg className="w-5 h-5" fill={favorites.has(i) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white">
                <h3 className="font-semibold text-gray-800 text-center">{card.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="border-2 border-gray-200 text-gray-600 hover:border-[#c61e53] hover:text-[#c61e53] px-8 py-3 rounded font-bold transition-colors">
            Load More Logos
          </button>
        </div>
      </section>
    </div>
  );
}