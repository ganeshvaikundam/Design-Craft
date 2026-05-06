import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function SuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const unsub = modalEvents.on('success', (open) => {
      setIsOpen(open);
      if (open) {
        setOrderId(`DM-${Math.random().toString(36).slice(2,8).toUpperCase()}`);
      }
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('success');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => modalEvents.close('success')}>
      <div className="bg-white max-w-sm w-full mx-4 rounded-xl shadow-2xl p-8 text-center relative" onClick={e => e.stopPropagation()}>
        {/* Green checkmark */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-[#222]">Order Confirmed!</h2>
        <p className="text-gray-800 font-medium mb-2 bg-gray-50 py-2 rounded inline-block px-4 border">Order #{orderId}</p>
        <p className="text-gray-500 text-sm mb-8 px-4">A confirmation email with your download links has been sent to your address.</p>
        
        <button data-testid="success-continue-btn" onClick={() => modalEvents.close('success')} className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-6 py-3 rounded font-bold shadow-sm">
          Continue Designing
        </button>
      </div>
    </div>
  );
}