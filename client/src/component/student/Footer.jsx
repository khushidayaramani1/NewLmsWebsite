import React from 'react';
import logo from "../../assets/assets/logo_dark.svg";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-[#0f172a] text-slate-300 pt-20 pb-10 px-6'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Main Footer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16'>
          
          {/* Brand Column */}
          <div className='lg:col-span-4 flex flex-col items-center md:items-start'>
            <img src={logo} alt="LMS Logo" className='h-12 w-auto mb-6 brightness-125' />
            <p className='text-center md:text-left text-slate-400 leading-relaxed mb-6 max-w-sm'>
              Empowering learners worldwide with world-class content, expert instructors, and a community dedicated to your professional growth.
            </p>
            {/* Social Icons */}
            <div className='flex gap-4'>
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                <a key={idx} href="#" className='w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300'>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className='lg:col-span-2 flex flex-col items-center md:items-start'>
            <h4 className='font-bold text-white mb-6 text-lg'>Company</h4>
            <ul className='flex flex-col items-center md:items-start gap-4 text-sm'>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>About Us</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Careers</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Partner Program</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className='lg:col-span-2 flex flex-col items-center md:items-start'>
            <h4 className='font-bold text-white mb-6 text-lg'>Support</h4>
            <ul className='flex flex-col items-center md:items-start gap-4 text-sm'>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Help Center</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Contact Support</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>System Status</a></li>
              <li><a href="#" className='hover:text-blue-400 transition-colors'>Community</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className='lg:col-span-4 flex flex-col items-center md:items-start'>
            <h4 className='font-bold text-white mb-6 text-lg'>Stay Updated</h4>
            <p className='text-center md:text-left text-sm text-slate-400 mb-6'>
              Get the latest course updates and career tips delivered to your inbox.
            </p>
            <form className='w-full max-w-md flex flex-col sm:flex-row gap-2'>
              <input 
                type="email" 
                placeholder="Email address" 
                className='w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'
              />
              <button className='bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20'>
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500'>
          <p>© {currentYear} LMS Platform. All rights reserved.</p>
          <div className='flex gap-6'>
            <a href="#" className='hover:text-slate-300'>Terms of Service</a>
            <a href="#" className='hover:text-slate-300'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;