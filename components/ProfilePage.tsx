import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getJobsByIds } from '../services/jobService';
import type { Job } from '../types';
import EditProfileModal from './EditProfileModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeTemplate: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']>, elementId: string }> = ({ user, elementId }) => {
    return (
        <div id={elementId} className="bg-white p-8 text-black" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Arial, sans-serif' }}>
            <h1 className="text-3xl font-bold border-b-2 border-black pb-2">{user.name}</h1>
            <p className="text-sm mt-2">{user.email}</p>
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Education</h2>
                <div className="mt-2">
                    <p className="font-bold">{user.institutionName}</p>
                    <p className="italic">{user.educationLevel} - {user.institutionLocation}</p>
                </div>
            </div>
             <div className="mt-6">
                <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Skills</h2>
                <div className="mt-2">
                    <p><span className="font-bold">Technical:</span> {user.skills.technical.join(', ')}</p>
                    <p><span className="font-bold">Soft Skills:</span> {user.skills.soft.join(', ')}</p>
                </div>
            </div>
             <div className="mt-6">
                <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Achievements</h2>
                {user.achievements.map(ach => (
                    <div key={ach.id} className="mt-2">
                        <p className="font-bold">{ach.title} <span className="font-normal italic text-sm">({ach.date})</span></p>
                        <p className="text-sm">{ach.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'applied' | 'saved'>('applied');

    useEffect(() => {
        if (user) {
            const fetchJobsData = async () => {
                setLoadingJobs(true);
                if (user.appliedJobs.length > 0) {
                    const jobs = await getJobsByIds(user.appliedJobs);
                    setAppliedJobs(jobs);
                }
                if (user.savedJobs.length > 0) {
                    const jobs = await getJobsByIds(user.savedJobs);
                    setSavedJobs(jobs);
                }
                setLoadingJobs(false);
            };
            fetchJobsData();
        } else {
            setLoadingJobs(false);
        }
    }, [user]);
    
    const handleDownloadResume = () => {
        const resumeElement = document.getElementById('resume-template');
        if (resumeElement) {
             html2canvas(resumeElement, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${user?.name.replace(' ', '_')}_Resume.pdf`);
            });
        }
    };

    if (!user) {
        return <div className="text-center p-8">Loading...</div>;
    }
    
    const SkillTag: React.FC<{ skill: string }> = ({ skill }) => (
        <span className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
    );

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-32 bg-sky-500"></div>
                    <div className="p-8 relative">
                        <img 
                            src={`https://i.pravatar.cc/150?u=${user.name}`}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white absolute -top-16"
                        />
                         <div className="flex justify-between items-start">
                            <div className="ml-36 pt-2">
                                 <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                                 <p className="text-slate-600 mt-1">{user.email}</p>
                            </div>
                             <div>
                                <button onClick={() => setIsEditModalOpen(true)} className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors text-sm">Edit Profile</button>
                                <button onClick={handleDownloadResume} className="ml-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors text-sm">Download Resume</button>
                             </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-700">Educational Background</h3>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-y-4">
                                <div>
                                    <p className="text-sm text-slate-500">Education Level</p>
                                    <p className="text-base font-medium text-slate-800">{user.educationLevel}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">{user.educationLevel === 'Diploma' ? 'College' : 'School'}</p>
                                    <p className="text-base font-medium text-slate-800">{user.institutionName || 'Not Provided'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Location</p>
                                    <p className="text-base font-medium text-slate-800">{user.institutionLocation || 'Not Provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <h3 className="text-xl font-semibold text-slate-800 mb-4">Skills</h3>
                     <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-slate-600 mb-2">Technical Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.technical.length > 0 ? user.skills.technical.map(s => <SkillTag key={s} skill={s} />) : <p className="text-slate-500 text-sm">No technical skills listed.</p>}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-600 mb-2">Soft Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.soft.length > 0 ? user.skills.soft.map(s => <SkillTag key={s} skill={s} />) : <p className="text-slate-500 text-sm">No soft skills listed.</p>}
                            </div>
                        </div>
                     </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <h3 className="text-xl font-semibold text-slate-800 mb-4">Achievements</h3>
                     <div className="space-y-4">
                        {user.achievements.length > 0 ? user.achievements.map(ach => (
                            <div key={ach.id} className="border-l-4 border-sky-300 pl-4">
                                <p className="font-bold text-slate-800">{ach.title} <span className="font-normal text-sm text-slate-500">- {ach.date}</span></p>
                                <p className="text-slate-600 text-sm">{ach.description}</p>
                            </div>
                        )) : <p className="text-slate-500 text-sm">No achievements listed yet.</p>}
                     </div>
                </div>
                
                 <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="border-b border-slate-200 mb-4">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setActiveTab('applied')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'applied' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                                Application History
                            </button>
                             <button onClick={() => setActiveTab('saved')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'saved' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                                Saved Jobs
                            </button>
                        </nav>
                    </div>
                    
                    {loadingJobs ? (
                        <p className="text-slate-600">Loading job history...</p>
                    ) : (
                        <div className="space-y-4">
                            {activeTab === 'applied' && (appliedJobs.length > 0 ? appliedJobs.map(job => (
                                <div key={job.id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-800">{job.title}</p>
                                        <p className="text-sm text-slate-600">{job.company} - {job.location}</p>
                                    </div>
                                    <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Applied</span>
                                </div>
                            )) : <p className="text-slate-600">You haven't applied for any jobs yet.</p>)}

                             {activeTab === 'saved' && (savedJobs.length > 0 ? savedJobs.map(job => (
                                <div key={job.id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-800">{job.title}</p>
                                        <p className="text-sm text-slate-600">{job.company} - {job.location}</p>
                                    </div>
                                     <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Saved</span>
                                </div>
                            )) : <p className="text-slate-600">You haven't saved any jobs yet.</p>)}
                        </div>
                    )}
                </div>
            </div>
            
             {isEditModalOpen && <EditProfileModal user={user} onClose={() => setIsEditModalOpen(false)} />}

            <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
                <ResumeTemplate user={user} elementId="resume-template" />
            </div>
        </>
    );
};

export default ProfilePage;