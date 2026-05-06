import { useState } from "react";
import { Link } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";

export default function CustomDesignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      modalEvents.open('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const services = [
    { id: 'branding', name: 'Complete Branding', desc: 'A cohesive visual identity across all touchpoints, perfectly tailored to your business goals.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'tshirt', name: 'T-Shirt Design', desc: 'Custom apparel designs that people actually want to wear. Great for merch or team uniforms.', icon: 'M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'letterhead', name: 'Letterhead Design', desc: 'Professional stationery that makes your official correspondence stand out and build trust.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'email', name: 'Email Signature', desc: 'Custom HTML email signatures that look great on any device and drive traffic to your site.', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'flyer', name: 'Flyer Design', desc: 'Eye-catching promotional materials that effectively communicate your message and drive action.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'wedding', name: 'Wedding Card', desc: 'Beautiful, bespoke invitations for your special day. Designed exactly to your specifications.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#222] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-[#c61e53] mb-6">Custom Design</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Work with award-winning designers for logos, websites, stationery and more. Our creative team transforms your vision into striking visual reality.
          </p>
          <a href="#contact-form" className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-10 py-4 rounded font-bold text-lg shadow-lg inline-block">
            Order Now
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#222] mb-4">Our Custom Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From a single logo to a complete corporate rebrand, our talented team has the expertise to handle projects of any scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#c61e53] group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{service.name}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link to={`/services/${service.id}`} className="text-[#c61e53] font-bold hover:underline">Learn More &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-[#222] text-white p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's build something amazing together.</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Fill out the form with details about your project, and one of our creative directors will get back to you within 24 hours to discuss next steps.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#c61e53]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span>855-752-5503</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#c61e53]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span>custom@designmantic.com</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 p-10">
              <h2 className="text-2xl font-bold text-[#222] mb-6">Tell Us About Your Project</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input id="contact-name" name="contactName" data-testid="contact-name" type="text" required className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input id="contact-email" name="contactEmail" data-testid="contact-email" type="email" required className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input id="contact-phone" name="contactPhone" data-testid="contact-phone" type="tel" className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="service-type-select" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select id="service-type-select" name="serviceType" data-testid="service-type-select" className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all bg-white">
                      <option value="logo">Logo Design</option>
                      <option value="website">Website Design</option>
                      <option value="business-card">Business Card</option>
                      <option value="letterhead">Letterhead</option>
                      <option value="flyer">Flyer</option>
                      <option value="tshirt">T-Shirt</option>
                      <option value="wedding-card">Wedding Card</option>
                      <option value="branding">Complete Branding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="budget-select" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                  <select id="budget-select" name="budget" data-testid="budget-select" className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all bg-white">
                    <option value="under-100">Under $100</option>
                    <option value="100-500">$100–$500</option>
                    <option value="500-1000">$500–$1000</option>
                    <option value="1000-5000">$1000–$5000</option>
                    <option value="5000+">$5000+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                  <textarea id="project-description" name="projectDescription" data-testid="project-description" rows={5} className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all resize-none" placeholder="Tell us about your goals, target audience, and style preferences..."></textarea>
                </div>
                
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Attach Files (Optional)</label>
                  <input id="file-upload" name="fileUpload" data-testid="file-upload" type="file" className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#c61e53]/50 focus:border-[#c61e53] transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-[#c61e53] hover:file:bg-pink-100" />
                </div>
                
                <button type="submit" data-testid="contact-submit" disabled={isSubmitting} className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-8 py-3.5 rounded font-bold w-full text-lg shadow-md mt-4 flex justify-center items-center h-14">
                  {isSubmitting ? (
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Submit Project'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}