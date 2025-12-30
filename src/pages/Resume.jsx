import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Download, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';

const Resume = () => {
    return (
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-purple-500 selection:text-white pt-20">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/10"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                                Avni Saini
                            </h1>
                            <p className="text-xl text-gray-300 font-medium">Computer Science & Engineering Student</p>
                        </div>

                        <div className="mt-6 md:mt-0 flex flex-col gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                <Phone size={16} />
                                <span>+91 6397798346</span>
                            </div>
                            <a href="mailto:Avnisixc13@gmail.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                <Mail size={16} />
                                <span>Avnisixc13@gmail.com</span>
                            </a>
                            <a href="https://linkedin.com/in/avni-saini-0927a12b9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                <Linkedin size={16} />
                                <span>linkedin.com/in/avni-saini</span>
                            </a>
                            <a href="https://github.com/avni-saini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                <Github size={16} />
                                <span>github.com/avni-saini</span>
                            </a>

                            <a
                                href="/resume.pdf"
                                download="Avni_Saini_Resume.pdf"
                                className="flex items-center gap-2 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all w-fit"
                            >
                                <Download size={16} />
                                <span>Download PDF</span>
                            </a>
                        </div>
                    </div>

                    {/* Education */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <Award size={20} />
                            </span>
                            Education
                        </h2>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">B.Tech in Computer Science and Engineering</h3>
                                    <div className="text-purple-400 font-medium mt-1">Bennett University</div>
                                </div>
                                <div className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full w-fit">2024 - 2028</div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 mt-2 text-sm">
                                <MapPin size={14} />
                                Greater Noida, India
                            </div>
                        </div>
                    </section>

                    {/* Technical Skills */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                                <ExternalLink size={20} />
                            </span>
                            Technical Skills
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SkillGroup title="Programming Languages" skills={["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL", "Rust", "Dart"]} />
                            <SkillGroup title="Web Technologies" skills={["HTML", "CSS", "React", "Next.js", "Svelte", "SvelteKit"]} />
                            <SkillGroup title="Backend & APIs" skills={["Node.js", "RESTful APIs", "Flask"]} />
                            <SkillGroup title="Databases" skills={["PostgreSQL", "MySQL", "MongoDB", "Google Firebase"]} />
                            <SkillGroup title="Libraries & AI" skills={["Pandas", "NumPy", "spaCy", "scikit-learn", "TF-IDF", "Google Gemini"]} />
                            <SkillGroup title="Blockchain" skills={["Solidity", "Hardhat", "OpenZeppelin", "Ethers.js"]} />
                            <SkillGroup title="Developer Tools" skills={["Git", "GitHub", "Docker", "Vite", "npm", "LaTeX", "Sphinx", "Graphviz"]} />
                            <SkillGroup title="Design Tools" skills={["Canva", "Figma", "Tailwind CSS", "Framer Motion"]} />
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <ExternalLink size={20} />
                            </span>
                            Projects
                        </h2>
                        <div className="space-y-6">
                            <ProjectCard
                                title="Rail Ledger — Smart India Hackathon (SIH 2025)"
                                tech="Svelte, SvelteKit, Node.js, SQL, Drizzle ORM, Docker"
                                points={[
                                    "Built a centralized tracking system for railway components to monitor lifecycle, condition, and expiry, reducing accident risks.",
                                    "Implemented role-based access for users, admins, and vendors to securely view, update, and manage component data.",
                                    "Developed the frontend using Svelte and SvelteKit with a strong focus on usability and clarity.",
                                    "Shortlisted among the Top 20 teams at the university level in Smart India Hackathon 2025 (Indian Railways)."
                                ]}
                            />
                            <ProjectCard
                                title="EcoCred — Blockchain-Based Carbon Credit Management Platform"
                                tech="Solidity, Hardhat, React, Node.js, PostgreSQL, Web3"
                                points={[
                                    "Designed and deployed Ethereum smart contracts to manage carbon credits in a decentralized and transparent manner.",
                                    "Implemented ERC-20 and ERC-721 token standards with staking, DAO governance, and marketplace functionality.",
                                    "Built a full-stack Web3 application with secure authentication, role-based access, and on-chain verification.",
                                    "Deployed using Vercel with Infura/Alchemy RPC providers for blockchain interaction."
                                ]}
                            />
                            <ProjectCard
                                title="Smart Chef — AI-Based Recipe Recommendation System"
                                tech="React, TypeScript, Flask, PostgreSQL, NLP, Generative AI"
                                points={[
                                    "Developed an AI-driven platform that recommends recipes based on available ingredients and estimates cooking time.",
                                    "Applied NLP techniques such as TF-IDF, cosine similarity, and spaCy, along with Google Gemini for enhanced recommendations.",
                                    "Built RESTful APIs using Python and Flask and deployed the system using Vercel and Render."
                                ]}
                            />
                            <ProjectCard
                                title="Calm Zone — AI-Assisted Mental Wellness Platform"
                                tech="Next.js, React, PostgreSQL, Drizzle ORM, Google Gemini"
                                points={[
                                    "Created a mental wellness platform providing personalized tasks such as breathing exercises and guided thought sharing.",
                                    "Implemented mood tracking and dynamic task generation based on user input.",
                                    "Focused on calm, minimal UI/UX using Tailwind CSS and Framer Motion."
                                ]}
                            />
                            <ProjectCard
                                title="Coal Vision — Frontend Visualization Platform"
                                tech="React, TypeScript, Tailwind CSS, PostgreSQL"
                                points={[
                                    "Built a responsive and visually engaging frontend platform to visualize and manage structured data.",
                                    "Emphasized clean UI, animations, and performance optimization."
                                ]}
                            />
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                                <Calendar size={20} />
                            </span>
                            Experience & Positions of Responsibility
                        </h2>
                        <div className="space-y-6">
                            <ExperienceItem
                                role="General Secretary"
                                org="Palétto – Design Club, Bennett University"
                                period="Present"
                                points={[
                                    "Leading the university's official design club and coordinating creative initiatives."
                                ]}
                            />
                            <ExperienceItem
                                role="Deputy Minister of Design"
                                org="Student Cabinet (SCSET), Bennett University"
                                period="Present"
                                points={[
                                    "Headed design operations for Project Showcase and SIH 2025 while managing large-scale events.",
                                    "Represented the university in an official panel discussion held at Taj Palace."
                                ]}
                            />
                            <ExperienceItem
                                role="Placement Cell Volunteer (PLACOM)"
                                org="Bennett University"
                                period="Present"
                            />
                            <ExperienceItem
                                role="Design Team Member"
                                org="Mobilon, Spark E-Cell, and BURS – Bennett University"
                                period="Past"
                            />
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                                <Award size={20} />
                            </span>
                            Achievements
                        </h2>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                            <ul className="space-y-3">
                                {[
                                    "Top 20 finalist at university level in Smart India Hackathon (SIH 2025).",
                                    "Secured 3rd position in Clubs & Chapters track during Project Showcase.",
                                    "Organized and contributed to flagship university events including ResCon, Bennovate, and MobileNext."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

const SkillGroup = ({ title, skills }) => (
    <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-purple-500/30 transition-colors">
        <h3 className="text-purple-400 font-medium mb-3 text-sm uppercase tracking-wider">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="bg-slate-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const ProjectCard = ({ title, tech, points }) => (
    <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-blue-500/30 transition-colors">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <div className="text-blue-400 text-sm italic mb-4">{tech}</div>
        <ul className="space-y-2">
            {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ExperienceItem = ({ role, org, period, points }) => (
    <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-lg font-bold text-white">{role}</h3>
                <div className="text-green-400 text-sm">{org}</div>
            </div>
            <span className="text-xs font-medium bg-green-500/10 text-green-400 px-2 py-1 rounded">
                {period}
            </span>
        </div>
        {points && (
            <ul className="space-y-2 mt-4">
                {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Resume;
