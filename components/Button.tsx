import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'primary-blue';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    href?: string;
    icon?: LucideIcon;
    className?: string;
    children: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    href,
    icon: Icon,
    className = '',
    children,
    ...props
}: ButtonProps) => {
    // Base styles: Shape, Layout, Animation
    const baseStyles = 'group rounded-full px-8 py-4 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    // Variant styles
    const variants = {
        primary: 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20 hover:bg-red-700 hover:shadow-brand-accent/40',
        'primary-blue': 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-blue-900 hover:shadow-brand-primary/40',
        secondary: 'bg-white text-brand-primary shadow-lg shadow-slate-200 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-brand-accent',
        outline: 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white',
    };

    // Icon specific styles per variant
    const iconStyles = {
        primary: '',
        'primary-blue': '',
        secondary: 'transition-colors group-hover:text-brand-accent',
        outline: '',
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;
    const iconClass = `w-5 h-5 ${iconStyles[variant]}`;

    if (href) {
        // Check if external or tel/mailto
        const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

        if (isExternal) {
            return (
                <a href={href} className={combinedStyles}>
                    {Icon && <Icon className={iconClass} />}
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={combinedStyles}>
                {Icon && <Icon className={iconClass} />}
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedStyles} {...props}>
            {Icon && <Icon className={iconClass} />}
            {children}
        </button>
    );
};
