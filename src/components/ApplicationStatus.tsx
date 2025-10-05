import { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, FileText, Upload } from 'lucide-react';
import { mockApplications } from '../utils/mockData';

interface ApplicationStatusProps {
  onClose: () => void;
}

export function ApplicationStatus({ onClose }: ApplicationStatusProps) {
  const [searchId, setSearchId] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [applications, setApplications] = useState<any[]>([]);

  const handleSearch = () => {
    const results = mockApplications.filter(
      app => app.id.toLowerCase().includes(searchId.toLowerCase())
    );
    setApplications(results);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'text-green-700 bg-green-100';
      case 'shortlisted':
        return 'text-blue-700 bg-blue-100';
      case 'under review':
        return 'text-yellow-700 bg-yellow-100';
      case 'rejected':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5" />;
      case 'shortlisted':
      case 'under review':
        return <Clock className="w-5 h-5" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Application Status</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application ID
              </label>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., APP11234"
              />
            </div>

            <div className="text-center text-sm text-gray-500">OR</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Status
            </button>
          </div>

          {applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {app.college_name}
                      </h3>
                      <p className="text-sm text-gray-600">{app.course_name}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span className="font-semibold text-sm">{app.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Application ID:</span>
                      <span className="ml-2 font-semibold text-gray-900">{app.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Applied:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {app.next_steps && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <h4 className="font-semibold text-yellow-900 text-sm mb-1">Next Steps:</h4>
                      <p className="text-sm text-yellow-800">{app.next_steps}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Document Status:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(app.documents_submitted).map(([doc, submitted]) => (
                        <div
                          key={doc}
                          className={`flex items-center gap-2 px-3 py-2 rounded ${
                            submitted ? 'bg-green-50' : 'bg-red-50'
                          }`}
                        >
                          {submitted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Upload className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${
                            submitted ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {doc.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      Upload Documents
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      Schedule Counseling
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {applications.length === 0 && searchId && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No applications found with this ID</p>
              <p className="text-sm text-gray-500 mt-1">Please check your Application ID and try again</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
