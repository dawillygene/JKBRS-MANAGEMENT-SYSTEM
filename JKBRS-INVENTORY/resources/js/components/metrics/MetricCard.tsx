import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    icon: LucideIcon;
    iconBgColor: string;
    iconColor: string;
}

export function MetricCard({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    iconBgColor, 
    iconColor 
}: MetricCardProps) {
    const changeIcon = changeType === 'increase' ? '↗' : '↘';
    const changeColorClass = changeType === 'increase' 
        ? 'text-emerald-600 dark:text-emerald-400' 
        : 'text-orange-600 dark:text-orange-400';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">{value}</p>
                    <div className="flex items-center">
                        <span className={`text-xs font-medium ${changeColorClass} bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center gap-1`}>
                            <span className="text-sm">{changeIcon}</span>
                            {change}
                        </span>
                    </div>
                </div>
                <div className={`w-12 h-12 lg:w-14 lg:h-14 ${iconBgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`${iconColor} w-6 h-6 lg:w-7 lg:h-7`} />
                </div>
            </div>
        </div>
    );
}
