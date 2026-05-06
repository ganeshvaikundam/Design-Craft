import { useState } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function WebsiteTemplatesPage() {
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [sort, setSort] = useState("popular");

  const templates = [
    { name: "Business Pro", category: "Business", price: "$49", color: "linear-gradient(135deg, #1e3a8a, #3b82f6)", slug: "business-pro" },
    { name: "Restaurant Deluxe", category: "Restaurant", price: "$39", color: "linear-gradient(135deg, #7f1d1d, #ef4444)", slug: "restaurant-deluxe" },
    { name: "Portfolio Clean", category: "Portfolio", price: "Free", color: "linear-gradient(135deg, #14532d, #10b981)", slug: "portfolio-clean" },
    { name: "Modern Store", category: "E-commerce", price: "$79", color: "linear-gradient(135deg, #4c1d95, #8b5cf6)", slug: "modern-store" },
    { name: "Medical Plus", category: "Medical", price: "$59", color: "linear-gradient(135deg, #064e3b, #34d399)", slug: "medical-plus" },
    { name: "Creative Agency", category: "Creative", price: "$49", color: "linear-gradient(135deg, #701a75, #a855f7)", slug: "creative-agency" },
    { name: "Tech Startup", category: "Business", price: "$49", color: "linear-gradient(135deg, #0c4a6e, #0ea5e9)", slug: "tech-startup" },
    { name: "Real Estate Elite", category: "Real Estate", price: "$69", color: "linear-gradient(135deg, #451a03, #d97706)", slug: "real-estate-elite" },
    { name: "Minimal Blog", category: "Blog", price: "Free", color: "linear-gradient(135deg, #171717, #737373)", slug: "minimal-blog" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <section className="bg-white border-b py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">AI-Powered Website Design Templates</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Professional, affordable, and fully customizable templates for any business. Start with a beautiful foundation and make it yours.</p>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              id="template-industry" 
              name="templateIndustry" 
              data-testid="template-industry-select" 
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white flex-1 md:w-48"
            >
              <option value="">All Industries</option>
              <option value="business">Business</option>
              <option value="restaurant">Restaurant</option>
              <option value="portfolio">Portfolio</option>
              <option value="ecommerce">E-commerce</option>
              <option value="photography">Photography</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="real-estate">Real Estate</option>
              <option value="blog">Blog</option>
              <option value="fashion">Fashion</option>
              <option value="nonprofit">Non-profit</option>
            </select>
            
            <select 
              id="template-style" 
              name="templateStyle" 
              data-testid="template-style-select" 
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white flex-1 md:w-40 hidden sm:block"
            >
              <option value="">All Styles</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
              <option value="corporate">Corporate</option>
              <option value="creative">Creative</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
            <span className="text-sm text-gray-500 hidden md:inline">Sort by:</span>
            <select 
              id="template-sort" 
              name="templateSort" 
              data-testid="template-sort-select" 
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white flex-1 md:w-48 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((t, i) => (
            <div key={i} data-testid={`template-card-${i}`} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col group">
              <div className="h-56 relative cursor-pointer" onClick={() => modalEvents.open('templatePreview', t)}>
                <div className="absolute inset-0" style={{background: t.color}}></div>
                {/* Browser UI Mock */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white/20 backdrop-blur-sm flex items-center px-2 gap-1.5 z-10 border-b border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                {/* Content Mock */}
                <div className="absolute inset-x-4 top-10 bottom-0 bg-white/10 rounded-t-lg backdrop-blur-sm p-4">
                  <div className="w-1/2 h-4 bg-white/40 rounded mb-4"></div>
                  <div className="w-3/4 h-2 bg-white/20 rounded mb-2"></div>
                  <div className="w-2/3 h-2 bg-white/20 rounded mb-6"></div>
                  <div className="w-20 h-6 bg-white/50 rounded"></div>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{t.name}</h3>
                  <span className={`font-bold ${t.price === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>{t.price}</span>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{t.category}</span>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    data-testid={`template-preview-${i}`}
                    onClick={() => modalEvents.open('templatePreview', t)}
                    className="border border-gray-300 hover:border-[#c61e53] hover:text-[#c61e53] transition-colors py-2 rounded font-medium text-sm text-gray-600"
                  >
                    Preview
                  </button>
                  <button 
                    data-testid={`template-use-${i}`}
                    onClick={() => { modalEvents.open('templatePreview', t); }}
                    className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-2 rounded font-medium text-sm shadow-sm"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="border-2 border-gray-200 text-gray-600 hover:border-[#c61e53] hover:text-[#c61e53] px-8 py-3 rounded font-bold transition-colors">
            Load More Templates
          </button>
        </div>
      </section>
    </div>
  );
}