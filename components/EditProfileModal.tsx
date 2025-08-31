import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { User, Achievement } from '../types';

const TagInput: React.FC<{
    tags: string[];
    setTags: (tags: string[]) => void;
    placeholder: string;
}> = ({ tags, setTags, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };
    
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 bg-sky-100 text-sky-700 text-sm font-medium px-2 py-1 rounded-full">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-sky-700 hover:text-sky-900">&times;</button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
        </div>
    );
};

const EditProfileModal: React.FC<{ user: User; onClose: () => void; }> = ({ user, onClose }) => {
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState<User>(user);
    const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (type: 'technical' | 'soft', skills: string[]) => {
        setFormData(prev => ({...prev, skills: {...prev.skills, [type]: skills}}));
    };
    
    const handleAddAchievement = () => {
        if (newAchievement.title && newAchievement.description && newAchievement.date) {
            const achievementToAdd: Achievement = { ...newAchievement, id: Date.now().toString() };
            setFormData(prev => ({ ...prev, achievements: [...prev.achievements, achievementToAdd] }));
            setNewAchievement({ title: '', description: '', date: '' });
        }
    };
    
    const handleRemoveAchievement = (id: string) => {
        setFormData(prev => ({ ...prev, achievements: prev.achievements.filter(ach => ach.id !== id) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        onClose();
    };
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";
    const labelClasses = "block text-sm font-medium text-slate-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Edit Profile</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Full Name</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="educationLevel" className={labelClasses}>Education Level</label>
                            <select id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange} className={inputClasses}>
                                <option>12th Standard</option>
                                <option>Diploma</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="institutionName" className={labelClasses}>{formData.educationLevel === 'Diploma' ? 'College Name' : 'School Name'}</label>
                            <input id="institutionName" name="institutionName" type="text" value={formData.institutionName} onChange={handleChange} className={inputClasses} />
                        </div>
                         <div>
                            <label htmlFor="institutionLocation" className={labelClasses}>Location</label>
                            <input id="institutionLocation" name="institutionLocation" type="text" value={formData.institutionLocation} onChange={handleChange} className={inputClasses} />
                        </div>
                        
                        <div className="pt-4 border-t">
                             <label className={labelClasses}>Technical Skills</label>
                            <TagInput tags={formData.skills.technical} setTags={(tags) => handleSkillsChange('technical', tags)} placeholder="Add a skill and press Enter" />
                        </div>
                        
                        <div>
                             <label className={labelClasses}>Soft Skills</label>
                            <TagInput tags={formData.skills.soft} setTags={(tags) => handleSkillsChange('soft', tags)} placeholder="Add a skill and press Enter" />
                        </div>
                        
                         <div className="pt-4 border-t">
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">Achievements</h3>
                            <div className="space-y-2 mb-4">
                                {formData.achievements.map(ach => (
                                    <div key={ach.id} className="flex items-center gap-2 p-2 bg-slate-100 rounded">
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm">{ach.title}</p>
                                            <p className="text-xs text-slate-600">{ach.description}</p>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveAchievement(ach.id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-2 rounded-md">
                                <input type="text" placeholder="Title" value={newAchievement.title} onChange={e => setNewAchievement(p => ({...p, title: e.target.value}))} className={inputClasses}/>
                                <input type="text" placeholder="Description" value={newAchievement.description} onChange={e => setNewAchievement(p => ({...p, description: e.target.value}))} className={inputClasses}/>
                                <input type="text" placeholder="Date (e.g., May 2024)" value={newAchievement.date} onChange={e => setNewAchievement(p => ({...p, date: e.target.value}))} className={inputClasses}/>
                            </div>
                            <button type="button" onClick={handleAddAchievement} className="mt-2 text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded hover:bg-slate-300">Add Achievement</button>
                        </div>
                        
                    </div>
                    
                    <div className="mt-8 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;