//type definitions for all functions
export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    deepdivesPerPage?: number;
};

//handles all routing
const siteConfig: SiteConfig = {
    title: '',
    description: 'Documenting My Journey',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'DevLogs',
            href: '/devlogs'
        },
        {
            text: 'Tags',
            href: '/tags'
        },
        {
            text:'Figuring It Out',
            href:'/figuringitout'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        },
    ],
    socialLinks: [
        {
            text: 'Github',
            href: 'https://github.com/EvilGenius1010'
        },
        {
            text: 'X',
            href: 'https://x.com/cheksnbuks10'
        },
        {
            text:'LinkedIn',
            href:'https://www.linkedin.com/in/harshavardhan-kolhatkar-0b2636258/'
        }
    ],
    hero: {
        title: 'Writing About Software Development.',
        text: "I'm **Harshavardhan Kolhatkar**, an aspiring web developer based in Bengaluru,India. This is a blog where I'm gonna post daily progress in my projects. Also gonna post about cool stuff what I think from time to time. Feel free to explore some of my coding endeavors on <a href='https://github.com/EvilGenius1010'>GitHub</a> or follow me on <a href='https://twitter.com/justgoodui'>Twitter/X</a>.",
        image: {
            src: '/hero.jpeg',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: `Subscribe to HK's Newsletter`,
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    deepdivesPerPage: 8
};

export default siteConfig;
