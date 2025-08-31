import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getAiTip } from '../services/geminiService';
import { BriefcaseIcon, CertificateIcon, LearningIcon, FireIcon } from '../constants';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-200 rounded-full h-4">
        <div
            className="bg-sky-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

const chartProgressData = [
  { name: 'Week 1', progress: 10 },
  { name: 'Week 2', progress: 25 },
  { name: 'Week 3', progress: 40 },
  { name: 'Week 4', progress: 75 },
];

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
        <div className="bg-white p-3 rounded-full border border-slate-200">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
        </div>
    </div>
);

const AiTipCard: React.FC = () => {
    const [tip, setTip] = useState<{ quote: string; tip: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTip = async () => {
            try {
                setLoading(true);
                const aiTip = await getAiTip();
                setTip(aiTip);
            } catch (error) {
                console.error(error);
                setTip({ quote: "The future belongs to those who believe in the beauty of their dreams.", tip: "Try to learn one new concept every day." });
            } finally {
                setLoading(false);
            }
        };
        fetchTip();
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">AI Tip of the Day</h3>
            {loading ? <p className="text-slate-500">Generating your daily tip...</p> : tip && (
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-slate-700">Quote:</p>
                        <p className="text-slate-600 italic">"{tip.quote}"</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">Suggestion:</p>
                        <p className="text-slate-600">{tip.tip}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className="text-center p-8">Loading...</div>;
    }
    
    const chartData = chartProgressData.map(item => ({ ...item }));
    if (chartData.length > 0) {
        chartData[chartData.length - 1].progress = user.progress;
    }
    const coursesCompleted = Math.floor((user.progress / 100) * 5); // Mocked data

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-slate-600 mt-2">Let's continue your journey to find the perfect engineering career path.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard icon={<BriefcaseIcon className="w-6 h-6 text-sky-500" />} label="Jobs Applied" value={user.appliedJobs.length} />
                 <StatCard icon={<LearningIcon className="w-6 h-6 text-teal-500" />} label="Courses Completed" value={coursesCompleted} />
                 <StatCard icon={<CertificateIcon className="w-6 h-6 text-amber-500" />} label="Certificates Earned" value={user.certificates.length} />
                 <StatCard icon={<FireIcon className="w-6 h-6 text-orange-500" />} label="Daily Streak" value={`${user.streak || 0} ${user.streak === 1 ? 'day' : 'days'}`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Progress */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Learning Progress</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-sky-500">{user.progress}%</span>
                        <div className="flex-1">
                            <p className="text-slate-700 font-medium">Overall Completion</p>
                            <ProgressBar progress={user.progress} />
                        </div>
                    </div>
                    <div className="h-64 mt-8">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                                <XAxis dataKey="name" stroke="#475569"/>
                                <YAxis stroke="#475569"/>
                                <Tooltip wrapperClassName="!bg-white !border-slate-200 !rounded-lg !shadow-lg" />
                                <Bar dataKey="progress" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Tip + Badges */}
                <div className="space-y-8">
                    <AiTipCard />
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Your Badges</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {user.badges.map((badge, index) => (
                                <div key={index} className="flex flex-col items-center text-center p-2" title={badge.name}>
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-yellow-500 border-2 border-slate-200">
                                        <badge.icon className="w-10 h-10"/>
                                    </div>
                                    <p className="text-xs text-slate-700 font-medium mt-2 w-20 truncate">{badge.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready for a challenge?</h3>
                    <p className="text-slate-600 mb-4">Take our AI-powered assessment to find your ideal career path.</p>
                    <NavLink to="/home" className="mt-auto bg-sky-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-sky-600 transition-colors">
                        Evaluate Yourself
                    </NavLink>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Explore New Domains</h3>
                    <p className="text-slate-600 mb-4">Dive into different engineering fields and discover your passion.</p>
                    <NavLink to="/home" className="mt-auto bg-slate-800 text-white font-semibold py-2 px-5 rounded-lg hover:bg-slate-900 transition-colors">
                        Explore Domains
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;