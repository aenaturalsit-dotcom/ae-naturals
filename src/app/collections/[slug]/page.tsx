// src/app/collections/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { apiClient } from "@/lib/api-client";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

// Fetch function specifically for the collection
async function getCollectionData(slug: string) {
  let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
  
  // Ensure absolute URL for SSR if needed
  if (backendUrl.startsWith("/")) {
    backendUrl = `http://localhost:4000${backendUrl}`;
  }

  try {
    const response = await apiClient.get(`${backendUrl}/collections/${slug}`);
    
    // Axios automatically parses JSON into the `data` property
    return response.data;
  } catch (error: any) {
    // If the API returns a 404 (Collection not found), return null gracefully
    if (error.response?.status === 404) {
      return null;
    }
    
    console.error("[FETCH COLLECTION ERROR]:", error);
    return null;
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const data = await getCollectionData(params.slug);

  if (!data || !data.collection) {
    notFound(); // Triggers app/not-found.tsx automatically
  }

  const { collection, products } = data;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      {/* Collection Header */}
      <div className="bg-white w-full border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">{collection.name}</h1>
          {collection.description && (
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">
            Showing {products.length} products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-700">Check back soon!</h2>
            <p className="text-gray-500 mt-2">New products are being added to this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}