import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Property } from '@shared/schema';
import InvestorModeToggle from '../components/InvestorModeToggle';

const Properties = () => {
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  return (
    <>
      <InvestorModeToggle />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">All Properties</h1>
            <p className="text-gray-600 mt-2">Explore our premium tokenized real estate opportunities</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img 
                    src={property.image_url || ''} 
                    alt={property.name} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{property.name}</h3>
                        <p className="text-sm text-gray-600">{property.description || ""}</p>
                      </div>
                      <span className={`${
                        property.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-blue-100 text-blue-800'
                      } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                        {property.status === 'active' ? 'Active' : property.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Size:</span>
                        <span className="text-gray-900 font-medium">{Number(property.size_acres || 0).toLocaleString()} acres</span>
                      </div>
                      {(property.total_units !== null && property.total_units > 0) && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Units:</span>
                          <span className="text-gray-900 font-medium">{Number(property.total_units || 0).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="text-gray-900 font-medium">
                          ${(Number(property.total_value) / 1000000000).toFixed(2)}B
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Projected IRR:</span>
                        <span className="text-emerald-600 font-medium">12-15%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/property/${property.id}`}>
                        <div className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg text-center">
                          View Details
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Properties;
