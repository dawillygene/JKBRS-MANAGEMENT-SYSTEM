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
    const changeColorClass = changeType === 'increase' ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400';

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
                    <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">{value}</p>
                    <p className={`text-xs ${changeColorClass}`}>
                        <span className="mr-1">{changeIcon}</span>
                        {change}
                    </p>
                </div>
                <div className={`w-12 h-12 ${iconBgColor} dark:bg-opacity-20 rounded-full flex items-center justify-center`}>
                    <Icon className={`${iconColor} text-xl w-6 h-6`} />
                </div>
            </div>
        </div>
    );
}
