import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { FastLearnerBadge, ProblemSolverBadge, TechGuruBadge } from '../constants';

// --- NEW AVATAR GENERATION LOGIC ---
// A simple hashing function for stable color generation
const stringToColor = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return '#cccccc';
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Function to generate a data URL for an SVG avatar
const generateAvatar = (name: string): string => {
    if (!name) return ''; 
    const initials = name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    
    // Simple check for color contrast. If the background is too dark, use a light text color.
    const backgroundColor = stringToColor(name);
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#333333' : '#FFFFFF';
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
            <rect width="100%" height="100%" fill="${backgroundColor}" />
            <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="60" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
                ${initials}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
// --- END NEW LOGIC ---

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (credentials: Pick<User, 'email' | 'password'>) => Promise<boolean>;
    signUp: (details: Omit<User, 'progress' | 'badges' | 'appliedJobs' | 'savedJobs' | 'tasks' | 'skills' | 'achievements' | 'streak' | 'lastLoginDate' | 'certificates' | 'avatarUrl' | 'aboutMe' | 'socialLinks' | 'interests' | 'hobbies' | 'internships'>) => Promise<boolean>;
    signOut: () => void;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];
const getYesterday = (date: Date) => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                 const parsedUser: User = JSON.parse(storedUser);
                 // Fix avatar on initial load if it's missing or an old URL
                if (!parsedUser.avatarUrl || parsedUser.avatarUrl.includes('pravatar.cc')) {
                    parsedUser.avatarUrl = generateAvatar(parsedUser.name);
                    localStorage.setItem('currentUser', JSON.stringify(parsedUser)); // Update storage immediately
                }
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('currentUser');
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = async (credentials: Pick<User, 'email' | 'password'>): Promise<boolean> => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        let foundUser: User | undefined = storedUsers.find(
            (u: User) => u.email === credentials.email && u.password === credentials.password
        );

        if (foundUser) {
            const todayStr = toYYYYMMDD(new Date());
            
            // Daily streak logic
            if (foundUser.lastLoginDate !== todayStr) {
                const yesterdayStr = toYYYYMMDD(getYesterday(new Date()));
                if (foundUser.lastLoginDate === yesterdayStr) {
                    foundUser.streak = (foundUser.streak || 0) + 1; // Increment streak
                } else {
                    foundUser.streak = 1; // Reset streak
                }
                foundUser.lastLoginDate = todayStr;
            }

            // If user has an old pravatar URL or no avatar, generate a new one
            if (!foundUser.avatarUrl || foundUser.avatarUrl.includes('pravatar.cc')) {
                foundUser.avatarUrl = generateAvatar(foundUser.name);
            }
                
            // Persist the updated user back to the main users list
            const updatedUsers = storedUsers.map((u: User) => u.email === foundUser!.email ? foundUser : u);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            const userToStore = { ...foundUser };
            delete userToStore.password;
            setUser(userToStore);
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            return true;
        }
        return false;
    };
    
    const signUp = async (details: Omit<User, 'progress' | 'badges' | 'appliedJobs' | 'savedJobs' | 'tasks' | 'skills' | 'achievements' | 'streak' | 'lastLoginDate' | 'certificates' | 'avatarUrl' | 'aboutMe' | 'socialLinks' | 'interests' | 'hobbies' | 'internships'>): Promise<boolean> => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((u: User) => u.email === details.email);

        if (userExists) {
            return false;
        }
        
        const newUser: User = {
            ...details,
            avatarUrl: generateAvatar(details.name),
            progress: 15,
            appliedJobs: [1, 3],
            savedJobs: [2, 4],
            tasks: [],
            skills: { technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'], soft: ['Teamwork', 'Problem Solving', 'Communication'] },
            achievements: [
                { id: 'ach1', title: 'Smart India Hackathon 2023 Winner', description: 'Developed a solution for agricultural supply chain management.', date: '2023-09-20' },
                { id: 'ach2', title: 'Dean\'s List for Academic Excellence', description: 'Maintained a GPA of 9.5+ for 4 consecutive semesters.', date: '2023-05-30' },
            ],
            streak: 1,
            lastLoginDate: toYYYYMMDD(new Date()),
            certificates: [],
            badges: [
                { name: 'Fast Learner', icon: FastLearnerBadge },
                { name: 'Problem Solver', icon: ProblemSolverBadge },
                { name: 'Tech Guru', icon: TechGuruBadge },
            ],
            aboutMe: `I am a passionate and results-oriented Computer Science student with a strong foundation in software development, algorithms, and data structures. I thrive in collaborative environments and am eager to apply my skills to solve real-world problems. My goal is to contribute to innovative projects that make a tangible impact.`,
            socialLinks: [
                { id: 'sl1', platform: 'linkedin', url: 'https://linkedin.com' },
                { id: 'sl2', platform: 'github', url: 'https://github.com' },
                { id: 'sl3', platform: 'twitter', url: 'https://twitter.com' },
            ],
            interests: ['Machine Learning', 'Cloud Computing', 'UI/UX Design'],
            hobbies: ['Reading Sci-Fi Novels', 'Competitive Programming', 'Photography'],
            internships: [
                {
                    id: 'intern1',
                    company: 'Innovatech Pvt. Ltd.',
                    role: 'Web Development Intern',
                    startDate: 'May 2023',
                    endDate: 'July 2023',
                    description: 'Contributed to the development of a responsive e-commerce platform using the MERN stack. Implemented RESTful APIs and integrated third-party payment gateways.'
                }
            ],
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        const userToStore = { ...newUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        
        return true;
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        navigate('/signin');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]').map((u: User) => {
            if (u.email === updatedUser.email) {
                const fullUserRecord = { ...u, ...updatedUser };
                delete fullUserRecord.password; // ensure password isn't overwritten if not present
                const originalUser = JSON.parse(localStorage.getItem('users') || '[]').find((usr: User) => usr.email === updatedUser.email);
                if (originalUser) {
                    fullUserRecord.password = originalUser.password;
                }
                return fullUserRecord;
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(storedUsers));
    };

    const value = { isAuthenticated: !!user, user, signIn, signUp, signOut, updateUser };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};