import React, { useState } from 'react';
import { MOCK_MENTORS, ENGINEERING_DOMAINS } from '../constants';
import type { Mentor } from '../types';

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center">
        <img src={mentor.avatarUrl} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 border-4 border-slate-200 dark:border-slate-600" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{mentor.name}</h3>
        <p className="text-sky-600 dark:text-sky-400 font-semibold">{mentor.domain}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{mentor.company}</p>
        <p className="text-sm text-slate-500 dark:text-slate-500">{mentor.experience} of experience</p>
        <button className="mt-auto w-full bg-sky-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-sky-600 transition-colors mt-4">
            Connect
        </button>
    </div>
);

const MentorshipPage: React.FC = () => {
    const [selectedDomain, setSelectedDomain] = useState('All');

    const filteredMentors = selectedDomain === 'All'
        ? MOCK_MENTORS
        : MOCK_MENTORS.filter(mentor => mentor.domain === selectedDomain);

    return (
        <div className="space-y-8">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Connect with Mentors</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Find experienced professionals to guide you in your career journey.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                 <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 px-2">Filter by Domain</h2>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => setSelectedDomain('All')}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedDomain === 'All' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                    >
                        All
                    </button>
                    {ENGINEERING_DOMAINS.map(domain => (
                         <button 
                            key={domain}
                            onClick={() => setSelectedDomain(domain)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedDomain === domain ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                        >
                            {domain}
                        </button>
                    ))}
                </div>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </div>
    );
};

export default MentorshipPage;