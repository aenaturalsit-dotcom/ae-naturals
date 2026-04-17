// src/app/privacy-policy/page.tsx

import React from "react";
import { notFound } from "next/navigation";
import { Shield, Lock, Eye, Database, Bell, Mail, FileText } from "lucide-react";
import { apiClient } from "@/lib/api-client";

// 1. Define Types based on your Prisma Schema
interface PageSection {
  id: string;
  title: string;
  contentHtml: string;
}

interface CustomPage {
  id: string;
  title: string;
  introText: string | null;
  sections: PageSection[];
  updatedAt: string;
}

// 2. Map icons dynamically based on index
const getSectionIcon = (index: number) => {
  const icons = [Database, Eye, Shield, Lock, Bell, FileText];
  return icons[index % icons.length];
};

// 3. Fetch data using your custom API Client
async function getPrivacyPolicy(): Promise<CustomPage | null> {
  try {
    // If your apiClient is Axios, it returns { data }. If it's a fetch wrapper, it might just return the object.
    const response = await apiClient.get("/pages/privacy-policy");
    return response.data || response;
  } catch (error) {
    console.error("Failed to fetch privacy policy:", error);
    return null;
  }
}

export const metadata = {
  title: "Privacy Policy | AE Naturals",
  description: "Learn how AE Naturals collects, uses, and protects your personal data.",
};

export default async function PrivacyPolicyPage() {
  const pageData = await getPrivacyPolicy();

  // If the page doesn't exist in the DB yet or isn't published, throw a 404
  if (!pageData || !pageData.sections) {
    notFound();
  }

  const formattedDate = new Date(pageData.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          {pageData.title}
        </h1>
        {pageData.introText && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {pageData.introText}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-4">
          Last Updated: <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {pageData.sections.map((section, index) => {
                  const Icon = getSectionIcon(index);
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-[#009688]/10 hover:text-[#009688] transition-colors"
                    >
                      <Icon size={18} className="text-gray-400 group-hover:text-[#009688]" />
                      <span className="truncate">{section.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-[#009688] hover:prose-a:text-[#007A6E]">
              
              {pageData.sections.map((section, index) => {
                const Icon = getSectionIcon(index);
                return (
                  <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Icon className="text-[#009688]" size={24} />
                      {section.title}
                    </h2>
                    {/* Render backend HTML safely */}
                    <div 
                      className="text-gray-600 space-y-4"
                      dangerouslySetInnerHTML={{ __html: section.contentHtml }} 
                    />
                  </section>
                );
              })}

              {/* Static Contact Footer */}
              <section id="contact-us" className="mb-8 scroll-mt-24 border-t pt-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="text-[#009688]" size={24} />
                  Contact Us
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row gap-6 mt-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Support</h4>
                    <a href="mailto:privacy@aenaturals.in" className="text-[#009688] font-medium hover:underline">
                      privacy@aenaturals.in
                    </a>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 8553463261</p>
                  </div>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}