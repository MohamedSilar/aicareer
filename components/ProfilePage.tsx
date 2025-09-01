import React, 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getJobsByIds } from '../services/jobService';
import type { Job, User, Internship } from '../types';
import { EditProfileModal } from './EditProfileModal';
import jsPDF from 'jspdf';

// --- Social Icons ---
const SocialIcon: React.FC<{ platform: User['socialLinks'][0]['platform'] }> = ({ platform }) => {
    const iconMap = {
        linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
        github: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
        twitter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.211 3.803 4.65-1.02.277-2.135.228-2.135.228-.305 0-.599-.029-.884-.083.608 1.883 2.362 3.256 4.45 3.294-1.622 1.272-3.669 2.029-5.89 2.029-1.121 0-2.222-.066-3.304-.193 2.093 1.344 4.583 2.126 7.266 2.126 8.711 0 13.481-7.229 13.481-13.481 0-.205-.005-.409-.013-.612.926-.668 1.728-1.5 2.368-2.454z"/></svg>,
        portfolio: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20,6H4A2,2,0,0,0,2,8V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8A2,2,0,0,0,20,6ZM4,18V8H20l.002,10Z"/><path d="M10.293,12.293,6,16.586V14H8v4h4l-2.293-2.293,4-4,1.414,1.414L16,14.586V12h2v4h-2.586l-1.707-1.707-4-4Z"/></svg>,
        other: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 7h-2v6h2V7zm-1 8c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/></svg>,
    };
    return iconMap[platform] || iconMap['other'];
};

const ProfileCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="font-bold text-slate-800">{internship.role}</h4>
        <p className="font-semibold text-sky-600">{internship.company}</p>
        <p className="text-sm text-slate-500 mt-1">{internship.startDate} - {internship.endDate}</p>
        <p className="text-sm text-slate-600 mt-2">{internship.description}</p>
    </div>
);

const JobListItem: React.FC<{ job: Job }> = ({ job }) => (
    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-sky-50 transition-colors">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-slate-800">{job.title}</h4>
                <p className="text-sm font-semibold text-sky-600">{job.company}</p>
            </div>
            <span className="text-xs text-slate-500">{job.type}</span>
        </div>
    </a>
);


const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserJobs = async () => {
            if (user) {
                setLoading(true);
                const [saved, applied] = await Promise.all([
                    getJobsByIds(user.savedJobs),
                    getJobsByIds(user.appliedJobs)
                ]);
                setSavedJobs(saved);
                setAppliedJobs(applied);
                setLoading(false);
            }
        };
        fetchUserJobs();
    }, [user]);

    const handleDownloadPdf = () => {
        if (!user) return;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        let cursorY = margin;
        const lineHeight = 5;
        const sectionSpacing = 10;
        const itemSpacing = 4;

        const checkPageBreak = (neededHeight: number) => {
            if (cursorY + neededHeight > pageHeight - margin) {
                pdf.addPage();
                cursorY = margin;
            }
        };

        // --- Header ---
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(24);
        pdf.text(user.name, margin, cursorY);
        cursorY += 10;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const socialLinksText = user.socialLinks
            .filter(l => ['linkedin', 'github', 'portfolio'].includes(l.platform))
            .map(l => l.url)
            .join(' | ');
        pdf.text(user.email, margin, cursorY);
        pdf.text(socialLinksText, pageWidth - margin, cursorY, { align: 'right' });
        cursorY += 8;

        pdf.setDrawColor(200);
        pdf.line(margin, cursorY, margin + contentWidth, cursorY);
        cursorY += sectionSpacing;

        // --- Section Helper ---
        const addSection = (title: string, contentFn: () => void) => {
            checkPageBreak(20);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.text(title.toUpperCase(), margin, cursorY);
            cursorY += 6;
            pdf.setDrawColor(150);
            pdf.line(margin, cursorY, margin + 40, cursorY);
            cursorY += 8;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            contentFn();
            cursorY += sectionSpacing;
        };
        
        // --- About Me Section ---
        if (user.aboutMe) {
            addSection('Summary', () => {
                const lines = pdf.splitTextToSize(user.aboutMe.replace(/<[^>]*>?/gm, ''), contentWidth);
                checkPageBreak(lines.length * lineHeight);
                pdf.text(lines, margin, cursorY);
                cursorY += lines.length * lineHeight;
            });
        }
        
        // --- Experience Section ---
        if (user.internships.length > 0) {
            addSection('Experience', () => {
                user.internships.forEach(intern => {
                    checkPageBreak(25);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text(`${intern.role}`, margin, cursorY);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(intern.company, margin + 45, cursorY); // Adjust position as needed
                    pdf.setFont('helvetica', 'italic');
                    const dateText = `${intern.startDate} - ${intern.endDate}`;
                    pdf.text(dateText, pageWidth - margin, cursorY, { align: 'right' });
                    cursorY += lineHeight + 1;

                    pdf.setFont('helvetica', 'normal');
                    const descLines = pdf.splitTextToSize(`• ${intern.description}`, contentWidth-5);
                    checkPageBreak(descLines.length * lineHeight);
                    pdf.text(descLines, margin + 5, cursorY);
                    cursorY += descLines.length * lineHeight + itemSpacing;
                });
            });
        }
        
        // --- Education Section ---
        addSection('Education', () => {
            checkPageBreak(15);
            pdf.setFont('helvetica', 'bold');
            pdf.text(user.institutionName, margin, cursorY);
            pdf.setFont('helvetica', 'italic');
            pdf.text(user.institutionLocation, pageWidth - margin, cursorY, { align: 'right' });
            cursorY += lineHeight;
            pdf.setFont('helvetica', 'normal');
            pdf.text(user.educationLevel, margin, cursorY);
            cursorY += lineHeight;
        });
        
        // --- Skills Section ---
        if (user.skills.technical.length > 0 || user.skills.soft.length > 0) {
            addSection('Skills', () => {
                checkPageBreak(15);
                pdf.setFont('helvetica', 'bold');
                pdf.text('Technical:', margin, cursorY);
                pdf.setFont('helvetica', 'normal');
                const techSkills = user.skills.technical.join(', ');
                const techLines = pdf.splitTextToSize(techSkills, contentWidth - 22);
                pdf.text(techLines, margin + 22, cursorY);
                cursorY += techLines.length * lineHeight + itemSpacing;

                checkPageBreak(15);
                pdf.setFont('helvetica', 'bold');
                pdf.text('Soft:', margin, cursorY);
                pdf.setFont('helvetica', 'normal');
                const softSkills = user.skills.soft.join(', ');
                const softLines = pdf.splitTextToSize(softSkills, contentWidth - 22);
                pdf.text(softLines, margin + 22, cursorY);
                cursorY += softLines.length * lineHeight;
            });
        }

        // --- Achievements Section ---
        if (user.achievements.length > 0) {
            addSection('Achievements', () => {
                user.achievements.forEach(ach => {
                    checkPageBreak(10);
                    const achText = `• ${ach.title}: ${ach.description}`;
                    const lines = pdf.splitTextToSize(achText, contentWidth);
                    pdf.text(lines, margin, cursorY);
                    cursorY += lines.length * lineHeight + 2;
                });
            });
        }
        
        pdf.save(`${user.name.replace(/\s+/g, '_')}_Resume.pdf`);
    };


    if (!user) {
        return <div className="text-center p-8">Loading profile...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="space-y-8">
                {/* --- Profile Header --- */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-sky-500 object-cover shadow-md" />
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">{user.name}</h1>
                            <p className="text-lg text-slate-600 mt-1">{user.institutionName}</p>
                        </div>
                        <div className="sm:ml-auto flex flex-col sm:flex-row gap-3">
                             <button onClick={handleDownloadPdf} className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                <span>Download</span>
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {user.aboutMe && (
                             <ProfileCard title="About Me">
                                <div className="prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: user.aboutMe }} />
                             </ProfileCard>
                        )}
                        {user.internships.length > 0 && (
                            <ProfileCard title="Internship Experience">
                                <div className="space-y-4">
                                    {user.internships.map(internship => <InternshipCard key={internship.id} internship={internship} />)}
                                </div>
                            </ProfileCard>
                        )}
                        {user.achievements.length > 0 && (
                             <ProfileCard title="Achievements">
                                 <ul className="list-disc list-inside space-y-2 text-slate-700">
                                     {user.achievements.map(ach => <li key={ach.id}>{ach.title} - <span className="text-slate-500">{ach.description}</span></li>)}
                                 </ul>
                             </ProfileCard>
                        )}
                        
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <ProfileCard title="Skills">
                            <h4 className="font-semibold text-slate-700 mb-2">Technical Skills</h4>
                             <div className="flex flex-wrap gap-2 mb-4">
                                {user.skills.technical.map(skill => <span key={skill} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                            </div>
                             <h4 className="font-semibold text-slate-700 mb-2">Soft Skills</h4>
                             <div className="flex flex-wrap gap-2">
                                {user.skills.soft.map(skill => <span key={skill} className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                            </div>
                        </ProfileCard>
                        
                        <ProfileCard title="Social Links">
                            <div className="space-y-3">
                                {user.socialLinks.map(link => (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-sky-600 hover:bg-slate-100 p-2 rounded-lg transition-colors">
                                        <div className="w-6 h-6 flex-shrink-0"><SocialIcon platform={link.platform} /></div>
                                        <span className="font-medium capitalize truncate">{link.platform}</span>
                                    </a>
                                ))}
                            </div>
                        </ProfileCard>

                        <ProfileCard title="Interests & Hobbies">
                             <div className="flex flex-wrap gap-2">
                                {[...user.interests, ...user.hobbies].map(item => <span key={item} className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">{item}</span>)}
                            </div>
                        </ProfileCard>
                    </div>
                </div>

                 {/* Jobs Sections */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileCard title="Saved Jobs">
                        {loading ? <p>Loading...</p> : savedJobs.length > 0 ? (
                            <div className="space-y-3">
                                {savedJobs.map(job => <JobListItem key={job.id} job={job} />)}
                            </div>
                        ) : <p className="text-slate-500">No saved jobs yet.</p>}
                    </ProfileCard>
                     <ProfileCard title="Applied Jobs">
                        {loading ? <p>Loading...</p> : appliedJobs.length > 0 ? (
                            <div className="space-y-3">
                                {appliedJobs.map(job => <JobListItem key={job.id} job={job} />)}
                            </div>
                        ) : <p className="text-slate-500">You haven't applied for any jobs yet.</p>}
                    </ProfileCard>
                </div>
            </div>

            <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ProfilePage;
