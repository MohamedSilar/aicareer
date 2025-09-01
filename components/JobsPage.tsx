import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchJobs } from '../services/jobService';
import { getJobRecommendations } from '../services/geminiService';
import type { Job } from '../types';

const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const useIsMobile = (breakpoint = 1024) => { // lg breakpoint
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);
    return isMobile;
};

const JobRecommendations: React.FC = () => {
    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState<{ title: string; company: string; reason: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchRecs = async () => {
                setLoading(true);
                try {
                    const recs = await getJobRecommendations(user);
                    setRecommendations(recs);
                } catch (error) {
                    console.error("Failed to get job recommendations", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRecs();
        }
    }, [user]);

    if (loading) return <div className="text-center text-slate-500 p-4">Fetching AI recommendations...</div>;

    return (
        <div className="mb-6 bg-sky-50 p-4 rounded-xl border border-sky-200">
            <h3 className="text-lg font-bold text-sky-800 mb-3">Job Recommendations for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                        <p className="font-bold text-slate-800">{rec.title}</p>
                        <p className="text-sm text-sky-700 font-semibold">{rec.company}</p>
                        <p className="text-xs text-slate-600 mt-2">{rec.reason}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const JobCard: React.FC<{ job: Job; onSelect: () => void; isSelected: boolean }> = ({ job, onSelect, isSelected }) => (
    <button onClick={onSelect} className={`group w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${isSelected ? 'bg-sky-50 border-sky-500 shadow-md' : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50'}`}>
        <div className="w-12 h-12 rounded-lg bg-slate-200 flex-shrink-0 flex items-center justify-center">
            <span className="text-slate-500 font-bold text-lg">{getInitials(job.company)}</span>
        </div>
        <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-start">
                 <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors truncate">{job.title}</h3>
                 <span className="text-xs text-slate-500 flex-shrink-0 ml-2 whitespace-nowrap">{job.postedDate}</span>
            </div>
            <p className="text-sm text-slate-600 truncate">{job.company}</p>
            <p className="text-sm text-slate-500 mt-1 truncate">{job.location}</p>
            <div className="mt-3 flex gap-2">
                <span className="text-xs font-semibold bg-sky-100 text-sky-700 px-2 py-1 rounded-full">{job.type}</span>
                {job.salary && <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">{job.salary}</span>}
            </div>
        </div>
    </button>
);

const JobDetail: React.FC<{ job: Job; onBack?: () => void }> = ({ job, onBack }) => {
    const { user, updateUser } = useAuth();
    const hasApplied = user?.appliedJobs.includes(job.id);
    const hasSaved = user?.savedJobs.includes(job.id);

    const handleApply = () => {
        if (!user || hasApplied) return;
        const updatedUser = {
            ...user,
            appliedJobs: [...user.appliedJobs, job.id],
        };
        updateUser(updatedUser);
    };
    
     const handleSave = () => {
        if (!user) return;
        const isCurrentlySaved = user.savedJobs.includes(job.id);
        const updatedSavedJobs = isCurrentlySaved
            ? user.savedJobs.filter(id => id !== job.id)
            : [...user.savedJobs, job.id];
        
        const updatedUser = { ...user, savedJobs: updatedSavedJobs };
        updateUser(updatedUser);
    };

    return (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 h-full overflow-y-auto">
             {onBack && (
                <button onClick={onBack} className="lg:hidden flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    <span>Back to List</span>
                </button>
            )}
            <h2 className="text-2xl font-bold text-slate-800">{job.title}</h2>
            <p className="text-lg font-semibold text-sky-600 mt-1">{job.company}</p>
            <p className="text-sm text-slate-500 mt-1">{job.location}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm font-semibold bg-slate-200 text-slate-700 px-3 py-1 rounded-full">{job.type}</span>
                 {job.salary && <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">{job.salary}</span>}
                <span className="text-sm text-slate-500 px-3 py-1">Posted: {job.postedDate}</span>
            </div>
            <div className="mt-6 border-t border-slate-200 pt-6">
                <h4 className="font-semibold text-slate-700 mb-2">Job Description</h4>
                <p className="text-slate-600 whitespace-pre-wrap">{job.description}</p>
            </div>
            <div className="mt-6 flex gap-3">
                 <button
                    onClick={handleApply}
                    disabled={hasApplied}
                    className="flex-grow bg-sky-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    {hasApplied ? 'Applied' : 'Apply Now'}
                </button>
                 <button
                    onClick={handleSave}
                    className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg border-2 transition-colors ${hasSaved ? 'bg-yellow-100 border-yellow-400 text-yellow-600' : 'bg-white border-slate-300 text-slate-500 hover:border-slate-400'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={hasSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </button>
            </div>
        </div>
    );
};


const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ keyword: '', location: '', type: 'All', salary: '' });
    const isMobile = useIsMobile();

    const loadJobs = useCallback(async () => {
        setLoading(true);
        const fetchedJobs = await fetchJobs(filters);
        setJobs(fetchedJobs);
        if (!selectedJob || !fetchedJobs.some(j => j.id === selectedJob.id)) {
            setSelectedJob(fetchedJobs[0] || null);
        }
        setLoading(false);
    }, [filters, selectedJob]);
    
    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value }));
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            <JobRecommendations />
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label htmlFor="keyword" className="block text-sm font-medium text-slate-700">Keyword or Title</label>
                        <input type="text" name="keyword" id="keyword" value={filters.keyword} onChange={handleFilterChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-slate-900" placeholder="e.g., React Developer" />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
                        <input type="text" name="location" id="location" value={filters.location} onChange={handleFilterChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-slate-900" placeholder="e.g., Chennai" />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-slate-700">Salary / Stipend</label>
                        <input type="text" name="salary" id="salary" value={filters.salary} onChange={handleFilterChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-slate-900" placeholder="e.g., 10 LPA" />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-slate-700">Job Type</label>
                         <select name="type" id="type" value={filters.type} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-900">
                            <option>All</option>
                            <option>Full-time</option>
                            <option>Internship</option>
                            <option>Part-time</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                <div className={`lg:col-span-1 h-full ${isMobile && selectedJob ? 'hidden' : 'block'}`}>
                     <div className="bg-white p-4 rounded-2xl border border-slate-200 overflow-y-auto h-full">
                        {loading ? (
                            <div className="text-center p-8">
                                <p className="text-slate-600">Loading jobs...</p>
                            </div>
                        ) : jobs.length > 0 ? (
                            <div className="space-y-3">
                                {jobs.map(job => (
                                    <JobCard key={job.id} job={job} onSelect={() => setSelectedJob(job)} isSelected={selectedJob?.id === job.id} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <h3 className="font-semibold text-slate-700">No Jobs Found</h3>
                                <p className="text-sm text-slate-500">Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`lg:col-span-2 h-full ${isMobile && !selectedJob ? 'hidden' : 'block'}`}>
                    {selectedJob ? (
                         <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
                    ) : (
                         <div className="hidden lg:flex items-center justify-center h-full bg-white rounded-2xl border border-slate-200">
                             <div className="text-center">
                                 <h3 className="text-xl font-semibold text-slate-700">Select a job to see details</h3>
                                 <p className="text-slate-500 mt-1">Your next opportunity is one click away!</p>
                             </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;