import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import type { CertificateFile } from '../types';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const CertificatesPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (files: FileList | null) => {
        if (files && user) {
            const newCertificates = Array.from(files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file),
                verified: Math.random() > 0.7, // Mock verification status
            }));
            const updatedUser = {...user, certificates: [...user.certificates, ...newCertificates] };
            updateUser(updatedUser);
        }
    };

    const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    }, []);
    
    if (!user) return null;

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800">Your Certificates</h1>
                <p className="text-slate-600 mt-1">Upload and manage your course completion certificates here.</p>
            </div>

            <div 
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                    isDragging ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-white'
                }`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e.target.files)}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <UploadIcon />
                    <p className="mt-2 text-slate-700">
                        <span className="font-semibold text-sky-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF or PDF</p>
                </label>
            </div>

            {user.certificates.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Uploaded Certificates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {user.certificates.map((cert, index) => (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" key={index} className="group border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
                                {cert.verified && (
                                    <div title="Verified Certificate" className="absolute top-2 right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center z-10 shadow">
                                        <VerifiedIcon />
                                    </div>
                                )}
                                <div className="aspect-video bg-slate-100 flex items-center justify-center">
                                    <p className="text-slate-400 text-sm">Preview</p>
                                </div>
                                <div className="p-3 bg-white">
                                    <p className="text-sm font-medium text-slate-700 truncate group-hover:text-sky-600">{cert.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificatesPage;