import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import DashboardPage from './components/DashboardPage';
import HomePage from './components/HomePage';
import LearningPage from './components/LearningPage';
import CertificatesPage from './components/CertificatesPage';
import ProfilePage from './components/ProfilePage';
import JobsPage from './components/JobsPage';
import CalendarPage from './components/CalendarPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Chatbot from './components/Chatbot';


import { HomeIcon, DashboardIcon, LearningIcon, CertificateIcon, ProfileIcon, CodeIcon, BriefcaseIcon, CalendarIcon } from './constants';

const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/jobs', label: 'Jobs', icon: BriefcaseIcon },
  { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
  { path: '/learning', label: 'Learning', icon: LearningIcon },
  { path: '/certificates', label: 'Certificates', icon: CertificateIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { signOut } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Close sidebar on navigation change on mobile
        onClose();
    }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
             {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <aside className={`w-64 bg-white text-slate-800 p-4 flex flex-col fixed h-full border-r border-slate-200 z-30 transform transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 mb-10 p-2">
                    <CodeIcon className="w-8 h-8 text-sky-500" />
                    <h1 className="text-xl font-bold text-slate-900">Career Guidance</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-sky-100 hover:text-sky-600 transition-colors ${
                                    isActive ? 'bg-sky-100 text-sky-600 font-semibold' : ''
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="mt-auto">
                    <button onClick={signOut} className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-red-100 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const location = useLocation();
    const { user } = useAuth();
    
    // Handle job detail route by matching the base path
    const getPathRoot = (path: string) => `/${path.split('/')[1]}`;
    const currentPathRoot = getPathRoot(location.pathname);
    
    const currentNavItem = navItems.find(item => item.path === currentPathRoot) || navItems.find(item => item.path === '/');
    
    if (!user) return null;

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{currentNavItem?.label}</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.educationLevel}</p>
                </div>
                <img src={user.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-sky-500 object-cover" />
            </div>
        </header>
    );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 md:ml-64 bg-slate-50">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4 sm:p-8">
                    {children}
                </div>
            </main>
            <Chatbot />
        </div>
    );
};

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/signin" element={!isAuthenticated ? <SignInPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/*" element={
                <ProtectedRoute>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/jobs" element={<JobsPage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/learning" element={<LearningPage />} />
                            <Route path="/certificates" element={<CertificatesPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </MainLayout>
                </ProtectedRoute>
            }/>
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
