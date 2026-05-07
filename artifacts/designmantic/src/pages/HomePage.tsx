import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";
import { useWindowHandle } from "@/hooks/useWindowHandle";

export default function HomePage() {
  const navigate = useNavigate();
  const { openInNewTab } = useWindowHandle();
  const [activeTab, setActiveTab] = useState("logo-design");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Testimonials carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { name: "Sandy R", quote: "Adam at Design Mantic is very responsive and delivered above and beyond. Highly recommend!", subtitle: "Small Business Owner" },
    { name: "Diana Z", quote: "I am super super picky. Everything must be perfect and DesignMantic nailed it!", subtitle: "Startup Founder" },
    { name: "Essential Wellness", quote: "I will admit that I was apprehensive about paying but the results exceeded expectations.", subtitle: "Health Clinic" },
    { name: "John M", quote: "If you're looking to make custom logos then go directly to DesignMantic. Outstanding work!", subtitle: "Restaurant Owner" },
    { name: "Sarah K", quote: "The team at DesignMantic understood my vision perfectly. Will definitely use again!", subtitle: "Freelance Photographer" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/logo-maker?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/logo-maker');
    }
  };

  const servicesTabs = [
    { id: 'logo-design', name: 'Logo Design', color: '#c61e53', desc: 'Create a professional logo in minutes with our AI-powered logo maker. Choose from thousands of templates and customize to fit your brand.' },
    { id: 'business-card', name: 'Business Card', color: '#2563eb', desc: 'Design custom business cards that leave a lasting impression. Select a template and personalize it with your details.' },
    { id: 'letterhead', name: 'Letterhead Design', color: '#16a34a', desc: 'Professional letterhead designs for official correspondence. Ensure your brand is consistent across all documents.' },
    { id: 'email-signature', name: 'Email Signature', color: '#d97706', desc: 'Create clickable, professional email signatures. Look credible in every email you send.' },
    { id: 'facebook-cover', name: 'Facebook Cover', color: '#4f46e5', desc: 'Perfectly sized Facebook cover photos for your business page. Stand out on social media.' },
    { id: 'instagram', name: 'Instagram', color: '#db2777', desc: 'Eye-catching Instagram posts and stories to engage your followers and grow your audience.' },
    { id: 'flyer', name: 'Flyer Design', color: '#0891b2', desc: 'Promotional flyers for events, sales, and marketing. Print-ready designs in minutes.' },
    { id: 'infographic', name: 'Infographic', color: '#059669', desc: 'Turn complex data into engaging visual stories with our customizable infographic templates.' },
    { id: 'twitter-banner', name: 'Twitter Banner', color: '#0284c7', desc: 'Custom Twitter header images to make your profile pop and communicate your message.' },
    { id: 'linkedin-banner', name: 'LinkedIn Banner', color: '#3b82f6', desc: 'Professional LinkedIn background banners to enhance your personal or company profile.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a0510] via-[#4a0e26] to-[#c61e53] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Jumpstart Your Business with a Perfect Logo Design</h1>
            <p className="text-xl text-white/80 mb-8">Completely Free. No credit card required.</p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl mb-4">
              <input 
                type="text" 
                placeholder="Enter your business name..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-4 rounded text-gray-900 outline-none focus:ring-2 focus:ring-white shadow-lg text-lg"
              />
              <button type="submit" className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-8 py-4 rounded font-bold text-lg shadow-lg whitespace-nowrap border-2 border-transparent hover:border-white/20">
                Get a Logo
              </button>
            </form>
            
            <div className="flex gap-4 text-white/60 text-sm mb-8">
              <Link to="/logo-maker?industry=music" className="hover:text-white underline decoration-white/30">Music logo</Link>
              <span>|</span>
              <Link to="/logo-maker?industry=education" className="hover:text-white underline decoration-white/30">Education logo</Link>
              <span>|</span>
              <Link to="/logo-maker?industry=sports" className="hover:text-white underline decoration-white/30">Sports logo</Link>
            </div>
            
            <div className="flex items-center gap-3 bg-black/20 p-4 rounded-lg inline-flex backdrop-blur-sm">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div>
                <span className="font-bold text-white mr-2">Excellent</span>
                <span className="text-white/70 text-sm">Based on 2,000+ reviews</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full hidden md:block">
            <div className="grid grid-cols-3 gap-3 rotate-12 transform scale-110 opacity-90">
              {[
                '#1e3a8a', '#16a34a', '#b91c1c', 
                '#d97706', '#7c3aed', '#0891b2',
                '#be185d', '#0f766e', '#a16207'
              ].map((color, i) => (
                <div key={i} className="aspect-square rounded-xl shadow-2xl flex items-center justify-center bg-white border border-white/20 relative overflow-hidden" style={{transform: `translateY(${i % 3 === 1 ? '20px' : '0'})`}}>
                  <div className="absolute inset-0 opacity-10" style={{backgroundColor: color}}></div>
                  <svg className="w-12 h-12 drop-shadow-md" style={{color}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">A Trusted Design Company</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google', 'Clutch', 'Yelp', 'SiteJabber', 'WebsitePlanet', 'SMBGuide', 'SoftwareSuggest', 'Apple'].map(brand => (
              <div key={brand} className="bg-white border border-gray-200 rounded-md p-3 flex items-center justify-center w-28 h-12 shadow-sm font-bold text-gray-700 text-sm">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#222]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="relative">
              <div className="text-[120px] font-black text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2 -z-10 select-none">1</div>
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c61e53]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Discover a Variety of Logo Designs</h3>
              <p className="text-gray-600">Enter your business name and browse through thousands of professionally designed logo templates.</p>
            </div>
            <div className="relative">
              <div className="text-[120px] font-black text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2 -z-10 select-none">2</div>
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c61e53]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Plenty of Customizable Options</h3>
              <p className="text-gray-600">Use our intuitive editor to change colors, fonts, layouts, and icons until it's exactly what you want.</p>
            </div>
            <div className="relative">
              <div className="text-[120px] font-black text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2 -z-10 select-none">3</div>
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c61e53]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Downloading Your Logo is Just a Start</h3>
              <p className="text-gray-600">Get high-res files instantly and automatically generate matching business cards and social headers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tab Section */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#222]">Our Design Services</h2>
          
          <div className="flex overflow-x-auto gap-0 border-b border-gray-300 mb-10 hide-scrollbar max-w-6xl mx-auto">
            {servicesTabs.map(tab => (
              <button 
                key={tab.id}
                data-testid={`service-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 whitespace-nowrap font-medium text-sm transition-colors border-b-2 ${activeTab === tab.id ? 'border-[#c61e53] text-[#c61e53]' : 'border-transparent text-gray-600 hover:text-[#c61e53]'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {servicesTabs.map(tab => (
              <div key={tab.id} className={`${activeTab === tab.id ? 'block animate-in fade-in zoom-in duration-300' : 'hidden'}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">{tab.name} Maker</h3>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">{tab.desc}</p>
                    <button onClick={() => navigate(tab.id === 'logo-design' ? '/logo-maker' : `/services/${tab.id}`)} className="bg-[#c61e53] text-white px-8 py-3 rounded font-bold w-fit hover:bg-[#a01843] transition-colors shadow-md">
                      Start Designing
                    </button>
                  </div>
                  <div className="flex-1 min-h-[300px] md:min-h-auto relative overflow-hidden" style={{backgroundColor: tab.color + '20'}}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-white" style={{borderTop: `8px solid ${tab.color}`}}>
                        <div className="text-center px-6">
                          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: tab.color + '20', color: tab.color}}>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/></svg>
                          </div>
                          <span className="font-bold text-xl text-gray-800">{tab.name} Example</span>
                          <div className="mt-4 flex gap-2 justify-center">
                            <div className="w-12 h-2 rounded bg-gray-200"></div>
                            <div className="w-8 h-2 rounded bg-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow text-center group" data-testid="service-card-logo">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Logo Services</h3>
              <p className="text-gray-600 mb-6 text-sm">Professional logos for every business type and industry.</p>
              <button onClick={() => openInNewTab('/logo-maker')} data-testid="service-card-logo-btn" className="text-[#c61e53] font-bold hover:underline">Try Free &rarr;</button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow text-center group" data-testid="service-card-business-card">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Business Card Design</h3>
              <p className="text-gray-600 mb-6 text-sm">Create stunning business cards that match your logo perfectly.</p>
              <button onClick={() => openInNewTab('/services/business-card')} data-testid="service-card-biz-btn" className="text-[#c61e53] font-bold hover:underline">Start Now &rarr;</button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow text-center group" data-testid="service-card-brand">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Brand Identity</h3>
              <p className="text-gray-600 mb-6 text-sm">Complete branding packages for a cohesive professional look.</p>
              <button onClick={() => openInNewTab('/services/branding')} data-testid="service-card-brand-btn" className="text-[#c61e53] font-bold hover:underline">Try Free &rarr;</button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow text-center group" data-testid="service-card-video">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#c61e53] group-hover:scale-110 transition-transform cursor-pointer" onClick={() => modalEvents.open('video')}>
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">How DesignMantic Works</h3>
              <p className="text-gray-600 mb-6 text-sm">See how easy it is to create your brand identity in minutes.</p>
              <button onClick={() => modalEvents.open('video')} className="text-[#c61e53] font-bold hover:underline">Watch Video</button>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Website Templates Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#222] mb-2">AI-Powered Website Design Templates</h2>
              <p className="text-gray-600">Start with a professionally designed template and customize it.</p>
            </div>
            <Link to="/website/templates" className="text-[#c61e53] font-bold hover:underline hidden sm:block">View All Templates &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { id: 0, name: "Business Pro", color: "linear-gradient(135deg, #1e3a8a, #3b82f6)", category: "Business", slug: "business-pro" },
              { id: 1, name: "Restaurant Deluxe", color: "linear-gradient(135deg, #7f1d1d, #ef4444)", category: "Restaurant", slug: "restaurant-deluxe" },
              { id: 2, name: "Portfolio Clean", color: "linear-gradient(135deg, #14532d, #10b981)", category: "Portfolio", slug: "portfolio-clean" }
            ].map((t, i) => (
              <div key={i} className="group" data-testid={`template-card-${i}`}>
                <div
                  className="h-56 rounded-t-xl overflow-hidden relative cursor-pointer"
                  onClick={() => openInNewTab(`/website/templates?preview=${t.slug}`)}
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{background: t.color}}></div>
                  {/* Mock browser chrome */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-white/20 backdrop-blur-sm flex items-center px-2 gap-1.5 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      data-testid={`template-preview-${i}`}
                      onClick={(e) => { e.stopPropagation(); openInNewTab(`/website/templates?preview=${t.slug}`); }}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all"
                    >
                      Preview
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-t-0 border-gray-200 p-4 rounded-b-xl shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800">{t.name}</h3>
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{t.category}</span>
                  </div>
                  <button
                    onClick={() => openInNewTab(`/website/templates?preview=${t.slug}`)}
                    className="text-sm text-[#c61e53] hover:underline"
                  >
                    Browse Website Designs Free
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center sm:hidden">
            <Link to="/website/templates" className="text-[#c61e53] font-bold border border-[#c61e53] px-6 py-2 rounded inline-block w-full">View All Templates</Link>
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="bg-[#222] text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-[#c61e53] mb-6">Custom Design</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Looking for something completely unique? Work directly with our award-winning design team to create a custom identity that perfectly captures your brand's essence.
              </p>
              
              <ul className="space-y-4 mb-10 text-gray-300">
                {['Award winning designers', 'Decades of design experience', 'Secured and customized process', '100% Satisfaction guarantee'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-[#c61e53] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/services/custom" className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-8 py-4 rounded font-bold text-lg shadow-lg inline-block text-center w-full md:w-auto">
                Order Custom Design
              </Link>
            </div>
            
            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'branding', name: 'Complete Branding', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                  { id: 'tshirt', name: 'T-Shirt Design', icon: 'M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { id: 'letterhead', name: 'Letterhead Design', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                  { id: 'email', name: 'Email Signature', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                  { id: 'flyer', name: 'Flyer Design', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                  { id: 'wedding', name: 'Wedding Card', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                ].map(service => (
                  <Link to={`/services/${service.id}`} key={service.id} data-testid={`custom-tile-${service.id}`} className="bg-[#333] hover:bg-[#444] transition-colors rounded-lg p-6 flex flex-col items-center justify-center text-center group border border-[#444] hover:border-[#c61e53]">
                    <svg className="w-10 h-10 text-gray-400 group-hover:text-[#c61e53] transition-colors mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} /></svg>
                    <span className="font-semibold text-sm">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[#222] mb-12">What Our Customers Say</h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full shrink-0 px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-10 mx-auto max-w-2xl border border-gray-100 relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#c61e53] rounded-full flex items-center justify-center text-white text-3xl font-serif">"</div>
                      
                      <div className="flex justify-center text-yellow-400 mb-6 mt-2">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      
                      <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed text-center">"{t.quote}"</p>
                      
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                          {t.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900">{t.name}</h4>
                          <span className="text-sm text-gray-500">{t.subtitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === i ? 'bg-[#c61e53]' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to testimonial ${i+1}`}
                />
              ))}
            </div>
            
            {/* Arrows */}
            <button onClick={() => setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#c61e53] hover:scale-110 transition-all border border-gray-100 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#c61e53] hover:scale-110 transition-all border border-gray-100 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}