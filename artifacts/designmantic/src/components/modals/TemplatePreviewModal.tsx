import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function TemplatePreviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    const unsub = modalEvents.on('templatePreview', (open, data) => {
      setIsOpen(open);
      if (open && data) {
        setTemplate(data);
      }
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('templatePreview');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
      <div className="bg-white border-b flex items-center justify-between px-6 py-3 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">{template.name}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded uppercase">{template.category}</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Fake browser URL bar */}
          <div className="hidden md:block bg-gray-100 border border-gray-200 rounded-md px-4 py-1.5 text-sm text-gray-500 w-80 truncate text-center">
            https://designmantic.com/preview/{template.slug || template.name.toLowerCase().replace(/\s+/g, '-')}
          </div>
          <button data-testid="template-use-this" onClick={() => { modalEvents.close('templatePreview'); modalEvents.open('signup'); }} className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-5 py-2 rounded text-sm font-bold shadow-sm">
            Use This Template
          </button>
          <button data-testid="template-preview-close" onClick={() => modalEvents.close('templatePreview')} className="text-gray-500 hover:text-gray-900 font-medium ml-2">
            &times; Close
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {/* Large preview mockup */}
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden min-h-[800px] flex flex-col border border-gray-200">
          <div className="bg-gray-100 border-b px-4 py-3 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 p-0 m-0 w-full h-full relative" style={{background: template.color || '#f3f4f6'}}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            {/* Mock website content block to make it look like a template */}
            <div className="absolute inset-x-0 top-0 h-16 bg-white/80 backdrop-blur border-b flex items-center px-8 justify-between">
              <div className="w-32 h-6 bg-black/20 rounded"></div>
              <div className="flex gap-4">
                <div className="w-16 h-4 bg-black/10 rounded"></div>
                <div className="w-16 h-4 bg-black/10 rounded"></div>
                <div className="w-16 h-4 bg-black/10 rounded"></div>
              </div>
            </div>
            <div className="absolute inset-x-8 top-32">
              <div className="w-2/3 h-16 bg-black/20 rounded mb-4"></div>
              <div className="w-1/2 h-6 bg-black/10 rounded mb-8"></div>
              <div className="w-32 h-10 bg-[#c61e53]/80 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}