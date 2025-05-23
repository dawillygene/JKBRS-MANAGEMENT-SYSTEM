import { SVGAttributes } from 'react';

export default function InventoryIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1L3 6v12l9 5 9-5V6l-9-5z" />
            <path d="M3 6l9 5 9-5" />
            <path d="M12 21V11" /> 
        </svg>
    );
}
