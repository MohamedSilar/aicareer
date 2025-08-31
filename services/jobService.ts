import { MOCK_JOBS } from '../constants';
import type { Job } from '../types';

interface JobFilters {
    keyword?: string;
    location?: string;
    type?: string;
    salary?: string;
}

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function fetchJobs(filters: JobFilters = {}): Promise<Job[]> {
    await delay(500);
    
    let jobs = [...MOCK_JOBS];

    if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        jobs = jobs.filter(job => 
            job.title.toLowerCase().includes(keyword) || 
            job.company.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword)
        );
    }

    if (filters.location) {
        const location = filters.location.toLowerCase();
        jobs = jobs.filter(job => job.location.toLowerCase().includes(location));
    }

    if (filters.type && filters.type !== 'All') {
        jobs = jobs.filter(job => job.type === filters.type);
    }
    
    if (filters.salary) {
        jobs = jobs.filter(job => job.salary && job.salary.toLowerCase().includes(filters.salary!.toLowerCase()));
    }


    return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export async function getJobsByIds(ids: number[]): Promise<Job[]> {
    await delay(300);
    return MOCK_JOBS.filter(job => ids.includes(job.id));
}