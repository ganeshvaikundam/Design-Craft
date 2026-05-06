import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#222] text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#c61e53"/>
              <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="white"/>
            </svg>
            <span className="font-bold text-xl">DesignMantic</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            The Design Shop — Professional design tools and services for businesses of all sizes.
          </p>
          <p className="text-gray-400 text-sm">
            Phone: 855-752-5503
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Logo Maker</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['Restaurant Logo', 'Real Estate Logo', 'Construction Logo', 'Technology Logo', 'Photography Logo', 'Gaming Logo', 'Education Logo', 'Sports Logo'].map(l => (
              <li key={l}><Link to={`/logo-maker?industry=${l.split(' ')[0].toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['Logo Design', 'Business Card Design', 'Letterhead Design', 'Email Signature', 'Flyer Design', 'Infographic Design', 'Wedding Card Design', 'Monogram Design', 'Custom Design'].map(l => (
              <li key={l}><Link to={`/services/${l.split(' ')[0].toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['About Us', 'How It Works', 'Pricing', 'Blog', 'Careers', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'].map(l => (
              <li key={l}><Link to={`/${l.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-center items-center gap-4">
        <span>© 2024 DesignMantic. All Rights Reserved.</span>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms-of-use" className="hover:text-white">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}