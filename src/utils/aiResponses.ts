export interface AIResponse {
  message: string;
  action?: 'show_colleges' | 'show_courses' | 'show_booking' | 'show_contact' | 'show_application';
  data?: any;
}

export const CONTACT_INFO = {
  whatsapp: '+91-XXXXXXXXXX',
  email: 'support@mycollegeguide.in',
  livePortal: 'https://mycollegeguide.in/live',
};

export function generateAIResponse(userMessage: string, userProfile?: any): AIResponse {
  const message = userMessage.toLowerCase();

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return {
      message: `Hello! I'm EduGuide AI, your friendly virtual counselor. I'm here to help you find the perfect college and course for your future.

Let me know what you're looking for:
• Find colleges that match your needs
• Get course recommendations
• Book a free counseling session
• Check your application status
• Join our live classes

How can I help you today?`,
    };
  }

  if (message.includes('find') && (message.includes('college') || message.includes('university'))) {
    return {
      message: `I'd love to help you find the perfect college! To show you the best matches, I need to know:

1. What course or subject are you interested in?
2. Which city or state do you prefer?
3. What's your budget range per year?

You can also use the "Find Colleges" button below to browse options!`,
      action: 'show_colleges',
    };
  }

  if (message.includes('course') && (message.includes('recommend') || message.includes('suggest') || message.includes('which'))) {
    return {
      message: `Great question! Choosing the right course is important for your career.

To give you the best recommendations, tell me:
• What subjects do you enjoy most?
• What are your career goals?
• Do you prefer technical, creative, or business fields?

Based on your interests, I can suggest courses in:
• Engineering & Technology (CSE, AI, ECE, Mechanical)
• Medical & Healthcare (MBBS, Nursing, Pharmacy)
• Arts & Humanities (Psychology, Literature, Design)
• Commerce & Business (B.Com, BBA, CA)
• Science (Physics, Chemistry, Biotechnology)

Would you like to book a free counseling session to discuss your options in detail?`,
    };
  }

  if (message.includes('counseling') || message.includes('book') || message.includes('appointment')) {
    return {
      message: `Excellent! Our expert counselors are here to guide you.

Free counseling sessions include:
• One-on-one personalized guidance
• Course and college recommendations
• Career path discussion
• Application assistance

Available modes:
• WhatsApp Call
• Zoom Video Call
• Phone Call

Would you like to schedule a session? I can show you available time slots!`,
      action: 'show_booking',
    };
  }

  if (message.includes('whatsapp') || message.includes('contact') || message.includes('call')) {
    return {
      message: `You can reach us directly on WhatsApp!

📱 WhatsApp: ${CONTACT_INFO.whatsapp}

Message format:
"Hi, I'm [Your Name]. I want free counseling for [Course Interest]. Preferred time: [Your Available Time]."

Our team will reply within 24 hours!

You can also:
📧 Email: ${CONTACT_INFO.email}
🌐 Live Portal: ${CONTACT_INFO.livePortal}`,
      action: 'show_contact',
    };
  }

  if (message.includes('application') && (message.includes('status') || message.includes('check') || message.includes('track'))) {
    return {
      message: `I can help you check your application status!

To view your application details, please provide:
• Your Application ID, OR
• The email you used during registration

Once you share this, I'll show you:
✓ Current status
✓ College and course details
✓ Next steps required
✓ Important deadlines`,
      action: 'show_application',
    };
  }

  if (message.includes('live') && (message.includes('class') || message.includes('session'))) {
    return {
      message: `Join our FREE live classes!

Our upcoming sessions cover:
• How to choose the right college
• Entrance exam preparation tips
• Scholarship opportunities
• Career guidance workshops

Classes are conducted via Zoom with expert counselors. After each class, you'll receive:
• Recording link
• Presentation slides
• Additional resources

Would you like to see upcoming live class schedules?`,
    };
  }

  if (message.includes('scholarship') || message.includes('financial') || message.includes('fees')) {
    return {
      message: `Great question! Many colleges offer scholarships based on:

• Academic merit (80%+ marks)
• Sports achievements
• Financial need
• State/category quotas

Scholarship benefits:
• 25-100% fee waiver
• Hostel fee concessions
• Stipend for books and supplies

To find colleges with scholarships matching your profile, I recommend booking a free counseling session where we can:
• Review your eligibility
• Identify suitable scholarships
• Help with applications

Would you like to book a counseling session?`,
    };
  }

  if (message.includes('placement') || message.includes('job') || message.includes('career')) {
    return {
      message: `Excellent thinking about placements!

Top colleges we recommend offer:
• 80-95% placement rates
• Average packages: ₹4-8 LPA
• Top packages: ₹15-40 LPA
• Training in soft skills & interviews

Companies recruiting:
• TCS, Infosys, Wipro (IT sector)
• Amazon, Flipkart (E-commerce)
• ICICI, HDFC (Banking)
• Healthcare & Manufacturing sectors

Want to explore colleges with strong placement records? I can show you options based on your course preference!`,
    };
  }

  if (message.includes('hostel') || message.includes('accommodation') || message.includes('stay')) {
    return {
      message: `Most colleges offer hostel facilities with:

Amenities:
• AC/Non-AC rooms
• Wi-Fi connectivity
• Mess with nutritious food
• 24/7 security
• Laundry services
• Recreation rooms

Hostel fees typically range from:
• ₹40,000 - ₹1,00,000 per year

Some colleges also have:
• Girls-only hostels with extra security
• Day scholar options
• PG tie-ups nearby

Would you like me to show colleges with good hostel facilities in your preferred location?`,
    };
  }

  if (message.includes('thank') || message.includes('thanks')) {
    return {
      message: `You're very welcome! I'm here to help you anytime.

Feel free to reach out whenever you have questions about:
• College selection
• Course guidance
• Application process
• Counseling sessions

Your future is bright, and we're here to support you every step of the way!

Best wishes on your college journey! 🎓`,
    };
  }

  return {
    message: `I'd love to help you with that!

I can assist you with:
🔍 Finding colleges that match your preferences
🎓 Recommending courses based on your interests
🗓️ Booking free counseling sessions
📞 Connecting you with our team via WhatsApp
💌 Checking application status
🧑‍🏫 Joining live classes

Could you tell me more about what you're looking for, or click one of the quick action buttons below?`,
  };
}
