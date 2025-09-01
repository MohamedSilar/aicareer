import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Task } from '../types';

// Utility functions for date handling
const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];
const areDatesEqual = (date1: Date, date2: Date) => toYYYYMMDD(date1) === toYYYYMMDD(date2);

const TaskModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, category: Task['category']) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<Task['category']>('Learning');

    if (!isOpen) return null;

    const handleSave = () => {
        if (title.trim()) {
            onSave(title.trim(), category);
            setTitle('');
            setCategory('Learning');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Task</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="task-title" className="block text-sm font-medium text-slate-700">Task Title</label>
                        <input
                            type="text"
                            id="task-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-slate-900"
                            placeholder="e.g., Complete React tutorial"
                        />
                    </div>
                    <div>
                        <label htmlFor="task-category" className="block text-sm font-medium text-slate-700">Category</label>
                        <select
                            id="task-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Task['category'])}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-900"
                        >
                            <option>Learning</option>
                            <option>Work</option>
                            <option>Job Application</option>
                            <option>Personal</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">Save Task</button>
                </div>
            </div>
        </div>
    );
};


const CalendarPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tasksByDate = useMemo(() => {
        const map = new Map<string, Task[]>();
        user?.tasks.forEach(task => {
            const dateStr = task.date;
            if (!map.has(dateStr)) {
                map.set(dateStr, []);
            }
            map.get(dateStr)?.push(task);
        });
        return map;
    }, [user?.tasks]);

    const handleAddTask = (title: string, category: Task['category']) => {
        if (!user) return;
        const newTask: Task = {
            id: Date.now().toString(),
            date: toYYYYMMDD(selectedDate),
            title,
            category,
            completed: false,
        };
        const updatedUser = { ...user, tasks: [...user.tasks, newTask] };
        updateUser(updatedUser);
        setIsModalOpen(false);
    };
    
    const handleToggleTask = (taskId: string) => {
        if (!user) return;
        
        const updatedTasks = user.tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        updateUser({ ...user, tasks: updatedTasks });
    };

    const handleDeleteTask = (taskId: string) => {
        if (!user) return;
        const updatedTasks = user.tasks.filter(task => task.id !== taskId);
        updateUser({ ...user, tasks: updatedTasks });
    };

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-r border-b border-slate-200"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, currentDate.getMonth(), day);
        const dateStr = toYYYYMMDD(date);
        const isToday = areDatesEqual(date, new Date());
        const isSelected = areDatesEqual(date, selectedDate);
        const hasTasks = tasksByDate.has(dateStr);

        calendarDays.push(
            <div key={day} onClick={() => setSelectedDate(date)} className={`p-2 border-r border-b border-slate-200 relative cursor-pointer transition-colors ${isSelected ? 'bg-sky-100' : 'hover:bg-slate-50'}`}>
                <time dateTime={dateStr} className={`text-sm font-semibold flex items-center justify-center w-8 h-8 rounded-full ${isToday ? 'bg-sky-500 text-white' : 'text-slate-700'} ${isSelected ? 'ring-2 ring-sky-400' : ''}`}>{day}</time>
                {hasTasks && <span className="absolute bottom-1 right-2 w-2 h-2 bg-teal-500 rounded-full"></span>}
            </div>
        );
    }

    const selectedDateTasks = tasksByDate.get(toYYYYMMDD(selectedDate)) || [];
    
    const categoryColors: Record<Task['category'], string> = {
        Learning: 'bg-blue-100 text-blue-800',
        Work: 'bg-purple-100 text-purple-800',
        'Job Application': 'bg-green-100 text-green-800',
        Personal: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
            {/* Calendar View */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-slate-100">&larr;</button>
                    <h2 className="text-xl font-bold text-slate-800">{monthName} {year}</h2>
                    <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-slate-100">&rarr;</button>
                </div>
                <div className="grid grid-cols-7 text-center font-semibold text-slate-500 text-sm border-t border-l border-r border-slate-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2 border-b border-r border-slate-200">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 flex-1 border-l border-slate-200">{calendarDays}</div>
                 <div className="mt-4 flex justify-center items-center gap-6">
                    <button onClick={() => {setCurrentDate(new Date()); setSelectedDate(new Date())}} className="px-4 py-2 text-sm font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
                        Go to Today
                    </button>
                </div>
            </div>

            {/* Tasks View */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Tasks for</h3>
                <p className="text-slate-600 mb-4">{selectedDate.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                    {selectedDateTasks.length > 0 ? selectedDateTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                           <label className="relative flex items-center cursor-pointer">
                                <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} className="sr-only peer"/>
                                <div className="w-5 h-5 bg-white border-2 border-slate-300 rounded peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-colors"></div>
                                <svg className="absolute w-3 h-3 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                           </label>
                           <div className="flex-1">
                                <p className={`text-slate-800 ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</p>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[task.category]}`}>{task.category}</span>
                           </div>
                           <button onClick={() => handleDeleteTask(task.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                        </div>
                    )) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500">No tasks for this day.</p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-sky-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-600 transition-colors">
                        Add New Task
                    </button>
                </div>
            </div>
            
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />
        </div>
    );
};

export default CalendarPage;