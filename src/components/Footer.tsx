import React from 'react';

interface SocialLink {
    name: string;
    url: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    hoverColor: string;
    hoverBg: string;
    hoverBorder: string;
}

const socialLinks: SocialLink[] = [
    {
        name: 'Instagram',
        url: 'https://instagram.com/mochwildaniazizi',
        hoverColor: 'hover:text-[#E4405F]',
        hoverBg: 'hover:bg-[#E4405F]/10',
        hoverBorder: 'hover:border-[#E4405F]/50',
        icon: (props) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/mochwildaniazizi',
        hoverColor: 'hover:text-[#0A66C2]',
        hoverBg: 'hover:bg-[#0A66C2]/10',
        hoverBorder: 'hover:border-[#0A66C2]/50',
        icon: (props) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        url: 'https://github.com/mochwildaniazizi',
        hoverColor: 'hover:text-white',
        hoverBg: 'hover:bg-white/10',
        hoverBorder: 'hover:border-white/50',
        icon: (props) => (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                {...props}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
            </svg>
        ),
    },
];

export function Footer() {
    return (
        <footer className="relative z-30 border-t border-neutral-900/80 bg-neutral-950/60 backdrop-blur-md px-6 py-5 sm:px-10">
            <div className="mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Brand / Project Info */}
                <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-neutral-300">
                            Visualizer Background
                        </span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                        Interactive audio-reactive waves & echo cursor showcase
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-3">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className={`group flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-xs font-medium text-neutral-400 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${social.hoverBorder} ${social.hoverBg} ${social.hoverColor}`}
                            >
                                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                <span className="font-medium text-neutral-300 transition-colors group-hover:text-inherit">
                                    {social.name}
                                </span>
                            </a>
                        );
                    })}
                </div>

                {/* Copyright / Tech specs */}
                <div className="text-center md:text-right text-[11px] text-neutral-500">
                    <p>Designed & Developed with React 19 + Tailwind CSS</p>
                    <p className="text-neutral-600">Ready for GitHub Pages</p>
                </div>
            </div>
        </footer>
    );
}
