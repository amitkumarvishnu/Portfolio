export const personalInfo = {
  name: "Amit Kumar Vishnu",
  role: ["Full Stack Developer", "React.js Developer", "Next.js", "JavaScript", "TypeScript", "Node.js Engineer", "Express.js", "MongoDB", "MySQL"],
  email: "amitkumarvishnu0702@gmail.com",
  phone: "+91-8340632694",
  location: "Dehradun, India",
  linkedin: "https://www.linkedin.com/in/amitkumarvishnu", // replace with actual
  github: "https://github.com/amitkumarvishnu", // replace with actual
  bio: "Full Stack Developer at smartData Enterprises with hands-on experience building scalable real-time platforms, multi-vendor e-commerce systems, and enterprise admin portals. I turn complex business requirements into clean, production-grade code — 50+ APIs shipped, 99.9% uptime maintained.",
  shortBio: "I build fast, reliable, full-stack web apps with React & Node.js.",
  available: true,
  cvUrl: "/Amit_Kumar_Vishnu.pdf", // place your CV PDF in public/
};

export const stats = [
  { number: 50, suffix: "+", label: "APIs Shipped" },
  { number: 3, suffix: "", label: "Production Apps" },
  { number: 95, suffix: "%", label: "Client Satisfaction" },
];

export const experience = [
  {
    company: "smartData Enterprises (India) Ltd.",
    role: "Software Analyst — Full Stack Developer",
    duration: "Sep 2024 – Present",
    location: "Dehradun, India",
    points: [
      "Architected and shipped 50+ secure RESTful APIs (JWT-authenticated) across 3 production applications, achieving 99.9% uptime.",
      "Drove 35% increase in user engagement by integrating Socket.IO real-time features.",
      "Integrated PayPal, Stripe, and PayFast payment gateways end-to-end including webhook handling — zero reported transaction failures.",
      "Led client requirement sessions for every project, translating business needs into technical specs with 95% client satisfaction rate.",
    ],
  },
];

export const education = [
  {
    institution: "Uttarakhand Technical University",
    college: "Roorkee Institute of Technology",
    degree: "B.Tech in Computer Science",
    duration: "2020 – 2024",
    location: "Roorkee, India",
    cgpa: "8.0 / 10.0",
  },
];

export const skills = [
  { name: "React.js", category: "Frontend", icon: "SiReact" },
  { name: "Next.js", category: "Frontend", icon: "SiNextdotjs" },
  { name: "TypeScript", category: "Frontend", icon: "SiTypescript" },
  { name: "JavaScript", category: "Frontend", icon: "SiJavascript" },
  { name: "Redux", category: "Frontend", icon: "SiRedux" },
  { name: "HTML5", category: "Frontend", icon: "SiHtml5" },
  { name: "CSS3", category: "Frontend", icon: "SiCss3" },
  { name: "Bootstrap", category: "Frontend", icon: "SiBootstrap" },
  { name: "Node.js", category: "Backend", icon: "SiNodedotjs" },
  { name: "Express.js", category: "Backend", icon: "SiExpress" },
  { name: "Socket.IO", category: "Backend", icon: "SiSocketdotio" },
  { name: "JWT Auth", category: "Backend", icon: "SiJsonwebtokens" },
  { name: "MongoDB", category: "Database", icon: "SiMongodb" },
  { name: "MySQL", category: "Database", icon: "SiMysql" },
  { name: "Firebase", category: "Database", icon: "SiFirebase" },
  { name: "AWS S3", category: "Cloud", icon: "SiAmazonaws" },
  { name: "Cloudinary", category: "Cloud", icon: "SiCloudinary" },
  { name: "Git", category: "Cloud", icon: "SiGit" },
];

export const projects = [
  {
    id: 4,
    title: "AerospaceSMS",
    subtitle: "Multi-Tenant Aerospace Safety Management System",
    duration: "Feb 2026 – Present",
    description: "Regulatory-aligned multi-tenant Safety Management System built for ICAO/FAA compliance with hazard reporting, risk assessment, investigations, corrective actions, and audit-ready reporting.",
    longDescription: [
      "Aligned stakeholders during BKO on scope, architecture, and phased delivery for a multi-tenant aerospace SMS platform.",
      "Defined security-first foundation with MFA via SMS to harden authentication and resolve email OTP reliability issues.",
      "Designed strict tenant-level data isolation with centralized governance through a Super Admin role.",
      "Implemented end-to-end safety workflow: Submission -> Review -> Risk Matrix -> Investigation (RCA) -> Corrective Action -> Sign-off -> Closure.",
      "Established RBAC roles: Super Admin, Client Admin, Safety Manager, Accountable Executive, Investigator, and Employees.",
      "Enabled confidential and anonymous reporting with legal identity reveal restricted to Super Admin and complete audit logging.",
      "Planned automated email notifications for submissions, assignments, acknowledgements, and overdue actions.",
      "Included printable PDF reporting for regulator/government audits and a CMS homepage managed by Super Admin.",
      "Defined migration strategy from MongoDB to MariaDB (Sequelize ORM) for stronger relational reporting and scalability.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "postgresql", "Sequelize", "RBAC", "MFA"],
    category: "Full Stack",
    color: "#7dd3fc",
    mainSiteUrl: "https://main.aerospacesms.com/",
    promoSiteUrl: "https://aerospacesms.com/",
    liveUrl: "https://main.aerospacesms.com/",
    githubUrl: "",
  },
  {
    id: 1,
    title: "WindShield",
    subtitle: "Real-Time Field Service Platform",
    duration: "Nov 2025 – Jan 2026",
    description: "Scalable geo-location field service platform with real-time chat, push notifications, and live job tracking for 500+ service locations.",
    longDescription: [
      "Built scalable geo-location engine covering 500+ service locations with Firestore real-time listeners — eliminated polling latency.",
      "Engineered real-time chat system via Socket.IO + Firebase Cloud Storage handling 1,000+ daily messages with media upload, zero downtime.",
      "Deployed FCM push notification pipeline to iOS & Android cutting notification delivery from minutes to seconds.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "Firebase", "Socket.IO", "FCM"],
    category: "Full Stack",
    color: "#00ff88",
    mainSiteUrl: "",
    promoSiteUrl: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 2,
    title: "DualMarketPlace",
    subtitle: "Multi-Vendor E-Commerce Platform",
    duration: "Jun 2025 – Nov 2025",
    description: "Multi-vendor marketplace supporting customer, vendor, and admin roles with 30+ APIs, AWS S3 media storage, and vendor analytics dashboard.",
    longDescription: [
      "Designed 30+ API multi-vendor backend supporting three user roles from a single Node.js service.",
      "Cut media storage costs by 40% using AWS S3 pre-signed URLs with server-side image compression.",
      "Built vendor analytics dashboard that improved operational efficiency by 45%, validated by post-launch surveys.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS S3", "FCM"],
    category: "Full Stack",
    color: "#0088ff",
    mainSiteUrl: "",
    promoSiteUrl: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 3,
    title: "Earthworks",
    subtitle: "Enterprise Admin & Project Management Portal",
    duration: "Nov 2024 – May 2025",
    description: "Enterprise RBAC admin panel for 200+ administrators with role-gated views, secure file upload APIs, and lazy-load optimized UI.",
    longDescription: [
      "Developed RBAC admin panel in React.js serving 200+ administrators — zero unauthorized data access incidents.",
      "Integrated 20+ APIs with secure Formidable-based file upload validation.",
      "Boosted UI performance through lazy loading, cutting initial page load time noticeably in production.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Formidable"],
    category: "Full Stack",
    color: "#ff6b35",
    mainSiteUrl: "",
    promoSiteUrl: "",
    liveUrl: "",
    githubUrl: "",
  },
];
