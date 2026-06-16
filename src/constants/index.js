const navLinks = [
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
    // {
    //     name: "Testimonials",
    //     link: "#testimonials",
    // },
];

const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
    { value: 3, suffix: "+", label: "Years Coding Experience" },
    { value: 9, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "Open-Source Contributions" },
    { value: 10, suffix: "+", label: "Hackathons Participated" },
];

const logoIconsList = [
    {
        imgPath: "/images/logos/docker-slide.logo.png",
    },
    {
        imgPath: "/images/logos/Github-slide-logo.png",
    },
    {
        imgPath: "/images/logos/hostiger-slide-logo.png",
    },
    {
        imgPath: "/images/logos/htmlcssjs-slide-logo.png",
    },
    {
        imgPath: "/images/logos/java-slide-logo.png",
    },
    {
        imgPath: "/images/logos/mongoDB-slide-logo.png",
    },
    {
        imgPath: "/images/logos/js-slide-logo.png",
    },
    {
        imgPath: "/images/logos/nodeJs-slide-logo.png",
    },
    {
        imgPath: "/images/logos/python-slide-logo.png",
    },
    {
        imgPath: "/images/logos/react-slide-logo.png",
    },
    {
        imgPath: "/images/logos/shopify-slide-logo.png",
    },
    {
        imgPath: "/images/logos/three-slide-logo.png",
    },
    {
        imgPath: "/images/logos/versal-slide-logo.png",
    },
    {
        imgPath: "/images/logos/tailwind-slide-logo.png",
    },
];

const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Adaptability",
        desc: "Quickly adapt to new tools, APIs and project constraints.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Collaborative Teamwork",
        desc: "Contribute effectively in group projects, PRs and code reviews.",
    },
    {
        imgPath: "/images/time.png",
        title: "Rapid Learning",
        desc: "Learn libraries and frameworks fast to ship project features.",
    },
];

const techStackImgs = [
    {
        name: "Java",
        imgPath: "/images/logos/java.png",
    },
    {
        name: "PHP",
        imgPath: "/images/logos/php.png",
    },
    {
        name: "JavaScript",
        imgPath: "/images/logos/javascript.png",
        iconScale: 1.12,
    },
    {
        name: "Joomla",
        imgPath: "/images/joomla-img.png",
    },
    {
        name: "Python",
        imgPath: "/images/logos/python.svg",
    },
    {
        name: "React",
        imgPath: "/images/logos/react.png",
    },
    {
        name: "Node.js",
        imgPath: "/images/logos/node.png",
    },
    {
        name: "Three.js",
        imgPath: "/images/logos/three.png",
    },
];

const expCards = [
    {
        imgPath: "/images/gsoc-img.png",
        logoPath: "/images/gsoc-logo.png",
        title: "Google Summer of Code 2026 — Joomla",
        date: "GSoC Contributor | May 2026–Present",
        link: {
            url: "https://github.com/joomla-projects/gsoc26_translator_feedback",
            label: "See the project on GitHub →",
        },
        responsibilities: [
            "I'm a GSoC 2026 contributor building the Translator Feedback Loop extension (com_translator) for Joomla — a tool that turns translator corrections into better machine translations.",
            "It's a RAG system inspired by RLHF: corrections from the community get stored and fed back into the LLM's prompts, so translations keep getting sharper for Joomla-specific terms across 64+ languages.",
            "I built the side-by-side translation editor, per-language feedback queues, and AI-drafted translations that the community can review and refine."
        ],
    },
    {
        imgPath: "/images/joomla.png",
        logoPath: "/images/joomla-img.png",
        title: "Joomla Core Contributor & Extension Developer",
        date: "Open Source | 2025–Present",
        link: {
            url: "https://github.com/joomla/joomla-cms/pulls?q=is%3Amerged+is%3Apr+author%3Akrishnagandhicode",
            label: "See my contributed PRs →",
        },
        responsibilities: [
            "I've had 15 pull requests merged into the Joomla CMS core, working on real bug fixes, ACL security, action logs, and UI accessibility.",
            "Most of what I do is stability and accessibility work for Joomla 5.x and 6.x — tracking down crashes and edge cases, then shipping fixes that hold up in production.",
            "I'm active in the community too, joining the weekly PR testing and the global 'Pizza, Bugs and Fun' events to help get community code ready to merge."
        ],
    },
    {
        imgPath: "/images/cgc-img.png",
        img1Path: "/images/WebDev-logo.png",
        logoPath: "/images/cgc-logo.png",
        title: "B.Tech Journey",
        date: "Chandigarh Group of Colleges, Landran | 2023–2027 | CGPA: 8.29",
        responsibilities: [
            "I'm doing my B.Tech in CSE here, and it's where I really found my footing in web development — including a Front-End Web Development certification from Infosys Springboard (HTML, CSS, JS, responsive design).",
            "I've built a bunch of hands-on projects along the way, like a chatbot using Gemini AI (React + JS), a few portfolio sites, and interactive UI components.",
            "Day to day I work with React, Tailwind, JavaScript, REST APIs, and Git/GitHub, and I try to put whatever I'm learning straight into real projects."
        ],
    },
    {
        imgPath: "/images/cn-img.png",
        img1Path: "/images/DSA-img.png",
        logoPath: "/images/cn-logo.png",
        title: "Java DSA Training & Open-Source Contributions",
        date: "2024-Present",
        responsibilities: [
            "I went through a structured Data Structures & Algorithms course in Java and got comfortable with arrays, recursion, OOP, trees, graphs, and hashing.",
            "I put it to use building actual logic — like a Java Ticket Booking System — instead of just grinding problems in isolation.",
            "This is also where I started contributing to open source, picking up Git workflows, issue tracking, and collaborative engineering on the Joomla CMS."
        ],
    },
];

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },
    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
];

// Testimonials — placeholder removed; will be populated with real reviews.
const testimonials = [];


const socialImgs = [
    // {
    //     name: "insta",
    //     url: "https://www.instagram.com/",
    //     imgPath: "/images/insta.png",
    // },
    {
        name: "github",
        url: "https://github.com/krishnagandhicode",
        imgPath: "/images/github.png",
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/krishnagandhicode/",
        imgPath: "/images/linkedin.png",
    },
];

const about = {
    title: "About Me",
    subtitle: "A quick intro about who I am and what I build",
    paragraph:
        "I’m a developer focused on interactive web experiences — combining 3D, animations and responsive UI to build engaging portfolios and apps.",
    points: [
        "Frontend development with React and Three.js",
        "Building interactive 3D scenes for the web",
        "Collaboration and delivering accessible UI",
        "Continuous learning and improving code quality",
    ],
    imagePath: "/images/IMG_2149.png",
};

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    testimonials,
    socialImgs,
    techStackImgs,
    navLinks,
    about,
};