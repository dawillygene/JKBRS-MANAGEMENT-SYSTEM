import React from 'react';

interface ActivityItemProps {
    iconClass: string;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
}

export function ActivityItem({ iconClass, iconBg, iconColor, title, description }: ActivityItemProps) {
    return (
        <div className={`flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded`}>
            <div className={`w-8 h-8 ${iconBg} dark:bg-opacity-40 rounded-full flex items-center justify-center`}>
                <i className={`${iconClass} ${iconColor} text-sm`}></i>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
}