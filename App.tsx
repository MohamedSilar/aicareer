import React from 'react';
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

const Sidebar: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <aside className="w-64 bg-white text-slate-800 p-4 flex flex-col fixed h-full border-r border-slate-200">
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
    );
};

const Header: React.FC = () => {
    const location = useLocation();
    const { user } = useAuth();
    
    // Handle job detail route by matching the base path
    const getPathRoot = (path: string) => `/${path.split('/')[1]}`;
    const currentPathRoot = getPathRoot(location.pathname);
    
    const currentNavItem = navItems.find(item => item.path === currentPathRoot) || navItems.find(item => item.path === '/');
    
    if (!user) return null;

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">{currentNavItem?.label}</h2>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.educationLevel}</p>
                </div>
                <img src={`https://i.pravatar.cc/150?u=${user.name}`} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-sky-500" />
            </div>
        </header>
    );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 bg-slate-50">
                <Header />
                <div className="p-8">
                    {children}
                </div>
            </main>
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