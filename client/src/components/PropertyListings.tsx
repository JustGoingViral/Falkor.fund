import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Property } from '@shared/schema';
import { PieChart } from 'lucide-react';

const PropertyListings = () => {
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-slate-900">Featured Properties</h2>
        </div>
        <div className="p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-48 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-slate-900">Featured Properties</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.image_url || ''} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.description}</p>
                </div>
                <span className={`${
                  property.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-blue-100 text-blue-800'
                } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                  {property.status}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="property-detail flex justify-between text-sm">
                  <span className="property-detail-label text-gray-600">Size:</span>
                  <span className="property-detail-value text-gray-900 font-medium">
                    {Number(property.size_acres || 0).toLocaleString()} acres
                  </span>
                </div>
                {(property.total_units !== null && property.total_units > 0) && (
                  <div className="property-detail flex justify-between text-sm">
                    <span className="property-detail-label text-gray-600">Units:</span>
                    <span className="property-detail-value text-gray-900 font-medium">
                      {Number(property.total_units || 0).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="property-detail flex justify-between text-sm">
                  <span className="property-detail-label text-gray-600">Total Value:</span>
                  <span className="property-detail-value text-gray-900 font-medium">
                    ${(Number(property.total_value) / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="property-detail flex justify-between text-sm">
                  <span className="property-detail-label text-gray-600">Projected IRR:</span>
                  <span className="text-emerald-600 font-medium">12-15%</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href={`/property/${property.id}`}>
                  <div className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded text-center cursor-pointer transition-colors">
                    View Details
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 text-center">
        <Link href="/properties">
          <div className="text-emerald-600 hover:text-emerald-800 font-medium cursor-pointer">
            View All Properties
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PropertyListings;