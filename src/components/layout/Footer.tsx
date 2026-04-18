// src/components/layout/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';
import { apiClient } from "@/lib/api-client";

interface FooterLink { id: string; label: string; url: string; }
interface FooterColumn { id: string; title: string; links: FooterLink[]; }

async function getFooterData(): Promise<FooterColumn[]> {
  try {
    const response = await apiClient.get("/footer");
    const data = response.data || response;
    return data.columns || [];
  } catch (error) {
    console.error("Failed to fetch footer:", error);
    return [];
  }
}

export async function Footer() {
  const columns = await getFooterData();

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-14 pb-8 px-6 md:px-10">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

        {/* ✅ BRAND BLOCK (LEFT SIDE) */}
        <div className="md:col-span-4 space-y-5">

          {/* Brand */}
          <div>
            <h2 className="text-white text-xl font-bold">AE Naturals</h2>
            <p className="text-sm opacity-70 mt-2 leading-relaxed">
              Premium natural wellness products crafted for a healthier lifestyle.
            </p>
          </div>

          {/* Contact (Moved here) */}
          <div className="space-y-2 text-sm">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition">
              <Phone size={16}/> +91-12345-67890
            </a>
            <a href="mailto:care@aenaturals.in" className="flex items-center gap-2 hover:text-white transition">
              <Mail size={16}/> care@aenaturals.in
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-3 pt-2">
            <a className="p-2 bg-blue-600 rounded-full hover:opacity-80"><Facebook size={16}/></a>
            <a className="p-2 bg-sky-400 rounded-full hover:opacity-80"><Twitter size={16}/></a>
            <a className="p-2 bg-pink-600 rounded-full hover:opacity-80"><Instagram size={16}/></a>
          </div>

        </div>

        {/* ✅ DYNAMIC COLUMNS */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {columns.length > 0 ? (
            columns.map((col) => (
              <div key={col.id}>
                <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
                  {col.title}
                </h3>
                <ul className="space-y-2 text-sm opacity-80">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.url} className="hover:text-white transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Loading...</div>
          )}
        </div>

      </div>

      <hr className="border-gray-700 mb-6" />

      {/* ✅ BOTTOM BAR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm opacity-60 text-center md:text-left">
          © {new Date().getFullYear()} AE Naturals. All rights reserved.
        </p>

        {/* Payments */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">We Accept:</span>
          {['Visa', 'MC', 'Paytm', 'UPI'].map((pay) => (
            <span key={pay} className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded">
              {pay}
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
}