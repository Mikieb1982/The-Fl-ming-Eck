import React from 'react';
import { motion } from 'framer-motion';
import LinkIcon from '../icons/LinkIcon';

interface CTAButtonProps {
    children: React.ReactNode;
    href: string;
}

export default function CTAButton({ children, href }: CTAButtonProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold text-white bg-ocean rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-ocean focus-visible:ring-offset-cream"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <LinkIcon className="w-6 h-6" />
            <span>{children}</span>
        </motion.a>
    );
}