import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import type { User, Achievement, Internship } from '../types';

// --- ICONS ---
const TrashIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


type FormData = Omit<User, 'password'>;
type SocialLink = User['socialLinks'][0];

const emptyAchievement: Achievement = { id: '', title: '', description: '', date: '' };
const emptyInternship: Internship = { id: '', company: '', role: '', startDate: '', endDate: '', description: '' };
const emptySocialLink: SocialLink = { id: '', platform: 'linkedin', url: '' };
const socialPlatforms: SocialLink['platform'][] = ['linkedin', 'github', 'twitter', 'portfolio', 'other'];

export const EditProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState<FormData | null>(null);

    useEffect(() => {
        if (user) {
            // Deep copy user to avoid direct mutation
            setFormData(JSON.parse(JSON.stringify(user)));
        }
    }, [user, isOpen]);

    if (!isOpen || !formData) return null;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSkillsChange = (skillType: 'technical' | 'soft', value: string) => {
        const skills = value.split(',').map(s => s.trim()).filter(Boolean);
        setFormData(prev => prev ? { ...prev, skills: { ...prev.skills, [skillType]: skills } } : null);
    };

    const handleAddItem = <T extends Achievement | Internship | SocialLink>(
        field: 'achievements' | 'internships' | 'socialLinks',
        emptyItem: T
    ) => {
        setFormData(prev => {
            if (!prev) return null;
            const newItems = [...(prev[field] || []), { ...emptyItem, id: Date.now().toString() }];
            return { ...prev, [field]: newItems };
        });
    };

    const handleRemoveItem = (field: 'achievements' | 'internships' | 'socialLinks', id: string) => {
        setFormData(prev => {
            if (!prev) return null;
            const newItems = (prev[field] as any[]).filter(item => item.id !== id);
            return { ...prev, [field]: newItems };
        });
    };

    const handleItemChange = <T extends Achievement | Internship | SocialLink>(
        field: 'achievements' | 'internships' | 'socialLinks',
        id: string,
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (!prev) return null;
            const newItems = (prev[field] as T[]).map(item =>
                item.id === id ? { ...item, [name]: value } : item
            );
            return { ...prev, [field]: newItems };
        });
    };
    
    const handleSave = () => {
        if (formData) {
            updateUser(formData as User);
            onClose();
        }
    };
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";
    const labelClasses = "block text-sm font-medium text-slate-700";
    // FIX: Added a consistent class for dynamically generated inputs to ensure proper styling.
    const dynamicInputClasses = "block w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">Edit Your Profile</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* --- Basic Info --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Full Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="institutionName" className={labelClasses}>Institution Name</label>
                            <input type="text" name="institutionName" id="institutionName" value={formData.institutionName} onChange={handleInputChange} className={inputClasses} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="aboutMe" className={labelClasses}>About Me</label>
                        <textarea name="aboutMe" id="aboutMe" value={formData.aboutMe} onChange={handleInputChange} rows={4} className={inputClasses} placeholder="Tell us something about yourself..."></textarea>
                    </div>

                    {/* --- Social Links --- */}
                    <div>
                        <div className="flex justify-between items-center mb-2 border-b pb-1">
                            <h3 className="font-semibold text-lg text-slate-800">Social Links</h3>
                            <button onClick={() => handleAddItem('socialLinks', emptySocialLink)} className="flex items-center gap-1 text-sm text-sky-600 font-semibold hover:text-sky-800">
                                <PlusIcon /> Add Link
                            </button>
                        </div>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {formData.socialLinks.map((link) => (
                                <div key={link.id} className="grid grid-cols-12 gap-2 p-3 bg-white rounded-md border items-center">
                                    <select
                                        name="platform"
                                        value={link.platform}
                                        onChange={(e) => handleItemChange('socialLinks', link.id, e)}
                                        className={`col-span-4 ${dynamicInputClasses}`}
                                    >
                                        {socialPlatforms.map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
                                    </select>
                                    <input type="url" name="url" placeholder="https://..." value={link.url} onChange={(e) => handleItemChange('socialLinks', link.id, e)} className={`col-span-7 ${dynamicInputClasses}`} />
                                    <button onClick={() => handleRemoveItem('socialLinks', link.id)} className="col-span-1 text-red-500 hover:text-red-700 flex items-center justify-center">
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Skills --- */}
                    <div>
                         <h3 className="font-semibold text-lg text-slate-800 mb-2 border-b pb-1">Skills</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="technicalSkills" className={labelClasses}>Technical Skills (comma-separated)</label>
                                <input type="text" id="technicalSkills" value={formData.skills.technical.join(', ')} onChange={(e) => handleSkillsChange('technical', e.target.value)} className={inputClasses} />
                            </div>
                             <div>
                                <label htmlFor="softSkills" className={labelClasses}>Soft Skills (comma-separated)</label>
                                <input type="text" id="softSkills" value={formData.skills.soft.join(', ')} onChange={(e) => handleSkillsChange('soft', e.target.value)} className={inputClasses} />
                            </div>
                        </div>
                    </div>
                    
                     {/* --- Achievements --- */}
                    <div>
                         <div className="flex justify-between items-center mb-2 border-b pb-1">
                             <h3 className="font-semibold text-lg text-slate-800">Achievements</h3>
                             <button onClick={() => handleAddItem('achievements', emptyAchievement)} className="flex items-center gap-1 text-sm text-sky-600 font-semibold hover:text-sky-800">
                                 <PlusIcon /> Add
                             </button>
                         </div>
                         <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                             {formData.achievements.map((ach) => (
                                 <div key={ach.id} className="grid grid-cols-12 gap-2 p-3 bg-white rounded-md border items-center">
                                    <input type="text" name="title" placeholder="Title" value={ach.title} onChange={(e) => handleItemChange('achievements', ach.id, e)} className={`col-span-5 ${dynamicInputClasses}`} />
                                    <input type="text" name="description" placeholder="Description" value={ach.description} onChange={(e) => handleItemChange('achievements', ach.id, e)} className={`col-span-6 ${dynamicInputClasses}`} />
                                     <button onClick={() => handleRemoveItem('achievements', ach.id)} className="col-span-1 text-red-500 hover:text-red-700 flex items-center justify-center">
                                         <TrashIcon />
                                     </button>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* --- Internships --- */}
                    <div>
                        <div className="flex justify-between items-center mb-2 border-b pb-1">
                             <h3 className="font-semibold text-lg text-slate-800">Internships</h3>
                             <button onClick={() => handleAddItem('internships', emptyInternship)} className="flex items-center gap-1 text-sm text-sky-600 font-semibold hover:text-sky-800">
                                 <PlusIcon /> Add
                             </button>
                         </div>
                         <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {formData.internships.map(intern => (
                                <div key={intern.id} className="p-3 bg-white rounded-md border space-y-2 relative">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" name="role" placeholder="Role" value={intern.role} onChange={(e) => handleItemChange('internships', intern.id, e)} className={dynamicInputClasses} />
                                        <input type="text" name="company" placeholder="Company" value={intern.company} onChange={(e) => handleItemChange('internships', intern.id, e)} className={dynamicInputClasses} />
                                        <input type="text" name="startDate" placeholder="Start Date (e.g., Jan 2023)" value={intern.startDate} onChange={(e) => handleItemChange('internships', intern.id, e)} className={dynamicInputClasses} />
                                        <input type="text" name="endDate" placeholder="End Date (e.g., Mar 2023)" value={intern.endDate} onChange={(e) => handleItemChange('internships', intern.id, e)} className={dynamicInputClasses} />
                                    </div>
                                    <textarea name="description" placeholder="Description" value={intern.description} onChange={(e) => handleItemChange('internships', intern.id, e)} className={`w-full ${dynamicInputClasses}`} rows={2}></textarea>
                                    <button onClick={() => handleRemoveItem('internships', intern.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                         </div>
                    </div>

                </div>
                <div className="p-6 bg-white border-t border-slate-200 flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};