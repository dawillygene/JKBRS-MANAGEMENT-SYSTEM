import React from 'react';

interface DataTableProps {
    headers: string[];
    rows: React.ReactNode[][];
    className?: string;
}

export function DataTable({ headers, rows, className = '' }: DataTableProps) {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full table-auto">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {headers.map((header, index) => (
                            <th 
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            {row.map((cell, cellIndex) => (
                                <td 
                                    key={cellIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
