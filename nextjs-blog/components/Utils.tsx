export const TechBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-primary)] border border-[var(--color-primary)] text-white rounded-full text-xs transition-all hover:bg-gray-100 hover:text-[var(--color-primary)] group/badge whitespace-nowrap">
        {children}
    </div>
);

export const SkillBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-[var(--color-primary)] border border-[var(--color-primary)] text-white rounded-full text-xs md:text-sm transition-all hover:bg-gray-100 hover:text-[var(--color-primary)] group/badge whitespace-nowrap">
        {children}
    </div>
);

export const JobTypeBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center px-3 py-1 bg-[var(--color-secondary)] text-white rounded-full text-xs font-medium whitespace-nowrap">
        {children}
    </div>
);

export const WindevIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 83 91" className="size-4"><path d="M.986 47.776c.1 1.9.5 5.1 1.8 7.4 3.2 5.6 10.2 7.8 16 5.3l7.6-4.4v-29.5c.7-6.3 6.1-11.2 12.6-11.2 2.6 0 5.5 1.3 7.3 2.2l-25.3-14.6c-2.1-1.5-4.6-2.3-7.3-2.3-2.2 0-4.3.6-6.1 1.6-3.9 2.1-6.6 6.3-6.6 11.1z"></path><path d="M49.787 71.776c1.6-1.1 4.2-3 5.5-5.2 3.3-5.6 1.7-12.7-3.4-16.5l-7.6-4.4-25.5 14.7c-5.8 2.5-12.7.3-16-5.3-1.3-2.3-1.6-5.4-1.8-7.4v29.1c-.2 2.5.3 5.1 1.6 7.5 1.1 1.9 2.6 3.4 4.4 4.5 3.8 2.3 8.8 2.6 13 .2z"></path><path d="M46.187 17.476c-1.7-.8-4.7-2.2-7.3-2.2-6.5 0-11.8 4.9-12.6 11.2v8.8l25.5 14.7c5.1 3.8 6.7 10.9 3.4 16.5-1.3 2.3-3.9 4.1-5.5 5.2l25.2-14.6c2.3-1.1 4.3-2.8 5.7-5.2 1.1-1.9 1.6-4 1.7-6.1.1-4.5-2.2-8.9-6.3-11.3z"></path><path d="M38.887 15.376c-6.5 0-11.8 4.9-12.6 11.2v8.8l5.6 3.2v-8.8c.7-6.3 3.2-12.8 9.7-12.8 2.3 0 4.8 1 6.5 1.8l-2-1.1c-1.6-1-4.5-2.3-7.2-2.3M2.787 55.076c3.2 5.6 10.2 7.8 16 5.3l7.6-4.4v-6.5l-7.7 4.5c-5.8 2.5-12.7 3.6-16-2-1.1-2-1.5-4.6-1.7-6.6v2.3c.2 2 .5 5.2 1.8 7.4M55.287 66.576c3.3-5.6 1.7-12.7-3.4-16.5l-7.6-4.4-5.6 3.2 7.7 4.4c5.1 3.8 9.5 9.2 6.3 14.8-1.1 2-3.2 3.6-4.8 4.8l2-1.1c1.5-1.1 4.1-3 5.4-5.2" opacity="0.6"></path></svg>
);