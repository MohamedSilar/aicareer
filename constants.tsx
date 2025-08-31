import React from 'react';
// FIX: Import Mentor and ForumPost types.
import type { Question, Job, Mentor, ForumPost, DailyQuizChallenge } from './types';

// SVG Icon Components
export const HomeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
export const DashboardIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
);
export const LearningIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
);
export const CertificateIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m10.5 15.5 2 2 4-4" /></svg>
);
export const ProfileIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
export const CodeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
export const BrainIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 1 7 9.5v0A2.5 2.5 0 0 1 9.5 12v0A2.5 2.5 0 0 1 7 14.5v0A2.5 2.5 0 0 1 9.5 17v0A2.5 2.5 0 0 1 7 19.5v0A2.5 2.5 0 0 1 9.5 22" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7v0A2.5 2.5 0 0 0 17 9.5v0A2.5 2.5 0 0 0 14.5 12v0A2.5 2.5 0 0 0 17 14.5v0A2.5 2.5 0 0 0 14.5 17v0A2.5 2.5 0 0 0 17 19.5v0A2.5 2.5 0 0 0 14.5 22" /><path d="M12 4.5a2.5 2.5 0 0 0-2.5-2.5" /><path d="M12 4.5a2.5 2.5 0 0 1 2.5-2.5" /><path d="M12 12a2.5 2.5 0 0 0-2.5-2.5" /><path d="M12 12a2.5 2.5 0 0 1 2.5-2.5" /><path d="M12 19.5a2.5 2.5 0 0 0-2.5-2.5" /><path d="M12 19.5a2.5 2.5 0 0 1 2.5-2.5" /></svg>
);
export const ExploreIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m12 2-2.5 5L12 9.5 14.5 7 12 2Z" /><path d="m22 12-5 2.5L14.5 12 17 9.5 22 12Z" /><path d="m12 22 2.5-5L12 14.5 9.5 17 12 22Z" /><path d="m2 12 5-2.5L9.5 12 7 14.5 2 12Z" /></svg>
);
export const BriefcaseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
export const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
export const FireIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A9.75 9.75 0 0110.304 6 9.75 9.75 0 016.318 9.812 9.75 9.75 0 012.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75c0-1.33.267-2.594.745-3.729a.75.75 0 00-1.24-.82_12.012 12.012 0 00-2.13-2.618 12.023 12.023 0 00-2.362-2.134.75.75 0 00-1.052-1.071zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" /></svg>
);

export const FastLearnerBadge = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 14 4-4" /><path d="M12.42 12.42a2.5 2.5 0 1 0-3.53-3.53" /><path d="M18.6 18.6a2.5 2.5 0 1 1-3.53-3.53" /><path d="M18.6 5.4a2.5 2.5 0 1 0-3.53 3.53" /><path d="M12.42 12.42a2.5 2.5 0 1 1 3.53 3.53" /><path d="m5.4 18.6 4-4" /><path d="m5.4 5.4 4 4" /><path d="M2 12h.01" /><path d="M12 22v-.01" /><path d="M22 12h-.01" /><path d="M12 2v.01" /></svg>
);
export const ProblemSolverBadge = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20v-4" /><path d="M12 14V4" /><path d="M12 4H8" /><path d="m15 7-3-3-3 3" /><path d="M12 4h4" /></svg>
);
export const TechGuruBadge = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 12-2-2 2-2" /><path d="m14 14 2 2-2 2" /><path d="m20 6-4-4" /><path d="m4 18 4 4" /><path d="m18 10 2-2" /><path d="m6 14-2 2" /></svg>
);

// Evaluation Quiz Questions
export const QUIZ_QUESTIONS: Question[] = [
    { id: 1, text: "Which activity do you enjoy the most?", options: ["Building things with my hands", "Solving complex puzzles", "Designing visually appealing things", "Organizing systems and data"] },
    { id: 2, text: "When facing a problem, your first instinct is to:", options: ["Experiment with a physical solution", "Analyze the data and logic", "Sketch out different ideas", "Create a step-by-step plan"] },
    { id: 3, text: "You are most fascinated by:", options: ["How large structures are built", "The inner workings of computers", "The psychology of user interaction", "The flow of electricity and energy"] },
    { id: 4, text: "What kind of project would excite you?", options: ["Designing a new bridge", "Developing a new mobile app", "Creating a brand identity for a startup", "Optimizing a power grid"] },
    { id: 5, text: "In a team, you are often the one who:", options: ["Manages the physical tasks and materials", "Deals with the technical complexities", "Focuses on the user experience and look", "Ensures the process is efficient and logical"] },
    { id: 6, text: "Which subject do you find most interesting?", options: ["Physics and Mechanics", "Mathematics and Algorithms", "Art and Psychology", "Electronics and Circuits"] },
    { id: 7, text: "Your ideal work environment would be:", options: ["A construction site or workshop", "A quiet office with a powerful computer", "A creative and collaborative studio", "A laboratory or control room"] },
    { id: 8, text: "I prefer to work with:", options: ["Tangible materials and structures", "Abstract concepts and code", "People and their experiences", "Systems and networks"] },
    { id: 9, text: "The technology that excites you most is:", options: ["3D printing and robotics", "Artificial Intelligence and Machine Learning", "Virtual and Augmented Reality", "Renewable energy technologies"] },
    { id: 10, text: "Long-term, you see yourself:", options: ["Building the infrastructure of the future", "Creating groundbreaking software", "Designing products people love to use", "Managing essential public utilities"] }
];

// Daily Learning Quiz Challenges
export const DAILY_QUIZ_CHALLENGES: DailyQuizChallenge[] = [
    {
        id: 1,
        question: "What is the output of `console.log(1 + '2' + 3)` in JavaScript?",
        options: ["A) 6", "B) \"123\"", "C) \"33\"", "D) TypeError"],
        correctAnswerIndex: 1,
        explanation: "In JavaScript, the `+` operator performs string concatenation if any operand is a string. The expression is evaluated from left to right: `1 + '2'` becomes `'12'`, then `'12' + 3` becomes `'123'`.",
        resourceLink: "https://www.w3schools.com/js/js_type_conversion.asp",
        resourceText: "Learn about JS Type Coercion"
    },
    {
        id: 2,
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["A) <link>", "B) <href>", "C) <a>", "D) <hyperlink>"],
        correctAnswerIndex: 2,
        explanation: "The `<a>` (anchor) tag is used to define hyperlinks in HTML. The `href` attribute within the tag specifies the URL of the page the link goes to.",
        resourceLink: "https://www.w3schools.com/html/html_links.asp",
        resourceText: "Learn about HTML Links"
    },
    {
        id: 3,
        question: "In CSS, what does `box-sizing: border-box;` do?",
        options: ["A) It adds a border to the box.", "B) It includes padding and border in the element's total width and height.", "C) It makes the box resizable.", "D) It removes the box's padding."],
        correctAnswerIndex: 1,
        explanation: "By default, an element's width and height are calculated as `width + padding + border`. `box-sizing: border-box;` changes this so that the specified width and height include the padding and border, making layouts more predictable.",
        resourceLink: "https://www.w3schools.com/css/css3_box-sizing.asp",
        resourceText: "Learn about CSS Box Sizing"
    },
    {
        id: 4,
        question: "What is the virtual DOM in React?",
        options: ["A) A direct copy of the real DOM.", "B) A JavaScript object representing the DOM.", "C) A feature for creating virtual reality apps.", "D) A server-side version of the DOM."],
        correctAnswerIndex: 1,
        explanation: "The virtual DOM (VDOM) is a programming concept where a virtual representation of a UI is kept in memory and synced with the 'real' DOM. This allows React to perform efficient updates by batching changes and minimizing direct DOM manipulation.",
        resourceLink: "https://react.dev/learn/rendering-to-the-dom",
        resourceText: "Learn about React's Virtual DOM"
    },
    {
        id: 5,
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["A) String", "B) Number", "C) Symbol", "D) Object"],
        correctAnswerIndex: 3,
        explanation: "JavaScript has seven primitive data types: String, Number, BigInt, Boolean, Undefined, Symbol, and Null. `Object` is a non-primitive (or complex) data type.",
        resourceLink: "https://www.w3schools.com/js/js_datatypes.asp",
        resourceText: "Learn about JS Data Types"
    },
    {
        id: 6,
        question: "What does the `git clone` command do?",
        options: ["A) Creates a new branch.", "B) Creates a copy of an existing repository.", "C) Commits changes to the repository.", "D) Merges two branches."],
        correctAnswerIndex: 1,
        explanation: "`git clone` is a Git command-line utility which is used to target an existing repository and create a clone, or copy of the target repository on your local machine.",
        resourceLink: "https://www.w3schools.com/git/git_clone.asp?remote=github",
        resourceText: "Learn about Git Clone"
    }
];


// Engineering Domains
export const ENGINEERING_DOMAINS = [
    "Computer Science", "Information Technology", "Mechanical", "Civil", "Electrical and Electronics (EEE)", "Electronics and Communication (ECE)", "UI/UX Design", "Data Science", "Artificial Intelligence"
];

// Learning Resources
export const LEARNING_RESOURCES = [
    { name: 'Java', url: 'https://www.w3schools.com/java/', icon: 'https://www.w3schools.com/java/java_logo.png' },
    { name: 'C', url: 'https://www.w3schools.com/c/index.php', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png' },
    { name: 'C++', url: 'https://www.w3schools.com/cpp/default.asp', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png' },
    { name: 'React', url: 'https://www.w3schools.com/react/', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' },
    { name: 'HTML', url: 'https://www.w3schools.com/html/', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png' },
    { name: 'CSS', url: 'https://www.w3schools.com/css/', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png' },
    { name: 'JavaScript', url: 'https://www.w3schools.com/js/', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png' },
    { name: 'Python', url: 'https://www.w3schools.com/python/', icon: 'https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg' }
];

// Mock Job Data
export const MOCK_JOBS: Job[] = [
    { id: 1, title: 'Frontend Developer (React)', company: 'Tech Solutions Inc.', location: 'Chennai, TN', type: 'Full-time', postedDate: '2024-07-20', applyUrl: '#', description: 'Seeking a skilled React developer to build and maintain user-facing features. Experience with TypeScript and state management libraries like Redux is a plus.', salary: '₹12-18 LPA' },
    { id: 2, title: 'UI/UX Design Intern', company: 'Creative Minds LLC', location: 'Coimbatore, TN', type: 'Internship', postedDate: '2024-07-19', applyUrl: '#', description: 'Join our design team to create intuitive and visually appealing interfaces for our web and mobile applications. Proficiency in Figma or Sketch is required.', salary: '₹25,000/month stipend' },
    { id: 3, title: 'Backend Engineer (Node.js)', company: 'Data Systems Co.', location: 'Madurai, TN', type: 'Full-time', postedDate: '2024-07-18', applyUrl: '#', description: 'We are looking for a backend engineer to develop server-side logic, define and maintain databases, and ensure high performance and responsiveness.', salary: '₹10-15 LPA' },
    { id: 4, title: 'Civil Engineer - Site Supervisor', company: 'BuildWell Constructions', location: 'Chennai, TN', type: 'Full-time', postedDate: '2024-07-18', applyUrl: '#', description: 'Responsible for overseeing daily operations at construction sites, ensuring projects are completed on time, within budget, and to quality standards.', salary: '₹8-12 LPA' },
    { id: 5, title: 'Mechanical Design Engineer', company: 'Innovate Mechanics', location: 'Hosur, TN', type: 'Full-time', postedDate: '2024-07-17', applyUrl: '#', description: 'Design and develop mechanical components and systems. Must be proficient in CAD software like AutoCAD and SolidWorks.', salary: '₹9-14 LPA' },
    { id: 6, title: 'Data Science Intern', company: 'AnalyticsPro', location: 'Chennai, TN', type: 'Internship', postedDate: '2024-07-16', applyUrl: '#', description: 'Work with our data science team on real-world projects involving data collection, cleaning, analysis, and model building. Python and SQL skills are essential.', salary: '₹30,000/month stipend' },
    { id: 7, title: 'Embedded Systems Engineer (ECE)', company: 'Chip-Tech', location: 'Coimbatore, TN', type: 'Full-time', postedDate: '2024-07-15', applyUrl: '#', description: 'Design, develop, and test embedded systems for various electronic devices. Strong knowledge of C/C++ and microcontrollers is required.', salary: '₹11-16 LPA' },
    { id: 8, title: 'IT Support Specialist', company: 'Connect IT', location: 'Salem, TN', type: 'Part-time', postedDate: '2024-07-14', applyUrl: '#', description: 'Provide technical assistance and support for incoming queries and issues related to computer systems, software, and hardware.', salary: '₹20,000-₹25,000/month' }
];

// FIX: Add mock mentors data
export const MOCK_MENTORS: Mentor[] = [
    { id: 1, name: 'Priya Sharma', domain: 'Computer Science', company: 'Google', experience: '10 years', avatarUrl: 'https://i.pravatar.cc/150?u=priya' },
    { id: 2, name: 'Raj Patel', domain: 'Mechanical', company: 'Tata Motors', experience: '12 years', avatarUrl: 'https://i.pravatar.cc/150?u=raj' },
    { id: 3, name: 'Anjali Singh', domain: 'UI/UX Design', company: 'Microsoft', experience: '8 years', avatarUrl: 'https://i.pravatar.cc/150?u=anjali' },
    { id: 4, name: 'Vikram Kumar', domain: 'Data Science', company: 'Amazon', experience: '7 years', avatarUrl: 'https://i.pravatar.cc/150?u=vikram' },
    { id: 5, name: 'Sunita Reddy', domain: 'Electrical and Electronics (EEE)', company: 'Siemens', experience: '15 years', avatarUrl: 'https://i.pravatar.cc/150?u=sunita' },
    { id: 6, name: 'Arun Gupta', domain: 'Civil', company: 'L&T Construction', experience: '20 years', avatarUrl: 'https://i.pravatar.cc/150?u=arun' },
    { id: 7, name: 'Meera Iyer', domain: 'Information Technology', company: 'Infosys', experience: '9 years', avatarUrl: 'https://i.pravatar.cc/150?u=meera' },
    { id: 8, name: 'Sanjay Verma', domain: 'Artificial Intelligence', company: 'NVIDIA', experience: '6 years', avatarUrl: 'https://i.pravatar.cc/150?u=sanjay' },
];

// FIX: Add mock forum posts data
export const MOCK_FORUM_POSTS: ForumPost[] = [
    { id: 1, title: 'Best resources for learning React in 2024?', author: 'Karthik S.', avatarUrl: 'https://i.pravatar.cc/150?u=karthik', createdAt: '2 days ago', tags: ['react', 'frontend', 'learning'], replies: 15, views: 256 },
    { id: 2, title: 'How to prepare for a Data Science interview?', author: 'Deepa M.', avatarUrl: 'https://i.pravatar.cc/150?u=deepa', createdAt: '5 days ago', tags: ['data science', 'interview', 'career'], replies: 8, views: 189 },
    { id: 3, title: 'Internship vs Full-time job after diploma?', author: 'Manoj Kumar', avatarUrl: 'https://i.pravatar.cc/150?u=manoj', createdAt: '1 week ago', tags: ['internship', 'jobs', 'diploma'], replies: 22, views: 412 },
    { id: 4, title: 'Is a UI/UX certification worth it?', author: 'Sneha Rao', avatarUrl: 'https://i.pravatar.cc/150?u=sneha', createdAt: '1 week ago', tags: ['ui/ux', 'certification', 'design'], replies: 12, views: 305 },
];