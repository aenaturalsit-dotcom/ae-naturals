import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Phone, Mail } from 'lucide-react'; 

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12 px-10 font-sans">
      {/* Top Section: Links Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        
        <div>
          <h3 className="text-white font-bold mb-4">About Us</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Help</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/shipping-info" className="hover:text-white transition-colors">Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/collections/flowers" className="hover:text-white transition-colors">Flowers</Link></li>
            <li><Link href="/collections/cakes" className="hover:text-white transition-colors">Cakes</Link></li>
            <li><Link href="/collections/gifts" className="hover:text-white transition-colors">Gifts</Link></li>
            <li><Link href="/collections/plants" className="hover:text-white transition-colors">Plants</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Our Policies</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link href="/delivery-policy" className="hover:text-white transition-colors">Delivery Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Contact</h3>
          <div className="space-y-3 text-sm opacity-80">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={16} /> +91-12345-67890
            </a>
            <a href="mailto:care@aenaturals.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={16} /> care@aenaturals.in
            </a>
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mt-4">
               <span className="text-gray-400 text-[10px]">QR Code</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mb-8" />

      {/* Bottom Section: Copyright, Socials, Payments */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <p className="text-sm opacity-70">© {new Date().getFullYear()} AE Naturals. All rights reserved.</p>

        {/* Social Icons - Using standard <a> tags for external links */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-full text-white hover:opacity-80 transition-opacity"><Facebook size={18} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-400 rounded-full text-white hover:opacity-80 transition-opacity"><Twitter size={18} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-600 rounded-full text-white hover:opacity-80 transition-opacity"><Youtube size={18} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-600 rounded-full text-white hover:opacity-80 transition-opacity"><Instagram size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700 rounded-full text-white hover:opacity-80 transition-opacity"><Linkedin size={18} /></a>
        </div>

        {/* Payment Methods */}
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70 mr-2">We Accept:</span>
          <div className="flex gap-2">
            {['Visa', 'MC', 'Paytm', 'UPI'].map((pay) => (
              <span key={pay} className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded">
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}