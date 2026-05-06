import { Link } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-gray-100 text-sm py-1.5 px-4 flex justify-between items-center border-b">
        <div className="flex items-center text-gray-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span data-testid="header-phone">SALES / SUPPORT: 855-752-5503</span>
        </div>
        <div className="flex items-center space-x-4">
          <button data-testid="header-favorites" className="text-gray-600 hover:text-[#c61e53] flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favorites
          </button>
          <button data-testid="header-login" onClick={() => modalEvents.open('login')} className="text-gray-600 hover:text-gray-900">
            Login
          </button>
          <button data-testid="header-signup" onClick={() => modalEvents.open('signup')} className="bg-[#c61e53] text-white px-3 py-1 rounded hover:bg-[#a01843] transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white shadow-sm py-3 px-4 flex justify-between items-center relative">
        <Link to="/" className="flex items-center gap-2" data-testid="header-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#c61e53"/>
            <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="white"/>
          </svg>
          <span className="text-[#222] font-bold text-xl">DesignMantic</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/logo-maker" data-testid="nav-logo-maker" className="text-gray-700 hover:text-[#c61e53] font-medium">
            Logo Maker
          </Link>

          <div className="relative group">
            <button className="text-gray-700 hover:text-[#c61e53] font-medium flex items-center gap-1 py-2" data-testid="nav-website-design">
              Website Design
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <Link to="/website/create" data-testid="nav-create-site" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Create Site</Link>
              <Link to="/website/templates" data-testid="nav-templates" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Templates</Link>
              <Link to="/website/pricing" data-testid="nav-pricing" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Pricing</Link>
              <Link to="/website/features" data-testid="nav-features" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Features</Link>
              <Link to="/website/domain" data-testid="nav-domain" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Domain</Link>
              <Link to="/website/mailbox" data-testid="nav-mailbox" className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Mailbox</Link>
            </div>
          </div>

          <div className="relative group">
            <button className="text-gray-700 hover:text-[#c61e53] font-medium flex items-center gap-1 py-2" data-testid="nav-other-services">
              Other Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 py-2">
              {[
                { label: 'Complete Branding', path: '/services/branding' },
                { label: 'Business Card Design', path: '/services/business-card' },
                { label: 'Print Services', path: '/services/print' },
                { label: 'Letterhead Design', path: '/services/letterhead' },
                { label: 'Envelope Design', path: '/services/envelope' },
                { label: 'Email Signature Design', path: '/services/email-signature' },
                { label: 'Flyer Design', path: '/services/flyer' },
                { label: 'Infographic Design', path: '/services/infographic' }
              ].map(s => (
                <Link key={s.path} to={s.path} className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                  {s.label}
                </Link>
              ))}

              <div className="relative group/sub">
                <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                  Social Header Design
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="absolute left-full top-0 bg-white shadow-lg border border-gray-100 rounded min-w-[180px] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-150 py-2">
                  {['Facebook Header', 'Twitter Header', 'LinkedIn Header', 'Instagram Post'].map(s => (
                    <Link key={s} to={`/services/social/${s.toLowerCase().replace(' ', '-')}`} data-testid={`nav-social-${s.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              {[
                { label: 'Monogram Design', path: '/services/monogram' },
                { label: 'Wedding Card Design', path: '/services/wedding' },
                { label: 'Custom Design', path: '/services/custom' }
              ].map(s => (
                <Link key={s.path} to={s.path} className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}