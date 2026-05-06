import { useState } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    { name: 'Starter', monthly: 14.95, annual: 9.95, features: ['1 Page Website','Free Domain for 1 Year','1 GB Storage','SSL Certificate','Email Support'], highlighted: false },
    { name: 'Business', monthly: 24.95, annual: 19.95, features: ['Up to 10 Pages','Free Domain for 1 Year','5 GB Storage','SSL Certificate','Priority Support','E-commerce Ready'], highlighted: true },
    { name: 'Pro', monthly: 49.95, annual: 39.95, features: ['Unlimited Pages','Free Domain for 1 Year','20 GB Storage','SSL Certificate','24/7 Phone Support','E-commerce + Blog','Custom Domain Email'], highlighted: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#222] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Choose the right plan for your business. No hidden fees or surprises.</p>
          
          <div className="flex items-center gap-4 justify-center mb-12">
            <span className={!annual ? 'font-bold text-[#c61e53]' : 'text-gray-500 font-medium'}>Monthly</span>
            <button 
              role="switch" 
              aria-checked={annual} 
              data-testid="billing-toggle"
              onClick={() => setAnnual(!annual)}
              className={`w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c61e53] ${annual ? 'bg-[#c61e53]' : 'bg-gray-300'} relative cursor-pointer`}
            >
              <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${annual ? 'translate-x-8 left-0' : 'translate-x-1 left-0'}`} />
            </button>
            <span className={annual ? 'font-bold text-[#c61e53] flex items-center' : 'text-gray-500 font-medium flex items-center'}>
              Annual 
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2 font-bold uppercase tracking-wider">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <div 
              key={plan.name} 
              data-testid={`plan-card-${plan.name.toLowerCase()}`}
              className={`bg-white rounded-2xl p-8 relative transition-all duration-300 ${
                plan.highlighted 
                  ? 'ring-2 ring-[#c61e53] shadow-2xl scale-100 md:scale-105 z-10' 
                  : 'border border-gray-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c61e53] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{plan.name}</h3>
              <div className="text-center mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-start justify-center gap-1">
                  <span className="text-gray-500 font-bold mt-2">$</span>
                  <span className="text-5xl font-black text-[#222]">
                    {annual ? plan.annual : plan.monthly}
                  </span>
                </div>
                <div className="text-gray-500 text-sm mt-1">per month{annual && ', billed annually'}</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 shrink-0 ${plan.highlighted ? 'text-[#c61e53]' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                data-testid={`plan-btn-${plan.name.toLowerCase()}`}
                onClick={() => modalEvents.open('signup')}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
                  plan.highlighted 
                    ? 'bg-[#c61e53] hover:bg-[#a01843] text-white shadow-md' 
                    : 'border-2 border-[#c61e53] text-[#c61e53] hover:bg-pink-50'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-white border border-gray-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-[#222] mb-2">Need a Custom Solution?</h3>
            <p className="text-gray-600">Contact us for enterprise plans, high-volume pricing, or custom feature requests.</p>
          </div>
          <button className="mt-4 md:mt-0 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded font-bold transition-colors whitespace-nowrap">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}