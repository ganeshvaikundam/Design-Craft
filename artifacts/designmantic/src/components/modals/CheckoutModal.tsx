import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = modalEvents.on('checkout', (open) => {
      setIsOpen(open);
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('checkout');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleComplete = () => {
    modalEvents.close('checkout');
    modalEvents.open('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-start justify-center pt-20 pb-20 overflow-y-auto" onClick={() => modalEvents.close('checkout')}>
      <div className="bg-white max-w-lg w-full mx-4 rounded-xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => modalEvents.close('checkout')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        
        <h2 className="text-2xl font-bold mb-6 text-[#222]">Complete Your Order</h2>
        
        {/* Order summary */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2">Order Summary</h3>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700">Logo Package</span>
            <span className="font-medium">$37.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>High-res PNG + SVG formats</span>
            <span></span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span className="text-[#c61e53]">$37.00</span>
          </div>
        </div>
        
        {/* Coupon */}
        <div className="flex gap-2 mb-6">
          <input id="coupon-input" name="coupon" data-testid="coupon-input" type="text" placeholder="Coupon code" className="flex-1 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
          <button data-testid="coupon-apply-btn" className="border border-[#c61e53] text-[#c61e53] hover:bg-pink-50 transition-colors px-4 py-2 rounded font-medium">Apply</button>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Payment Details</h3>
          
          {/* Payment method */}
          <select id="payment-method" name="paymentMethod" data-testid="payment-method-select" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white">
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
          
          {/* Card fields */}
          <div className="space-y-3">
            <input id="card-number" name="cardNumber" data-testid="card-number-input" type="text" placeholder="Card Number" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
            <div className="flex gap-3">
              <input id="card-expiry" name="cardExpiry" data-testid="card-expiry-input" type="text" placeholder="MM/YY" className="flex-1 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
              <input id="card-cvv" name="cardCvv" data-testid="card-cvv-input" type="text" placeholder="CVV" className="w-24 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
            </div>
            <input id="card-name" name="cardName" data-testid="card-name-input" type="text" placeholder="Name on Card" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
          </div>
        </div>
        
        <div className="mt-8 space-y-3">
          <button data-testid="complete-purchase-btn" onClick={handleComplete} className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-3 rounded font-bold shadow-md text-lg">
            Complete Purchase
          </button>
          <button data-testid="checkout-back-btn" onClick={() => modalEvents.close('checkout')} className="w-full text-gray-500 hover:text-gray-800 py-2 font-medium">
            &larr; Back
          </button>
        </div>
      </div>
    </div>
  );
}