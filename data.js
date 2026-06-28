const portfolioData = {
    personal: {
        name: "Sayed Nada",
        title: "Full-Stack Developer & UI/UX Designer",
        age: 22,
        location: "Ismailia, Egypt",
        phone: "01206620678",
        whatsapp: "01040246598",
        education: {
            university: "Sinai University",
            faculty: "Faculty of Computers and Information",
            duration: "2022 - 2026"
        },
        about: "I'm a 22-year-old Full-Stack Developer and UI/UX Designer from Ismailia, Egypt. I am currently studying at Sinai University, Faculty of Computers and Information (Class of 2022 - 2026). I have a strong passion for designing and building interactive, high-performance web and mobile applications. By bridging the gap between elegant UI/UX designs and robust backend logic, I create applications that look premium and work flawlessly.",
        email: "sayedmahmouda00@gmail.com",
        github: "https://github.com/SayedNada74",
        linkedin: "https://linkedin.com/in/sayed-nada-6852b9345",
        profileImage: "Profile.jpeg" // Placed in portfolio folder
    },
    currently: {
        title: "What I'm Doing Now",
        subtitle: "A snapshot of my current focus, learning path, and side projects.",
        description: "Currently, I am heavily focused on upgrading my backend engineering capabilities while expanding my frontend skills. I am actively learning modern technologies and tools, and dedicating this period to building highly-scalable, interactive, and real-world side projects.",
        focusItems: [
            { title: "Backend Deep-Dive", detail: "Enhancing RESTful APIs, database schema optimizations, and server security.", status: "Upgrading", icon: "⚙️" },
            { title: "Frontend Innovation", detail: "Mastering Next.js, advanced CSS layout systems, and 3D web animations (Three.js).", status: "Refining", icon: "💻" },
            { title: "Modern Tools & Tech", detail: "Learning cloud deployment pipelines, serverless functions, and AI APIs.", status: "Learning", icon: "🤖" },
            { title: "Building Side Projects", detail: "Creating functional, real-world projects to build a strong practical portfolio.", status: "Active", icon: "🚀" }
        ]
    },
    skills: {
        frontend: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "Advanced" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: "Advanced", invert: true },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "Advanced" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "Advanced" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", level: "Advanced" },
            { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", level: "Intermediate", invert: true },
            { name: "HTML5 & CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: "Advanced" }
        ],
        backend: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: "Advanced" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: "Advanced", invert: true },
            { name: "REST API Integration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg", level: "Advanced" },
            { name: "Prisma ORM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", level: "Advanced", invert: true },
            { name: "Firebase Service", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", level: "Advanced" },
            { name: "Supabase Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", level: "Advanced" },
            { name: "Python Sockets", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "Intermediate" }
        ],
        database: [
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: "Advanced" },
            { name: "Supabase DB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", level: "Advanced" },
            { name: "Firebase Firestore", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", level: "Advanced" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: "Intermediate" },
            { name: "Prisma Schema", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", level: "Advanced", invert: true }
        ],
        uiux: [
            { name: "Figma Prototyping", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: "Advanced" },
            { name: "User Flow Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unifiedmodelinglanguage/unifiedmodelinglanguage-original.svg", level: "Advanced" },
            { name: "Wireframing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", level: "Advanced" },
            { name: "Design Systems", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg", level: "Intermediate" }
        ]
    },
    tools: [
        {
            category: "Version Control",
            icon: "🔧",
            items: [
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true }
            ]
        },
        {
            category: "Hosting & Deployment",
            icon: "🚀",
            items: [
                { name: "Hugging Face (Backend)", emoji: "🤗" },
                { name: "Render (Services)", emoji: "🌐" },
                { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
                { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
                { name: "Firebase Hosting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
            ]
        },
        {
            category: "Development & CLI",
            icon: "💻",
            items: [
                { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
                { name: "PowerShell / Terminal", emoji: "⬛" },
                { name: "npm / npx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" }
            ]
        },
        {
            category: "AI & Productivity",
            icon: "🤖",
            items: [
                { name: "Gemini AI Expert Integration", emoji: "✨" },
                { name: "AI Coding Assistants", emoji: "🤖" },
                { name: "Figma Designs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
            ]
        }
    ],
    projects: [
        {
            title: "Moodle Calendar Sync & Course Matcher",
            category: "Frontend & API Integration",
            filter: "frontend",
            description: "A student productivity scheduler customized for Sinai University. Automatically fetches and syncs assignment deadlines, lectures, and exams from Moodle via serverless proxy functions. Features custom iCal (ICS) parsing and localized course-code matching.",
            tech: ["JavaScript (ES6)", "Vercel Serverless Functions", "CORS Proxy API", "localStorage Sync", "Tailwind CSS"],
            github: "https://github.com/SayedNada74/su-it-moodle-scheduler",
            live: "https://su-it-guide.vercel.app/",
            icon: "📅",
            details: {
                problem: "Sinai University students struggle to keep track of assignments and deadlines across multiple scattered Moodle course pages. Missing deadlines or lecture schedules was common because Moodle has a cluttered calendar system and lacks synchronization with personal mobile/desktop calendars.",
                solution: "Built an automated calendar synchronization utility using serverless proxy functions to fetch deadlines directly from Moodle. It matches courses and lets students export assignment events in standard iCal/ICS format, syncing deadlines instantly with Google Calendar, Apple Calendar, or Outlook.",
                impact: "Streamlines student organization by integrating deadlines with their daily-use calendars, reducing missing assignment rates and course tracking complexity."
            }
        },
        {
            title: "AquaSmart Dashboard & Mobile App",
            category: "Full-Stack & AI",
            filter: "fullstack",
            description: "A smart aquaculture monitoring system featuring a responsive dashboard and mobile interface. Integrates real-time water quality tracking, danger alerts, recovery notifications, and an intelligent chat system powered by the Gemini API for expert aquaculture advice.",
            tech: ["React / Next.js", "Firebase Firestore", "Gemini API", "API Key Security", "Tailwind CSS"],
            github: "https://github.com/SayedNada74/aquasmart-ai",
            live: "https://aquasmart-ai.vercel.app/",
            icon: "aquasmart logo.png",
            details: {
                problem: "Fish farmers suffer severe economic losses due to sudden changes in water quality (pH, temperature, oxygen levels) that go undetected. Furthermore, access to expert aquaculture diagnostic advice is costly and slow.",
                solution: "Developed a multi-tenant monitoring platform integrating real-time telemetry graphs, SMS alerts for unsafe metrics, and a recovery notification system. Embedded a smart chat assistant powered by Gemini API to provide instant, domain-specific troubleshooting advice.",
                impact: "Provides round-the-clock water health assurance and instant advisor support, minimizing fish mortality rates and modernizing farm management."
            }
        },
        {
            title: "Skill Swap Hub - Database & Portal",
            category: "Backend & Databases",
            filter: "database",
            description: "A digital hub facilitating peer-to-peer skill swapping. Built on a normalized relational database schema showcasing advanced SQL procedures, indexes for fast query performance, and seamless backend integration through Prisma ORM.",
            tech: ["PostgreSQL", "Prisma ORM", "Supabase", "Express.js", "Database Schema Design"],
            github: "#",
            live: "#",
            icon: "🔄",
            details: {
                problem: "Peer-to-peer exchange platforms struggle with poor matching performance, database bottlenecks, and data inconsistency when tracking complex multi-user skill exchanges, user reviews, and active swap schedules.",
                solution: "Formulated a fully normalized relational database schema in PostgreSQL. Implemented indexes, constraints, and optimized SQL procedures, integrating with an Express backend using Prisma ORM to ensure fast transaction safety and efficient data queries.",
                impact: "Yields sub-millisecond query response times and absolute data integrity, supporting highly scalable user match-making and smooth search features."
            }
        },
        {
            title: "Broadband Lab Network File Transfer Suite",
            category: "Network Engineering & Socket Programming",
            filter: "other",
            description: "A robust laboratory utility demonstrating standard communication protocol suites. Features reliable multi-threaded file transmission over TCP and UDP, as well as mock HTTP, FTP, and SMTP servers built from scratch using sockets.",
            tech: ["Python", "Socket Programming", "Multi-Threading", "TCP / UDP", "GUI Desktop App"],
            github: "#",
            live: "#",
            icon: "📡",
            details: {
                problem: "Simulating and understanding client-server protocols (HTTP, FTP, SMTP, socket streams) is difficult for students without low-level, direct protocol visibility and customization.",
                solution: "Engineered socket-level TCP/UDP servers and clients in Python from scratch. Implemented reliable custom packet transfer logic, sliding-window flow control simulations, and mock mail/file transfer servers with a responsive desktop control panel.",
                impact: "Created an effective educational testbed for network protocols, demonstrating low-level network performance differences and flow control principles."
            }
        },
        {
            title: "AquaSmart App UI",
            category: "UI/UX Design",
            filter: "uiux",
            description: "A high-fidelity mobile application design for the AquaSmart platform built in Figma. Visualizes the user journey, pond dashboards, real-time telemetry metrics, and the AI chatbot conversational UI.",
            tech: ["Figma", "UI/UX Design", "Wireframing", "Mobile App Prototype"],
            github: "#",
            live: "https://www.figma.com/design/1eeKfGbPhuLfHzFZf2gVUs/AquaSmart-App-UI?node-id=0-1&p=f&t=KiZj68haE2gkdwoD-0",
            icon: "aquasmart logo.png",
            details: {
                problem: "The aquaculture dashboard was complex for farmers with varying technical levels, requiring a layout that is both visually engaging and accessible in high-sunlight outdoor environments.",
                solution: "Designed a high-contrast, modern dark-mode mobile interface in Figma. Structured a clean visual hierarchy prioritizing vital status indicators, telemetry charts, and chatbot controls, with custom icons and simple navigation.",
                impact: "Achieved user approval for high usability, readability, and immediate warning recognition, streamlining mobile daily operations."
            }
        },
        {
            title: "Skill Swap Hub UI",
            category: "UI/UX Design",
            filter: "uiux",
            description: "Comprehensive UI/UX design system and mockups for the Skill Swap Hub web portal. Focuses on user onboarding, search discovery, skill match flows, and profile dashboard layouts.",
            tech: ["Figma", "Design Systems", "Web Portal Prototyping", "User Experience (UX)"],
            github: "#",
            live: "https://www.figma.com/design/HTAjG3JNtcruHLyh3Q7Tl4/Skill-Swap-Hub?node-id=0-1&p=f&t=Mahs7VPgHmYb04tO-0",
            icon: "🎨",
            details: {
                problem: "Peer skill matching needs a fluid UI flow to build user trust, motivate community interactions, and make listings easy to browse.",
                solution: "Created a full Figma design system with clear components, active states, and prototype user flows. Visualized onboarding, chat matching, and a card-based marketplace for quick skill discovery.",
                impact: "Developed a consistent component library that speeds up frontend coding and ensures a seamless, modern web portal experience."
            }
        },
        {
            title: "ui food design",
            category: "UI/UX Design",
            filter: "uiux",
            description: "A creative mobile food ordering and delivery application design concept. Implements modern visual hierarchy, cards layouts, custom food categories, and checkout user flows.",
            tech: ["Figma", "Mobile UI Design", "Creative Layouts", "Interactive Prototypes"],
            github: "#",
            live: "https://www.figma.com/design/2P5s1k8Y6FCfxqGOGveXb1/ui-food-design?node-id=0-1&p=f&t=WsU5jIcqbiOtnnYF-0",
            icon: "🍔",
            details: {
                problem: "Standard food ordering apps often suffer from friction points during item customization and checkout, leading to cart abandonment.",
                solution: "Designed a vibrant, micro-animated mobile layout emphasizing visual food hierarchy, smooth additions to cart, step-by-step custom order building, and a clean checkout layout.",
                impact: "Promotes high user engagement through beautiful visual cards, simplified navigation, and intuitive product customization."
            }
        }
    ]
};

// Export to window object for browser access
window.portfolioData = portfolioData;
