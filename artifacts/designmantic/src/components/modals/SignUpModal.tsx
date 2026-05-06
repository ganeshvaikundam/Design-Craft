import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = modalEvents.on('signup', (open) => {
      setIsOpen(open);
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('signup');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 overflow-y-auto pb-20" onClick={() => modalEvents.close('signup')}>
      <div className="bg-white max-w-md w-full mx-4 rounded-xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => modalEvents.close('signup')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-[#222]">Create Account</h2>
        <div className="space-y-4">
          <input id="signup-name" name="signupName" data-testid="signup-name" type="text" placeholder="Full Name" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
          <input id="signup-email" name="signupEmail" data-testid="signup-email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
          <input id="signup-password" name="signupPassword" data-testid="signup-password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
          <input id="signup-confirm-password" name="confirmPassword" data-testid="signup-confirm-password" type="password" placeholder="Confirm Password" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
          
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-2">
            <input id="terms-checkbox" name="terms" data-testid="terms-checkbox" type="checkbox" className="accent-[#c61e53]" />
            I agree to Terms & Conditions
          </label>
          
          <div className="mt-2">
            <label htmlFor="signup-plan" className="text-sm text-gray-600 mb-1 block">Select Plan</label>
            <select id="signup-plan" name="signupPlan" data-testid="signup-plan-select" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53] bg-white">
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="business">Business</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <button data-testid="signup-submit-btn" className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-2.5 rounded font-semibold mt-4">Create Account</button>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <button onClick={() => { modalEvents.close('signup'); modalEvents.open('login'); }} className="text-[#c61e53] font-semibold hover:underline">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}