import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = modalEvents.on('video', (open) => {
      setIsOpen(open);
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('video');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => modalEvents.close('video')}>
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <button data-testid="video-modal-close" onClick={() => modalEvents.close('video')} className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300">&times;</button>
        
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center shadow-2xl relative overflow-hidden border border-gray-800">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors group">
            <svg className="w-10 h-10 text-white ml-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="absolute text-white/50 text-sm mt-32">Video preview placeholder</p>
        </div>
      </div>
    </div>
  );
}