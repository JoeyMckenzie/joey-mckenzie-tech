import * as React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Icon } from '@iconify/react';

const socials = [
    {
        href: 'https://github.com/joeymckenzie',
        icon: 'mdi:github',
        display: 'GitHub',
        external: 'gg:external',
    },
    {
        href: 'https://linkedin.com/in/JoeyMcKenzie',
        icon: 'mdi:linkedin',
        display: 'LinkedIn',
        external: 'gg:external',
    },
    {
        href: 'https://x.com/_joeyMcKenzie',
        icon: 'mdi:twitter',
        display: 'Twitter',
        external: 'gg:external',
    },
    {
        href: 'https://resume.joeymckenzie.tech/JoeyMcKenzie_resume.pdf',
        icon: 'carbon:identification',
        display: 'Resume',
        external: 'material-symbols:download-sharp',
    },
];

export default function SocialButtons(): React.JSX.Element {
    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-4 py-8 sm:grid-cols-4">
            {socials.map(({ display, href, icon, external }) => (
                <Link key={icon} href={href}>
                    <Button
                        className="flex w-full flex-row gap-x-2"
                        variant="outline"
                    >
                        <Icon icon={icon} className="h-5 w-5" />
                        {display}
                        <Icon icon={external} className="h-5 w-5" />
                    </Button>
                </Link>
            ))}
        </div>
    );
}
