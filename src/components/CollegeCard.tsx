import { MapPin, DollarSign, Calendar, ExternalLink } from 'lucide-react';

interface CollegeCardProps {
  college: {
    id: string;
    name: string;
    type: string;
    location_city: string;
    location_state: string;
    fees_min: number;
    fees_max: number;
    description?: string;
    application_deadline?: string;
    courses?: string[];
  };
  onViewDetails: () => void;
  onApply: () => void;
  onBookCounseling: () => void;
}

export function CollegeCard({ college, onViewDetails, onApply, onBookCounseling }: CollegeCardProps) {
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{college.name}</h3>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
            {college.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{college.location_city}, {college.location_state}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{formatCurrency(college.fees_min)} - {formatCurrency(college.fees_max)}/year</span>
        </div>

        {college.application_deadline && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {new Date(college.application_deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {college.courses && college.courses.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Offers:</span> {college.courses.join(', ')}
          </p>
        </div>
      )}

      {college.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {college.description}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          View Details
        </button>
        <button
          onClick={onApply}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Apply Now
        </button>
        <button
          onClick={onBookCounseling}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
