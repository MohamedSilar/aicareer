import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CodeIcon } from '../constants';

const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [educationLevel, setEducationLevel] = useState<'12th Standard' | 'Diploma'>('12th Standard');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionLocation, setInstitutionLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
         if (educationLevel === 'Diploma' && (!institutionName || !institutionLocation)) {
            setError('College Name and Location are required for Diploma holders.');
            return;
        }
        setLoading(true);
        const success = await signUp({
            name,
            email,
            password,
            educationLevel,
            institutionName,
            institutionLocation
        });
        setLoading(false);
        if (success) {
            navigate('/');
        } else {
            setError('An account with this email already exists.');
        }
    };
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";
    const labelClasses = "block text-sm font-medium text-slate-700";

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                 <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <CodeIcon className="w-8 h-8 text-sky-500" />
                        <h1 className="text-2xl font-bold text-slate-900">Career Guidance</h1>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700">Create an Account</h2>
                    <p className="text-slate-600">Start your career journey with us today.</p>
                </div>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className={labelClasses}>Full Name</label>
                        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
                    </div>
                     <div>
                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
                    </div>
                     <div>
                        <label htmlFor="password" className={labelClasses}>Password</label>
                        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
                    </div>

                    <div>
                        <label className={labelClasses}>Highest Qualification</label>
                        <div className="mt-2 flex gap-x-6">
                            <label className="flex items-center">
                                <input type="radio" name="educationLevel" value="12th Standard" checked={educationLevel === '12th Standard'} onChange={(e) => setEducationLevel(e.target.value as '12th Standard' | 'Diploma')} className="h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500" />
                                <span className="ml-2 text-sm text-slate-700">12th Standard</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="educationLevel" value="Diploma" checked={educationLevel === 'Diploma'} onChange={(e) => setEducationLevel(e.target.value as '12th Standard' | 'Diploma')} className="h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500" />
                                <span className="ml-2 text-sm text-slate-700">Diploma</span>
                            </label>
                        </div>
                    </div>

                    {educationLevel === '12th Standard' ? (
                        <>
                            <div>
                                <label htmlFor="institutionName" className={labelClasses}>School Name <span className="text-slate-500">(Optional)</span></label>
                                <input id="institutionName" type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} className={inputClasses} />
                            </div>
                            <div>
                                <label htmlFor="institutionLocation" className={labelClasses}>Location <span className="text-slate-500">(Optional)</span></label>
                                <input id="institutionLocation" type="text" value={institutionLocation} onChange={(e) => setInstitutionLocation(e.target.value)} className={inputClasses} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="institutionName" className={labelClasses}>College Name</label>
                                <input id="institutionName" type="text" required value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} className={inputClasses} />
                            </div>
                            <div>
                                <label htmlFor="institutionLocation" className={labelClasses}>Location</label>
                                <input id="institutionLocation" type="text" required value={institutionLocation} onChange={(e) => setInstitutionLocation(e.target.value)} className={inputClasses} />
                            </div>
                        </>
                    )}

                    <div>
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors mt-4 disabled:bg-sky-300">
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                 <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-sky-600 hover:text-sky-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;