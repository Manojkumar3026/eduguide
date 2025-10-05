import { useState, useEffect, useRef } from 'react';
import { Send, GraduationCap } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { QuickActions } from './components/QuickActions';
import { CollegeCard } from './components/CollegeCard';
import { OnboardingForm, OnboardingData } from './components/OnboardingForm';
import { CounselingBooking, BookingData } from './components/CounselingBooking';
import { ApplicationStatus } from './components/ApplicationStatus';
import { generateAIResponse, CONTACT_INFO } from './utils/aiResponses';
import { mockColleges } from './utils/mockData';

interface Message {
  id: string;
  message: string;
  sender: 'student' | 'ai';
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showApplicationStatus, setShowApplicationStatus] = useState(false);
  const [showColleges, setShowColleges] = useState(false);
  const [userProfile, setUserProfile] = useState<OnboardingData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!showOnboarding && messages.length === 0) {
      addAIMessage(`Hello${userProfile?.name ? ' ' + userProfile.name : ''}! I'm EduGuide AI, your friendly virtual counselor.

I'm here to help you find the perfect college and course for your future. Based on your profile, I can see you're interested in ${userProfile?.preferred_course || 'exploring options'} in ${userProfile?.preferred_location || 'various locations'}.

How can I help you today?`);
    }
  }, [showOnboarding]);

  const addAIMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      message,
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      message,
      sender: 'student',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);

    const aiResponse = generateAIResponse(inputMessage, userProfile);

    setTimeout(() => {
      addAIMessage(aiResponse.message);

      if (aiResponse.action === 'show_colleges') {
        setShowColleges(true);
      } else if (aiResponse.action === 'show_booking') {
        setShowBooking(true);
      } else if (aiResponse.action === 'show_application') {
        setShowApplicationStatus(true);
      }
    }, 500);

    setInputMessage('');
  };

  const handleQuickAction = (action: string) => {
    let message = '';

    switch (action) {
      case 'find_colleges':
        message = 'I want to find colleges';
        setShowColleges(true);
        break;
      case 'recommend_courses':
        message = 'Can you recommend courses for me?';
        break;
      case 'book_counseling':
        message = 'I want to book a free counseling session';
        setShowBooking(true);
        break;
      case 'whatsapp':
        message = 'How can I contact you via WhatsApp?';
        break;
      case 'check_application':
        message = 'I want to check my application status';
        setShowApplicationStatus(true);
        break;
      case 'live_class':
        message = 'Tell me about live classes';
        break;
    }

    if (message) {
      addUserMessage(message);
      const aiResponse = generateAIResponse(message, userProfile);
      setTimeout(() => addAIMessage(aiResponse.message), 500);
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserProfile(data);
    setShowOnboarding(false);
  };

  const handleBookingConfirm = (booking: BookingData) => {
    setShowBooking(false);

    const confirmationMessage = `Your counseling session has been confirmed!

Counselor: ${booking.counselor}
Date & Time: ${new Date(booking.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} at ${booking.time}
Mode: ${booking.mode === 'zoom' ? 'Zoom Video Call' : booking.mode === 'whatsapp' ? 'WhatsApp Call' : 'Phone Call'}

We've sent confirmation details to your email and WhatsApp. You'll receive reminders 24 hours and 1 hour before your session.

Looking forward to helping you choose the perfect college!`;

    addAIMessage(confirmationMessage);
  };

  const handleCollegeViewDetails = (college: any) => {
    const message = `You're viewing details for ${college.name}:

${college.description || 'Premier educational institution'}

Location: ${college.location_city}, ${college.location_state}
Type: ${college.type}
Annual Fees: ₹${(college.fees_min / 100000).toFixed(1)}L - ₹${(college.fees_max / 100000).toFixed(1)}L

Would you like to:
• Apply to this college
• Book a counseling session to discuss this option
• Get more information about courses offered`;

    addAIMessage(message);
  };

  const handleCollegeApply = (college: any) => {
    const message = `Great choice! To apply to ${college.name}, you'll need:

Required Documents:
• 10th & 12th mark sheets
• Transfer certificate
• ID proof (Aadhar/Passport)
• Recent passport-size photos

Application Process:
1. Fill out the online application form
2. Upload required documents
3. Pay application fee (if applicable)
4. Submit and track your application

Would you like me to guide you through the application process, or would you prefer to book a counseling session to discuss this further?`;

    addAIMessage(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {showOnboarding && (
        <OnboardingForm
          onComplete={handleOnboardingComplete}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {showBooking && (
        <CounselingBooking
          onClose={() => setShowBooking(false)}
          onBook={handleBookingConfirm}
        />
      )}

      {showApplicationStatus && (
        <ApplicationStatus onClose={() => setShowApplicationStatus(false)} />
      )}

      <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col">
        <div className="bg-white rounded-t-2xl shadow-lg p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-3 rounded-full">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EduGuide AI</h1>
              <p className="text-sm text-gray-600">Your Virtual College Counselor</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-lg overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}

          {showColleges && messages.length > 0 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Top Colleges Matching Your Preferences
              </h3>
              <div className="grid gap-4">
                {mockColleges.slice(0, 5).map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onViewDetails={() => handleCollegeViewDetails(college)}
                    onApply={() => handleCollegeApply(college)}
                    onBookCounseling={() => setShowBooking(true)}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-4 space-y-4">
          <QuickActions onActionClick={handleQuickAction} />

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
            <span>•</span>
            <span>Email: {CONTACT_INFO.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
