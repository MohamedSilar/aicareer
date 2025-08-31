import React, { useState, useMemo, useEffect } from 'react';
import { LEARNING_RESOURCES, ENGINEERING_DOMAINS, DAILY_QUIZ_CHALLENGES } from '../constants';
import { getLearningRoadmap } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Roadmap = { step: string; description: string; resources: { name: string, url: string }[] }[];

const progressData = [
  { name: 'Java', progress: 85 },
  { name: 'React', progress: 60 },
  { name: 'CSS', progress: 90 },
  { name: 'Python', progress: 45 },
];

const LearningRoadmap: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateRoadmap = async () => {
        if (!domain) {
            setError('Please select a domain.');
            return;
        }
        setError('');
        setLoading(true);
        setRoadmap(null);
        try {
            const result = await getLearningRoadmap(domain);
            setRoadmap(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate roadmap.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Generate Learning Roadmap</h2>
            <p className="text-slate-600 mt-1">Get a personalized, step-by-step learning path for any domain, powered by AI.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <select value={domain} onChange={(e) => setDomain(e.target.value)} className="flex-grow block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md">
                    <option value="" disabled>Select a Domain</option>
                    {ENGINEERING_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <button onClick={handleGenerateRoadmap} disabled={loading} className="bg-sky-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-sky-300">
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {loading && <div className="mt-4 text-center text-slate-600">AI is crafting your personal roadmap...</div>}
            {roadmap && (
                <div className="mt-6 space-y-4">
                    {roadmap.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <h3 className="font-bold text-sky-700">{index + 1}. {item.step}</h3>
                            <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                            <div className="mt-3">
                                <h4 className="text-sm font-semibold text-slate-800">Resources:</h4>
                                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                                    {item.resources.map(res => (
                                        <li key={res.name}><a href={res.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{res.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const DailyChallenge: React.FC = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const dailyQuestion = useMemo(() => DAILY_QUIZ_CHALLENGES[dayOfYear % DAILY_QUIZ_CHALLENGES.length], [dayOfYear]);
    const storageKey = `dailyChallenge_${today.toISOString().split('T')[0]}`;

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        const savedState = localStorage.getItem(storageKey);
        if (savedState) {
            const { submitted, correct, selected } = JSON.parse(savedState);
            setIsSubmitted(submitted);
            setIsCorrect(correct);
            setSelectedOption(selected);
        }
    }, [storageKey]);

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const correct = selectedOption === dailyQuestion.correctAnswerIndex;
        setIsCorrect(correct);
        setIsSubmitted(true);
        localStorage.setItem(storageKey, JSON.stringify({ submitted: true, correct: correct, selected: selectedOption }));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Daily Learning Challenge</h2>
            <div className="space-y-3">
                <p className="font-semibold text-slate-700">{dailyQuestion.question}</p>
                <ul className="space-y-2 text-sm">
                    {dailyQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        let buttonClass = 'bg-slate-100 hover:bg-sky-100';
                        if (isSubmitted) {
                            if (index === dailyQuestion.correctAnswerIndex) {
                                buttonClass = 'bg-green-100 border-green-500 text-green-800';
                            } else if (isSelected) {
                                buttonClass = 'bg-red-100 border-red-500 text-red-800';
                            }
                        } else if (isSelected) {
                            buttonClass = 'bg-sky-100 border-sky-500';
                        }
                        return (
                            <li key={index}>
                                <button
                                    onClick={() => !isSubmitted && setSelectedOption(index)}
                                    className={`w-full text-left p-3 rounded-md border-2 transition-colors ${isSubmitted ? 'cursor-not-allowed' : ''} ${buttonClass} ${isSelected && !isSubmitted ? 'border-sky-500' : 'border-transparent'}`}
                                    disabled={isSubmitted}
                                >
                                    {option}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {!isSubmitted && (
                    <button onClick={handleSubmit} disabled={selectedOption === null} className="w-full mt-2 bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-900 disabled:bg-slate-400">
                        Submit Answer
                    </button>
                )}
                 {isSubmitted && (
                    <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <h4 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? '✅ Correct! Well done 👏' : '❌ Oops! That’s not correct.'}
                        </h4>
                        <p className="text-sm text-slate-700 mt-2">{dailyQuestion.explanation}</p>
                        <a href={dailyQuestion.resourceLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-sky-600 hover:underline mt-2 inline-block">
                            {dailyQuestion.resourceText} &rarr;
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const LearningPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <LearningRoadmap />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <h2 className="text-xl font-bold text-slate-800 mb-4">Progress Analytics</h2>
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={progressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                                <XAxis dataKey="name" stroke="#475569"/>
                                <YAxis stroke="#475569"/>
                                <Tooltip wrapperClassName="!bg-white !border-slate-200 !rounded-lg !shadow-lg" />
                                <Bar dataKey="progress" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <DailyChallenge />
            </div>

            <div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">Learning Resources</h2>
                    <p className="text-slate-600 mt-1">Click on any technology to start learning from trusted platforms.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {LEARNING_RESOURCES.map((resource) => (
                        <a
                            key={resource.name}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <img src={resource.icon} alt={`${resource.name} logo`} className="h-16 w-16 object-contain mb-4" />
                            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">{resource.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPage;