import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { FastLearnerBadge, ProblemSolverBadge, TechGuruBadge } from '../constants';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (credentials: Pick<User, 'email' | 'password'>) => Promise<boolean>;
    signUp: (details: Omit<User, 'progress' | 'badges' | 'appliedJobs' | 'savedJobs' | 'tasks' | 'skills' | 'achievements' | 'streak' | 'lastLoginDate' | 'certificates'>) => Promise<boolean>;
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
                setUser(JSON.parse(storedUser));
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
                
                // Persist the updated user back to the main users list
                const updatedUsers = storedUsers.map((u: User) => u.email === foundUser!.email ? foundUser : u);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            }

            const userToStore = { ...foundUser };
            delete userToStore.password;
            setUser(userToStore);
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            return true;
        }
        return false;
    };
    
    const signUp = async (details: Omit<User, 'progress' | 'badges' | 'appliedJobs' | 'savedJobs' | 'tasks' | 'skills' | 'achievements' | 'streak' | 'lastLoginDate' | 'certificates'>): Promise<boolean> => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((u: User) => u.email === details.email);

        if (userExists) {
            return false;
        }
        
        const newUser: User = {
            ...details,
            progress: 15, // Start with some progress
            appliedJobs: [],
            savedJobs: [],
            tasks: [],
            skills: { technical: ['HTML', 'CSS'], soft: ['Communication'] },
            achievements: [],
            streak: 1,
            lastLoginDate: toYYYYMMDD(new Date()),
            certificates: [],
            badges: [
                { name: 'Fast Learner', icon: FastLearnerBadge },
                { name: 'Problem Solver', icon: ProblemSolverBadge },
                { name: 'Tech Guru', icon: TechGuruBadge },
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