import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  useEffect(() => {
    const unsub = modalEvents.on('login', (open) => {
      setIsOpen(open);
      if (open) setIsForgot(false);
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('login');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={() => modalEvents.close('login')}>
      <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => modalEvents.close('login')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        
        {!isForgot ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#222]">Welcome Back</h2>
            <div className="space-y-4">
              <input id="login-email" name="loginEmail" data-testid="login-email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
              <input id="login-password" name="loginPassword" data-testid="login-password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input id="remember-me" name="rememberMe" data-testid="remember-me-checkbox" type="checkbox" className="accent-[#c61e53]" />
                  Remember Me
                </label>
                <button onClick={() => setIsForgot(true)} className="text-sm text-[#c61e53] hover:underline">Forgot Password?</button>
              </div>
              
              <button data-testid="login-submit-btn" className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-2.5 rounded font-semibold mt-2">Login</button>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? <button onClick={() => { modalEvents.close('login'); modalEvents.open('signup'); }} className="text-[#c61e53] font-semibold hover:underline">Sign Up</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center text-[#222]">Reset Password</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Enter your email and we'll send you a link to reset your password.</p>
            <div className="space-y-4">
              <input id="forgot-email" name="forgotEmail" data-testid="forgot-email" type="email" placeholder="Email Address" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] focus:border-[#c61e53]" />
              
              <button data-testid="forgot-submit-btn" className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-2.5 rounded font-semibold mt-2">Send Reset Link</button>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                <button onClick={() => setIsForgot(false)} className="text-[#c61e53] font-semibold hover:underline">&larr; Back to Login</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}