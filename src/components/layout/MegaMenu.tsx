// src/components/layout/MegaMenu.tsx
import Link from 'next/link';
import Image from 'next/image';
import { menuService } from '@/services/menu.service';

export default async function MegaMenu() {
  const menuData = await menuService.getMegaMenu('main-menu');

  if (!menuData || !menuData.groups) {
    return <div className="h-16 flex items-center px-4">Menu unavailable</div>;
  }

  return (
    <nav className="relative bg-white border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 h-16 items-center">
        
        {menuData.groups.map((group) => (
          <div key={group.id} className="group h-full flex items-center">
            {/* Top Level Nav Item */}
            <button className="text-sm font-semibold text-gray-800 tracking-wide uppercase group-hover:text-[#166534] transition-colors duration-200">
              {group.title}
            </button>

            {/* Mega Dropdown Panel */}
            <div className="absolute top-16 left-0 w-full bg-white shadow-xl border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                  {/* Links Column */}
                  <div className="col-span-1">
                    <h3 className="font-bold text-gray-900 mb-5 border-b pb-2 uppercase text-xs tracking-wider">
                      Shop {group.title}
                    </h3>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <Link 
                            href={`/collections/${item.slug}`}
                            className="text-sm text-gray-600 hover:text-[#166534] hover:underline hover:underline-offset-4 transition-all"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional: Render additional columns if items are chunked, or render the promotional image */}
                  {group.image && (
                    <div className="col-span-3 flex justify-end">
                      <div className="relative h-48 w-full max-w-md rounded-lg overflow-hidden shadow-sm group/banner">
                        {group.link ? (
                          <Link href={group.link}>
                            <Image 
                              src={group.image} 
                              alt={`${group.title} promotional banner`}
                              fill
                              className="object-cover group-hover/banner:scale-105 transition-transform duration-500"
                            />
                          </Link>
                        ) : (
                          <Image 
                            src={group.image} 
                            alt={`${group.title} promotional banner`}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </nav>
  );
}