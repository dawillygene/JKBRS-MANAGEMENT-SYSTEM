import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormFieldProps {
    label: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    options?: Array<{ value: string; label: string }>;
    className?: string;
    required?: boolean;
}

export function FormField({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    options, 
    className = '',
    required = false 
}: FormFieldProps) {
    const baseClassName = `w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`;

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <Textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        className={baseClassName}
                        required={required}
                        rows={3}
                    />
                );
            case 'select':
                return (
                    <Select value={value?.toString()} onValueChange={onChange}>
                        <SelectTrigger className={baseClassName}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            default:
                return (
                    <Input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        className={baseClassName}
                        required={required}
                    />
                );
        }
    };

    return (
        <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderInput()}
        </div>
    );
}
