import React from 'react';

interface StatusCardProps {
    title: string;
    value: string;
    bgColor: string;
    textColor: string;
}

export function StatusCard({ title, value, bgColor, textColor }: StatusCardProps) {
    return (
        <div className={`flex justify-between items-center p-3 ${bgColor} dark:bg-opacity-20 rounded`}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</span>
            <span className={`${textColor} font-bold`}>{value}</span>
        </div>
    );
}
