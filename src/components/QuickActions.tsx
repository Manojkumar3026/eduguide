import { Search, GraduationCap, Calendar, MessageCircle, FileText, Users } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    { icon: Search, label: 'Find Colleges', action: 'find_colleges' },
    { icon: GraduationCap, label: 'Recommend Courses', action: 'recommend_courses' },
    { icon: Calendar, label: 'Book Counseling', action: 'book_counseling' },
    { icon: MessageCircle, label: 'WhatsApp Contact', action: 'whatsapp' },
    { icon: FileText, label: 'Check Application', action: 'check_application' },
    { icon: Users, label: 'Join Live Class', action: 'live_class' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {actions.map((action) => (
        <button
          key={action.action}
          onClick={() => onActionClick(action.action)}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
        >
          <action.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 text-center">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
