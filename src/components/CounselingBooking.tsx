import { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageCircle, X } from 'lucide-react';

interface CounselingBookingProps {
  onClose: () => void;
  onBook: (booking: BookingData) => void;
}

export interface BookingData {
  counselor: string;
  date: string;
  time: string;
  mode: 'whatsapp' | 'zoom' | 'phone';
}

export function CounselingBooking({ onClose, onBook }: CounselingBookingProps) {
  const [selectedMode, setSelectedMode] = useState<'whatsapp' | 'zoom' | 'phone'>('zoom');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '2025-10-12|10:00 AM',
    '2025-10-12|02:00 PM',
    '2025-10-12|04:00 PM',
    '2025-10-13|11:00 AM',
    '2025-10-13|03:00 PM',
    '2025-10-14|09:00 AM',
    '2025-10-14|02:00 PM',
    '2025-10-15|10:30 AM',
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    onBook({
      counselor: 'Dr. Aisha Khan',
      date: selectedDate,
      time: selectedTime,
      mode: selectedMode,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Free Counseling</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Your Preferred Mode</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMode('whatsapp')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMode === 'whatsapp'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <MessageCircle className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMode === 'whatsapp' ? 'text-green-600' : 'text-gray-600'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedMode === 'whatsapp' ? 'text-green-700' : 'text-gray-700'
                }`}>
                  WhatsApp
                </span>
              </button>

              <button
                onClick={() => setSelectedMode('zoom')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMode === 'zoom'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Video className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMode === 'zoom' ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedMode === 'zoom' ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  Zoom
                </span>
              </button>

              <button
                onClick={() => setSelectedMode('phone')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMode === 'phone'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Phone className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMode === 'phone' ? 'text-orange-600' : 'text-gray-600'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedMode === 'phone' ? 'text-orange-700' : 'text-gray-700'
                }`}>
                  Phone
                </span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Date & Time</h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => {
                const [date, time] = slot.split('|');
                const isSelected = selectedDate === date && selectedTime === time;

                return (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(time);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className={`w-4 h-4 ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {time}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What to expect:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Personalized college and course recommendations</li>
              <li>• Career path guidance from expert counselors</li>
              <li>• Application process assistance</li>
              <li>• Scholarship and financial aid information</li>
              <li>• Q&A session for all your doubts</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
