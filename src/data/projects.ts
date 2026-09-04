export type ProjectTier = 1 | 2 | 3;

export interface Project {
  id: string;
  title: string;
  type: string;
  tier: ProjectTier;
  year?: string;
  shortDescription: string;
  technologies: string[];
  featuredImage: string;
  galleryImages?: string[];
  mobileImages?: string[];
  desktopImages?: string[];
  liveUrl?: string;
  designUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    architecture?: string;
    impact: string;
    challenges?: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'aquasmart',
    title: 'AquaSmart Dashboard',
    type: 'AI-Powered Water Analytics Platform',
    tier: 1,
    year: '2025',
    shortDescription:
      'An intelligent web platform monitoring real-time municipal water consumption, detecting anomalies with AI, and visualizing massive time-series sensor telemetry.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Recharts', 'TypeScript', 'Figma'],
    featuredImage: '/projects/hero-aquasmart.png',
    galleryImages: [
      '/projects/hero-aquasmart.png',
      '/projects/AquaSmart/img1.png',
      '/projects/AquaSmart/img2.png',
      '/projects/AquaSmart/img3.png',
      '/projects/AquaSmart/img4.png',
      '/projects/AquaSmart/img5.png',
    ],
    mobileImages: [
      '/projects/AquaSmart/img phone 1.webp',
      '/projects/AquaSmart/img phone 2.webp',
    ],
    liveUrl: 'https://aquasmart-ai.vercel.app/',
    githubUrl: 'https://github.com/SayedNada74/aquasmart-ai',
    caseStudy: {
      problem:
        'Organizations struggle to monitor massive volumes of water consumption data and identify leaks or anomalies in real-time before costly damage occurs.',
      solution:
        'Engineered an enterprise analytics dashboard that aggregates telemetry data, runs anomaly detection models, and serves interactive visualizations.',
      architecture:
        'Built with Next.js SSR for rapid loading, custom Recharts visualizers, and responsive layout systems tested across mobile and desktop viewports.',
      impact:
        'Cut anomaly detection response times from hours to seconds with clear visual alerts and automated reporting.',
    },
  },
  {
    id: 'sinai-tech-portal',
    title: 'Sinai Tech Portal',
    type: 'Academic Portal & Resource Hub',
    tier: 1,
    year: '2025',
    shortDescription:
      'A comprehensive educational portal serving students and faculty at Sinai University with real-time academic resources, schedules, and developer documentation.',
    technologies: ['React', 'TypeScript', 'CSS Modules', 'REST APIs', 'Supabase'],
    featuredImage: '/projects/hero-sinai-portal.png',
    galleryImages: [
      '/projects/hero-sinai-portal.png',
      '/projects/Sinai-Tech-Portal/image1.png',
      '/projects/Sinai-Tech-Portal/image2.png',
      '/projects/Sinai-Tech-Portal/image3.png',
      '/projects/Sinai-Tech-Portal/image4.png',
      '/projects/Sinai-Tech-Portal/image5.png',
    ],
    mobileImages: ['/projects/Sinai-Tech-Portal/img phone 1.webp'],
    liveUrl: 'https://sinai-tech-portal.vercel.app/',
    githubUrl: 'https://github.com/SayedNada74/sinai-tech-portal',
    caseStudy: {
      problem:
        'Faculty students lacked a unified digital portal to access technical courses, schedules, and university announcements smoothly on mobile and desktop.',
      solution:
        'Architected a lightning-fast web hub with responsive navigation, instant search, and real-time updates for over hundreds of active students.',
      impact:
        'Elevated student engagement and centralized critical academic workflows into a single cohesive interface.',
    },
  },
  {
    id: 'grand-cafe',
    title: 'Grand Cafe Platform',
    type: 'E-Commerce & Digital Menu Experience',
    tier: 1,
    year: '2024',
    shortDescription:
      'An interactive digital ordering system and dynamic menu application crafted for a luxury café, featuring fluid animations and tactile product presentation.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Responsive UI'],
    featuredImage: '/projects/hero-grandcafe.png',
    galleryImages: [
      '/projects/hero-grandcafe.png',
      '/projects/Grand Cafe/img1.png',
      '/projects/Grand Cafe/img2.png',
      '/projects/Grand Cafe/img3.png',
    ],
    mobileImages: ['/projects/Grand Cafe/img phone 1.webp'],
    liveUrl: 'https://grand-cafe.vercel.app/',
    githubUrl: 'https://github.com/SayedNada74/Grand-Cafe',
    caseStudy: {
      problem:
        'Traditional static digital menus lacked interactive appeal, ordering speed, and seamless mobile responsiveness for customer tables.',
      solution:
        'Engineered a fluid, appetizing digital menu with real-time filtering, instant item previews, and frictionless mobile ordering flow.',
      impact:
        'Enhanced customer ordering speed and delivered a premium hospitality digital presence.',
    },
  },
  {
    id: 'buildify-website',
    title: 'Buildify Studio Website',
    type: 'Modern Architecture & Construction Firm',
    tier: 2,
    year: '2024',
    shortDescription:
      'A high-conversion landing page and interactive showcase for an architectural firm with bold typography and smooth layout reveals.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design'],
    featuredImage: '/projects/hero-buildify.png',
    galleryImages: [
      '/projects/hero-buildify.png',
      '/projects/Buildify Website/img1.png',
      '/projects/Buildify Website/img2.png',
      '/projects/Buildify Website/img3.png',
      '/projects/Buildify Website/img4.png',
    ],
    liveUrl: 'https://buildify-studio.vercel.app/',
    githubUrl: 'https://github.com/SayedNada74/Buildify',
  },
  {
    id: 'ziko-portfolio',
    title: 'Ziko Portfolio',
    type: 'Interactive Creative Developer Portfolio',
    tier: 2,
    year: '2024',
    shortDescription:
      'A bespoke portfolio experience highlighting smooth scroll physics, custom typography, and dynamic WebGL shaders.',
    technologies: ['React', 'Three.js', 'Lenis Scroll', 'Tailwind CSS'],
    featuredImage: '/projects/hero-ziko.png',
    galleryImages: [
      '/projects/hero-ziko.png',
      '/projects/ziko-portfolio/img1.png',
      '/projects/ziko-portfolio/img2.png',
      '/projects/ziko-portfolio/img3.png',
      '/projects/ziko-portfolio/img4.png',
    ],
    liveUrl: 'https://ziko-portfolio-seven.vercel.app/',
    githubUrl: 'https://github.com/SayedNada74/ziko-portfolio',
  },
  {
    id: 'aquasmart-ui',
    title: 'AquaSmart App UI/UX',
    type: 'Mobile App Design System',
    tier: 3,
    year: '2025',
    shortDescription:
      'Complete end-to-end mobile design system in Figma for the AquaSmart ecosystem, featuring dark mode telemetry and consumer usage metrics.',
    technologies: ['Figma', 'Mobile UI', 'Prototyping', 'Design Tokens'],
    featuredImage: '/projects/hero-aquasmart-ui.png',
    galleryImages: [
      '/projects/hero-aquasmart-ui.png',
      '/projects/AquaSmart App UI/1.png',
      '/projects/AquaSmart App UI/2.png',
      '/projects/AquaSmart App UI/3.png',
      '/projects/AquaSmart App UI/4.png',
      '/projects/AquaSmart App UI/5.png',
      '/projects/AquaSmart App UI/6.png',
    ],
    designUrl: 'https://www.figma.com/design/1eeKfGbPhuLfHzFZf2gVUs/AquaSmart-App-UI',
  },
  {
    id: 'food-app-ui',
    title: 'Food Delivery Mobile UI',
    type: 'Mobile Application Prototype',
    tier: 3,
    year: '2024',
    shortDescription:
      'A vibrant, user-centric mobile UI design with high-fidelity prototypes, interactive checkout flows, and custom iconography.',
    technologies: ['Figma', 'UI Design', 'Wireframing', 'User Flows'],
    featuredImage: '/projects/hero-food-ui.png',
    galleryImages: [
      '/projects/hero-food-ui.png',
      '/projects/Food App UI/1.png',
      '/projects/Food App UI/2.png',
      '/projects/Food App UI/3.png',
      '/projects/Food App UI/4.png',
      '/projects/Food App UI/5.png',
      '/projects/Food App UI/6.png',
      '/projects/Food App UI/7.png',
    ],
    designUrl: 'https://www.figma.com/design/2P5s1k8Y6FCfxqGOGveXb1/Food-App-UI',
  },
  {
    id: 'sinai-tech-portal-ui',
    title: 'Sinai Tech Portal UI Blueprint',
    type: 'Web Portal Design System',
    tier: 3,
    year: '2025',
    shortDescription:
      'The foundational design blueprints and reusable Figma component library for Sinai Tech Portal.',
    technologies: ['Figma', 'Web Design', 'Design Systems'],
    featuredImage: '/projects/hero-sinai-portal-ui.png',
    galleryImages: [
      '/projects/hero-sinai-portal-ui.png',
      '/projects/Sinai-Tech-Portal UI/1.webp',
      '/projects/Sinai-Tech-Portal UI/2.webp',
      '/projects/Sinai-Tech-Portal UI/3.webp',
      '/projects/Sinai-Tech-Portal UI/4.webp',
      '/projects/Sinai-Tech-Portal UI/5.webp',
      '/projects/Sinai-Tech-Portal UI/6.webp',
      '/projects/Sinai-Tech-Portal UI/7.webp',
      '/projects/Sinai-Tech-Portal UI/8.webp',
    ],
    designUrl: 'https://www.figma.com/design/fhQGg86bQ5MVpPLNONXJ33/Sinai-Tech-Portal-UI',
  },
  {
    id: 'buildify-post-ui',
    title: 'Buildify Post Templates',
    type: 'Marketing & Brand Kit Design',
    tier: 3,
    year: '2024',
    shortDescription:
      'High-impact social media, branding, and promotional design templates for Buildify Studio.',
    technologies: ['Figma', 'Branding', 'Typography'],
    featuredImage: '/projects/hero-buildify-post-ui.png',
    galleryImages: [
      '/projects/hero-buildify-post-ui.png',
      '/projects/Buildify Post UI/1.png',
      '/projects/Buildify Post UI/2.png',
      '/projects/Buildify Post UI/3.png',
      '/projects/Buildify Post UI/4.png',
      '/projects/Buildify Post UI/5.png',
      '/projects/Buildify Post UI/6.png',
    ],
    designUrl: 'https://www.figma.com/design/gxb3xa8ldrILRlpe0FRJCv/Buildify-Post-Templete',
  },
  {
    id: 'skill-swap-hub-ui',
    title: 'Skill Swap Hub UI',
    type: 'Peer-to-Peer Knowledge Platform',
    tier: 3,
    year: '2024',
    shortDescription:
      'Comprehensive design system connecting learners and experts to swap skills with real-time session booking and rating cards.',
    technologies: ['Figma', 'UX Research', 'Prototyping'],
    featuredImage: '/projects/hero-skillswap-ui.png',
    galleryImages: [
      '/projects/hero-skillswap-ui.png',
      '/projects/Skill Swap Hub UI/1.png',
      '/projects/Skill Swap Hub UI/2.png',
      '/projects/Skill Swap Hub UI/3.png',
      '/projects/Skill Swap Hub UI/4.png',
      '/projects/Skill Swap Hub UI/5.png',
    ],
    designUrl: 'https://www.figma.com/design/HTAjG3JNtcruHLyh3Q7Tl4/Skill-Swap-Hub',
  },
];
