import React from 'react';
import type { Question, Job, Mentor, ForumPost, DailyQuizChallenge } from './types';

// SVG Icon Components
export const HomeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
export const DashboardIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
export const LearningIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);
export const CertificateIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
);
export const ProfileIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
export const CodeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
export const BriefcaseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);
export const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
export const FireIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2c-3.31 0-6 2.69-6 6 0 2.48 1.51 4.6 3.69 5.51.5.21.75.75.64 1.28l-1.09 5.47c-.12.58.37 1.13.97 1.13.51 0 .93-.38.99-.88L12 14.5l.8 3.01c.06.5.48.88.99.88.6 0 1.09-.55.97-1.13l-1.09-5.47c-.11-.53.14-1.07.64-1.28C16.49 12.6 18 10.48 18 8c0-3.31-2.69-6-6-6z"></path></svg>
);

// --- Badge Icons ---
export const FastLearnerBadge = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 2 11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
);
export const ProblemSolverBadge = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a7 7 0 00-7 7c0 3.04 1.63 5.22 3.5 6.52A10.9 10.9 0 0012 22a10.9 10.9 0 003.5-6.48C17.37 14.22 19 12.04 19 9a7 7 0 00-7-7z"></path><line x1="12" y1="18" x2="12" y2="22"></line><line x1="8" y1="15" x2="16" y2="15"></line></svg>
);
export const TechGuruBadge = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);

// --- HomePage Icons ---
export const BrainIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 007 4.5v1c0 .83.42 1.57 1.1 2L6 10v3l2.5 2.5c.78.78 2.05.78 2.83 0L14 13v-3l-2.1-2.5c.68-.43 1.1-1.17 1.1-2v-1A2.5 2.5 0 0010.5 2h-1z"></path><path d="M16 13a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
);
export const ExploreIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line></svg>
);

// --- Chatbot Icons ---
export const ChatIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
export const SendIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);


// --- MOCK DATA ---
export const ENGINEERING_DOMAINS: string[] = [
    'Computer Science',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics & Communication',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
];

export const QUIZ_QUESTIONS: Question[] = [
  { id: 1, text: "When faced with a complex problem, what's your first step?", options: ["Break it down into smaller parts", "Look for a similar problem I've solved before", "Brainstorm all possible solutions, even wild ones", "Research existing solutions and best practices"] },
  { id: 2, text: "Which of these activities do you enjoy the most?", options: ["Building a model or assembling a gadget", "Writing a story or designing a website", "Solving logic puzzles or math problems", "Organizing an event or leading a team project"] },
  { id: 3, text: "How do you prefer to learn new things?", options: ["Through hands-on experiments and trial-and-error", "By reading books and watching video tutorials", "By understanding the underlying theories and principles", "By collaborating with others and discussing ideas"] },
  { id: 4, text: "What kind of impact do you want to make in your career?", options: ["Build tangible things that people use every day", "Create innovative digital experiences and software", "Discover new scientific principles or technologies", "Improve systems and processes to make them more efficient"] },
  { id: 5, text: "Which work environment sounds most appealing?", options: ["A busy workshop or laboratory", "A quiet office with a powerful computer", "A university or research institution", "A dynamic, collaborative startup office"] },
  { id: 6, text: "I'm interested in...", options: ["How machines and physical systems work", "How software and computers can solve problems", "The fundamental building blocks of the universe (e.g., materials, chemicals)", "Designing and constructing large-scale structures"] },
  { id: 7, text: "What's more important to you in a project?", options: ["Precision, accuracy, and efficiency", "Creativity, user experience, and design", "Logical consistency and theoretical soundness", "Practicality, safety, and long-term stability"] },
  { id: 8, text: "I am fascinated by...", options: ["Robotics and automation", "Artificial intelligence and machine learning", "Renewable energy and sustainable technology", "Smart cities and infrastructure"] },
  { id: 9, text: "When you see a new piece of technology, you are most curious about...", options: ["How it was physically built and what it's made of", "The code and algorithms that make it run", "The scientific principles that make it possible", "How it can be used to improve society"] },
  { id: 10, text: "Which subject do you find most interesting?", options: ["Physics and Mechanics", "Computer Programming and Algorithms", "Chemistry and Biology", "Mathematics and Geometry"] }
];

export const LEARNING_RESOURCES = [
    { name: 'W3Schools', url: 'https://www.w3schools.com', icon: 'https://www.w3schools.com/favicon.ico' },
    { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', icon: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_favicon.png' },
    { name: 'NPTEL', url: 'https://nptel.ac.in', icon: 'https://nptel.ac.in/assets/img/nptel-logo.png' },
    { name: 'Coursera', url: 'https://www.coursera.org', icon: 'https://www.coursera.org/favicon.ico' },
];

export const DAILY_QUIZ_CHALLENGES: DailyQuizChallenge[] = [
    { id: 1, question: "What does 'API' stand for in software development?", options: ["Application Programming Interface", "Advanced Programming Instruction", "Application Process Integration", "Automated Program Interaction"], correctAnswerIndex: 0, explanation: "An API is a set of rules and protocols that allows different software applications to communicate with each other.", resourceLink: "https://www.geeksforgeeks.org/what-is-an-api/", resourceText: "Learn more about APIs" },
    { id: 2, question: "Which of the following is NOT a primary component of a CPU?", options: ["Control Unit (CU)", "Arithmetic Logic Unit (ALU)", "Random Access Memory (RAM)", "Registers"], correctAnswerIndex: 2, explanation: "RAM is a type of volatile memory that is separate from the CPU, while the CU, ALU, and Registers are core components of the CPU.", resourceLink: "https://www.geeksforgeeks.org/components-of-cpu-central-processing-unit/", resourceText: "Explore CPU Components" },
    { id: 3, question: "In object-oriented programming, what is encapsulation?", options: ["The process of creating a new class from an existing class", "The bundling of data with the methods that operate on that data", "The ability of an object to take on many forms", "The process of hiding complexity from the user"], correctAnswerIndex: 1, explanation: "Encapsulation restricts direct access to some of an object's components, which is a fundamental principle of OOP.", resourceLink: "https://www.geeksforgeeks.org/encapsulation-in-java/", resourceText: "Understand Encapsulation" }
];

export const MOCK_JOBS: Job[] = [
    { id: 1, title: 'Frontend Developer Intern', company: 'TechSolutions Inc.', location: 'Chennai', type: 'Internship', description: 'Seeking a motivated intern to assist in developing and maintaining our web applications using React and TypeScript.', postedDate: '5 days ago', applyUrl: '#', salary: '₹20,000/month' },
    { id: 2, title: 'Graduate Engineer Trainee - Mechanical', company: 'Innovate Motors', location: 'Coimbatore', type: 'Full-time', description: 'Join our team to work on the design and development of next-generation automotive components. Knowledge of CAD software is a must.', postedDate: '2 days ago', applyUrl: '#', salary: '₹6 LPA' },
    { id: 3, title: 'Civil Site Engineer', company: 'InfraBuilders Ltd.', location: 'Madurai', type: 'Full-time', description: 'Responsible for overseeing construction projects, ensuring they meet technical specifications and safety standards.', postedDate: '1 week ago', applyUrl: '#', salary: '₹5.5 LPA' },
    { id: 4, title: 'Data Science Intern', company: 'DataMinds AI', location: 'Bangalore (Remote)', type: 'Internship', description: 'Work with our data science team on real-world projects. Experience with Python, Pandas, and Scikit-learn is preferred.', postedDate: '1 day ago', applyUrl: '#', salary: '₹25,000/month' },
    { id: 5, title: 'Embedded Systems Engineer', company: 'CircuitCraft', location: 'Chennai', type: 'Full-time', description: 'Design and develop firmware for IoT devices. Strong C/C++ and microcontroller programming skills required.', postedDate: '10 days ago', applyUrl: '#', salary: '₹7 LPA' }
];

export const MOCK_MENTORS: Mentor[] = [
    { id: 1, name: 'Priya Sharma', avatarUrl: 'https://i.pravatar.cc/150?img=1', domain: 'Computer Science', company: 'Google', experience: '8 years' },
    { id: 2, name: 'Arjun Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2', domain: 'Mechanical Engineering', company: 'Tata Motors', experience: '12 years' },
    { id: 3, name: 'Kavitha Reddy', avatarUrl: 'https://i.pravatar.cc/150?img=3', domain: 'Artificial Intelligence', company: 'Microsoft', experience: '6 years' },
    { id: 4, name: 'Rajesh Nair', avatarUrl: 'https://i.pravatar.cc/150?img=4', domain: 'Civil Engineering', company: 'L&T Construction', experience: '15 years' },
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
    { id: 1, title: "Best resources to prepare for FAANG interviews?", author: "Suresh R.", avatarUrl: "https://i.pravatar.cc/150?img=5", createdAt: "3 hours ago", tags: ["interviews", "computer-science"], replies: 12, views: 156 },
    { id: 2, title: "Is a Master's degree necessary for a career in AI?", author: "Deepa M.", avatarUrl: "https://i.pravatar.cc/150?img=6", createdAt: "1 day ago", tags: ["career-advice", "ai"], replies: 8, views: 234 },
    { id: 3, title: "Internship experience at a startup vs. a large corporation", author: "Vignesh K.", avatarUrl: "https://i.pravatar.cc/150?img=7", createdAt: "2 days ago", tags: ["internships", "discussion"], replies: 25, views: 412 },
];
