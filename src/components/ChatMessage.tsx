import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  sender: 'student' | 'ai';
  timestamp: string;
}

export function ChatMessage({ message, sender, timestamp }: ChatMessageProps) {
  const isAI = sender === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? 'bg-blue-50' : 'bg-white'} p-4 rounded-lg`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {isAI ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-gray-900">
            {isAI ? 'EduGuide AI' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
}
