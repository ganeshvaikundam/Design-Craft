import { useState, useEffect } from "react";
import { modalEvents } from "@/lib/modalEvents";

export default function LogoEditorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoName, setLogoName] = useState("Logo");
  
  // Editor state
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [logoColor, setLogoColor] = useState("#c61e53");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [iconSize, setIconSize] = useState("60");
  const [layout, setLayout] = useState("icon-left");

  useEffect(() => {
    const unsub = modalEvents.on('logoEditor', (open, data: any) => {
      setIsOpen(open);
      if (open && data?.logoName) {
        setLogoName(data.logoName);
        setBusinessName(data.logoName);
      }
    });
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalEvents.close('logoEditor');
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      unsub();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const openCheckout = () => {
    modalEvents.close('logoEditor');
    modalEvents.open('checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-auto py-8" role="dialog" aria-modal="true" onClick={() => modalEvents.close('logoEditor')}>
      <div className="bg-white w-full max-w-6xl mx-4 rounded-xl shadow-2xl flex flex-col min-h-[600px]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-[#222]">{logoName} - Logo Editor</h2>
          <button onClick={() => modalEvents.close('logoEditor')} data-testid="logo-editor-close" aria-label="Close" className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        
        {/* Body: 3 panels */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Left: Controls */}
          <div className="w-full md:w-64 border-r border-gray-100 p-6 space-y-5 bg-white">
            <div>
              <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input id="business-name" name="businessName" data-testid="business-name-input" type="text" 
                value={businessName} onChange={e => setBusinessName(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
            </div>
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input id="tagline" name="tagline" data-testid="tagline-input" type="text" 
                value={tagline} onChange={e => setTagline(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53]" />
            </div>
            
            {/* Color swatches */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {['#c61e53','#1e3a8a','#16a34a','#222222','#ea580c','#7c3aed'].map(c => (
                  <button key={c} data-testid={"color-swatch-"+c.slice(1)} onClick={() => setLogoColor(c)}
                    style={{backgroundColor:c}} 
                    className={`w-8 h-8 rounded-full border-2 shadow-sm ${logoColor === c ? 'border-gray-800 scale-110' : 'border-white hover:scale-105'} transition-all`} />
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-1">Font</label>
              <select id="font-select" name="font" data-testid="font-select" 
                value={selectedFont} onChange={e => setSelectedFont(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white">
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
                <option value="Trebuchet">Trebuchet</option>
                <option value="Verdana">Verdana</option>
                <option value="Impact">Impact</option>
                <option value="Palatino">Palatino</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="icon-size-slider" className="block text-sm font-medium text-gray-700 mb-1">Icon Size</label>
              <input id="icon-size-slider" name="iconSize" data-testid="icon-size-slider" type="range" min="20" max="120" 
                value={iconSize} onChange={e => setIconSize(e.target.value)}
                className="w-full accent-[#c61e53]" />
            </div>
            
            <div>
              <label htmlFor="layout-select" className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
              <select id="layout-select" name="layout" data-testid="layout-select" 
                value={layout} onChange={e => setLayout(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white">
                <option value="icon-left">Icon Left</option>
                <option value="icon-right">Icon Right</option>
                <option value="icon-top">Icon Top</option>
                <option value="icon-bottom">Icon Bottom</option>
                <option value="text-only">Text Only</option>
                <option value="icon-only">Icon Only</option>
              </select>
            </div>
          </div>
          
          {/* Center: Live SVG Preview */}
          <div className="flex-1 flex items-center justify-center bg-gray-50/50 p-8 min-h-[300px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZTllOWU5Ii8+Cjwvc3ZnPg==')]">
            <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-sm max-w-full">
              <rect width="400" height="300" fill="#ffffff" rx="8" className="shadow-md" />
              
              {/* Dynamic layout rendering based on layout selection */}
              {layout === 'icon-left' && (
                <>
                  <circle cx="100" cy="150" r={Number(iconSize) / 2} fill={logoColor} />
                  <text x={120 + Number(iconSize) / 2} y={155} fontFamily={selectedFont} fontSize="32" fontWeight="bold" fill="#222">{businessName || 'Your Brand'}</text>
                  <text x={120 + Number(iconSize) / 2} y={180} fontFamily={selectedFont} fontSize="14" fill="#666">{tagline || 'Your Tagline'}</text>
                </>
              )}
              
              {layout === 'icon-right' && (
                <>
                  <text x={280 - Number(iconSize) / 2} y={155} fontFamily={selectedFont} fontSize="32" fontWeight="bold" fill="#222" textAnchor="end">{businessName || 'Your Brand'}</text>
                  <text x={280 - Number(iconSize) / 2} y={180} fontFamily={selectedFont} fontSize="14" fill="#666" textAnchor="end">{tagline || 'Your Tagline'}</text>
                  <circle cx="300" cy="150" r={Number(iconSize) / 2} fill={logoColor} />
                </>
              )}

              {layout === 'icon-top' && (
                <>
                  <circle cx="200" cy={150 - Number(iconSize) / 1.5} r={Number(iconSize) / 2} fill={logoColor} />
                  <text x="200" y={170 + Number(iconSize) / 3} fontFamily={selectedFont} fontSize="32" fontWeight="bold" fill="#222" textAnchor="middle">{businessName || 'Your Brand'}</text>
                  <text x="200" y={195 + Number(iconSize) / 3} fontFamily={selectedFont} fontSize="14" fill="#666" textAnchor="middle">{tagline || 'Your Tagline'}</text>
                </>
              )}
              
              {layout === 'icon-bottom' && (
                <>
                  <text x="200" y={120 - Number(iconSize) / 3} fontFamily={selectedFont} fontSize="32" fontWeight="bold" fill="#222" textAnchor="middle">{businessName || 'Your Brand'}</text>
                  <text x="200" y={145 - Number(iconSize) / 3} fontFamily={selectedFont} fontSize="14" fill="#666" textAnchor="middle">{tagline || 'Your Tagline'}</text>
                  <circle cx="200" cy={170 + Number(iconSize) / 1.5} r={Number(iconSize) / 2} fill={logoColor} />
                </>
              )}
              
              {layout === 'text-only' && (
                <>
                  <text x="200" y="155" fontFamily={selectedFont} fontSize="42" fontWeight="bold" fill={logoColor} textAnchor="middle">{businessName || 'Your Brand'}</text>
                  <text x="200" y="185" fontFamily={selectedFont} fontSize="16" fill="#666" textAnchor="middle">{tagline || 'Your Tagline'}</text>
                </>
              )}
              
              {layout === 'icon-only' && (
                <>
                  <circle cx="200" cy="150" r={Number(iconSize)} fill={logoColor} />
                </>
              )}
            </svg>
          </div>
          
          {/* Right: Download Options */}
          <div className="w-full md:w-64 border-l border-gray-100 p-6 space-y-6 bg-white">
            <h3 className="font-bold text-[#222] border-b pb-2">Download Options</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="format-select" className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select id="format-select" name="format" data-testid="format-select" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white">
                  <option value="png">PNG (Transparent)</option>
                  <option value="jpeg">JPEG (Solid Background)</option>
                  <option value="pdf">PDF (Vector)</option>
                  <option value="svg">SVG (Vector)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="resolution-select" className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                <select id="resolution-select" name="resolution" data-testid="resolution-select" className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#c61e53] bg-white">
                  <option value="72">Standard (72dpi)</option>
                  <option value="300">High Res (300dpi)</option>
                  <option value="600">Print Ready (600dpi)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button data-testid="add-to-cart-btn" onClick={openCheckout} className="w-full bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-3 rounded font-semibold shadow-sm">
                Add to Cart
              </button>
              <button data-testid="save-favorites-btn" className="w-full border border-[#c61e53] text-[#c61e53] hover:bg-pink-50 transition-colors py-3 rounded font-semibold">
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}