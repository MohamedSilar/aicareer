import React, { useState, useCallback } from 'react';
import { getCareerPrediction, getDomainInfo } from '../services/geminiService';
import type { EvaluationResult, DomainDetails, Question } from '../types';
import { QUIZ_QUESTIONS, ENGINEERING_DOMAINS, BrainIcon, ExploreIcon } from '../constants';

type ViewState = 'CHOICE' | 'EVALUATION' | 'EXPLORE' | 'EVALUATION_RESULT' | 'DOMAIN_DETAILS';

const Loader: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <svg className="animate-spin h-12 w-12 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-slate-700">{text}</p>
        <p className="text-sm text-slate-600">Our AI is working its magic. Please wait a moment...</p>
    </div>
);

const ChoiceView: React.FC<{ onSelect: (view: ViewState) => void }> = ({ onSelect }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button onClick={() => onSelect('EVALUATION')} className="group text-left bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
            <BrainIcon className="w-12 h-12 text-sky-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-bold text-slate-800">Evaluate Yourself</h2>
            <p className="text-slate-600 mt-2">Take a 10-question assessment to get a personalized career roadmap powered by AI.</p>
        </button>
        <button onClick={() => onSelect('EXPLORE')} className="group text-left bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
            <ExploreIcon className="w-12 h-12 text-teal-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-bold text-slate-800">Explore Domains</h2>
            <p className="text-slate-600 mt-2">Browse through various engineering fields to learn more about them.</p>
        </button>
    </div>
);

const EvaluationView: React.FC<{ onSubmit: (answers: { [key: number]: string }) => void, onBack: () => void }> = ({ onSubmit, onBack }) => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (questionId: number, option: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
        setTimeout(() => {
            if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }, 300);
    };

    const currentQuestion: Question = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-sky-600">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</p>
                    <button onClick={onBack} className="text-sm text-slate-600 hover:text-slate-800">&larr; Back to Home</button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">{currentQuestion.text}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(currentQuestion.id, option)}
                        className={`text-left p-4 border-2 rounded-lg transition-colors duration-200 ${
                            answers[currentQuestion.id] === option 
                            ? 'bg-sky-100 border-sky-500 text-sky-800' 
                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-400'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {Object.keys(answers).length === QUIZ_QUESTIONS.length && (
                 <div className="mt-8 text-center">
                    <button onClick={() => onSubmit(answers)} className="bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors shadow-md">
                        Submit & See My Result
                    </button>
                </div>
            )}
        </div>
    );
};

const ExploreView: React.FC<{ onSelectDomain: (domain: string) => void, onBack: () => void }> = ({ onSelectDomain, onBack }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-slate-800">Explore Engineering Domains</h2>
            <button onClick={onBack} className="text-sm text-slate-600 hover:text-slate-800">&larr; Back to Home</button>
        </div>
       
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ENGINEERING_DOMAINS.map(domain => (
                <button key={domain} onClick={() => onSelectDomain(domain)} className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-sky-100 hover:border-sky-300 hover:shadow-md transition-all text-center font-semibold text-slate-700">
                    {domain}
                </button>
            ))}
        </div>
    </div>
);

const ResultCard: React.FC<{title: string; children: React.ReactNode;}> = ({title, children}) => (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>
        {children}
    </div>
);

const EvaluationResultView: React.FC<{ result: EvaluationResult; onBack: () => void }> = ({ result, onBack }) => (
    <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sky-600 font-semibold">AI Recommended Path</p>
                    <h2 className="text-4xl font-bold text-slate-800 mt-1">{result.domain}</h2>
                    <p className="text-slate-600 mt-3 max-w-prose">{result.reasoning}</p>
                </div>
                <button onClick={onBack} className="text-sm text-slate-600 hover:text-slate-800 flex-shrink-0">&larr; Back</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultCard title="Personalized Roadmap">
                <ol className="relative border-l border-slate-300 ml-2">
                    {result.roadmap.map((item, index) => (
                        <li key={index} className="mb-6 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-sky-200 rounded-full -left-3 ring-8 ring-white">
                                <span className="text-sky-800 font-bold">{index+1}</span>
                            </span>
                            <h4 className="font-semibold text-slate-700">{item.step}</h4>
                            <p className="text-sm text-slate-600">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </ResultCard>
            
            <div className="space-y-6">
                 <ResultCard title="Essential Tools">
                    <div className="flex flex-wrap gap-2">
                        {result.tools.map((tool, index) => <span key={index} className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">{tool}</span>)}
                    </div>
                </ResultCard>

                 <ResultCard title="Top Certifications">
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {result.certifications.map((cert, index) => <li key={index}>{cert}</li>)}
                    </ul>
                </ResultCard>
            </div>
        </div>
        
        <ResultCard title="Top Colleges in Tamil Nadu">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.colleges.map((college, index) => (
                    <a href={college.url} target="_blank" rel="noopener noreferrer" key={index} className="block p-3 bg-white border border-slate-200 rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors text-slate-700">
                        {college.name}
                    </a>
                ))}
            </div>
        </ResultCard>
    </div>
);

const DomainDetailsView: React.FC<{ details: DomainDetails; domainName: string; onBack: () => void }> = ({ details, domainName, onBack }) => (
    <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-4xl font-bold text-slate-800">{domainName}</h2>
                    <p className="text-slate-600 mt-3 max-w-prose">{details.overview}</p>
                </div>
                <button onClick={onBack} className="text-sm text-slate-600 hover:text-slate-800 flex-shrink-0">&larr; Back</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultCard title="Top Colleges in Tamil Nadu">
                 <div className="space-y-3">
                    {details.colleges.map((college, index) => (
                        <a href={college.url} target="_blank" rel="noopener noreferrer" key={index} className="block p-3 bg-white border border-slate-200 rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors text-slate-700">
                            {college.name}
                        </a>
                    ))}
                </div>
            </ResultCard>
            <ResultCard title="Relevant Certifications">
                 <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {details.certifications.map((cert, index) => <li key={index}>{cert}</li>)}
                </ul>
            </ResultCard>
        </div>

        <ResultCard title="Top NPTEL Resources">
            <div className="space-y-3">
                {details.nptelResources.map((resource, index) => (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" key={index} className="block p-3 bg-white border border-slate-200 rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors text-slate-700">
                        {resource.name}
                    </a>
                ))}
            </div>
        </ResultCard>
    </div>
);

const HomePage: React.FC = () => {
    const [view, setView] = useState<ViewState>('CHOICE');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
    const [domainDetails, setDomainDetails] = useState<DomainDetails | null>(null);
    const [selectedDomain, setSelectedDomain] = useState<string>('');
    const [loadingText, setLoadingText] = useState('');

    const handleEvaluationSubmit = useCallback(async (answers: { [key: number]: string }) => {
        setIsLoading(true);
        setError(null);
        setLoadingText('Analyzing your answers...');
        try {
            const result = await getCareerPrediction(answers);
            setEvaluationResult(result);
            setView('EVALUATION_RESULT');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setView('CHOICE'); // Go back to choice on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSelectDomain = useCallback(async (domain: string) => {
        setIsLoading(true);
        setError(null);
        setSelectedDomain(domain);
        setLoadingText(`Fetching details for ${domain}...`);
        try {
            const details = await getDomainInfo(domain);
            setDomainDetails(details);
            setView('DOMAIN_DETAILS');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setView('EXPLORE'); // Go back to explore on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleBack = () => {
        setView(view === 'EVALUATION' || view === 'EXPLORE' ? 'CHOICE' : (view === 'DOMAIN_DETAILS' ? 'EXPLORE' : 'CHOICE'));
        setError(null);
    };

    const renderContent = () => {
        if (isLoading) return <Loader text={loadingText} />;
        
        switch (view) {
            case 'EVALUATION':
                return <EvaluationView onSubmit={handleEvaluationSubmit} onBack={handleBack}/>;
            case 'EXPLORE':
                return <ExploreView onSelectDomain={handleSelectDomain} onBack={handleBack}/>;
            case 'EVALUATION_RESULT':
                return evaluationResult && <EvaluationResultView result={evaluationResult} onBack={() => setView('CHOICE')} />;
            case 'DOMAIN_DETAILS':
                return domainDetails && <DomainDetailsView details={domainDetails} domainName={selectedDomain} onBack={() => setView('EXPLORE')} />;
            case 'CHOICE':
            default:
                return <ChoiceView onSelect={setView} />;
        }
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default HomePage;