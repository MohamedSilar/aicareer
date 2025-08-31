import React from 'react';
import { MOCK_FORUM_POSTS } from '../constants';

const ForumPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Community Forum</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Discuss jobs, courses, and career tips with fellow students.</p>
                    </div>
                    <button className="bg-sky-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-sky-600 transition-colors">
                        Start a Discussion
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
                {MOCK_FORUM_POSTS.map(post => (
                    <div key={post.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full hidden sm:block"/>
                        <div className="flex-grow">
                            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer">{post.title}</h2>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span>{post.author}</span>
                                <span>&middot;</span>
                                <span>{post.createdAt}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full capitalize">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-right text-sm text-slate-500 dark:text-slate-400 hidden md:block">
                            <p>{post.replies} replies</p>
                            <p>{post.views} views</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForumPage;