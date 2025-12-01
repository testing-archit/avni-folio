import { 
  Palette, 
  Smartphone, 
  Calendar, 
  Megaphone, 
  Share2, 
  Layers,
  PenTool
} from 'lucide-react';

export const categories = ["All", "Logos", "Events", "Advertising", "Social Media"];

export const portfolioItems = [
  // Logos
  {
    id: 1,
    title: "Smart Chef",
    category: "Logos",
    icon: <Palette className="w-8 h-8 text-white" />,
    description: "App logo design for modern cooking assistance.",
    tags: ["App Design", "Branding", "Minimalist"],
    color: "from-orange-400 to-red-500",
    page: "Page 3"
  },
  {
    id: 2,
    title: "Calm Zone",
    category: "Logos",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    description: "Logo for a meditation and mindfulness application.",
    tags: ["Health", "App", "Serenity"],
    color: "from-teal-400 to-blue-500",
    page: "Page 4"
  },
  // Events
  {
    id: 3,
    title: "Mobile Next 2025",
    category: "Events",
    icon: <Calendar className="w-8 h-8 text-white" />,
    description: "Future-tech event branding. <THE FUTURE IS HERE/>",
    tags: ["Tech", "Conference", "Futuristic"],
    color: "from-blue-600 to-indigo-700",
    page: "Page 6"
  },
  {
    id: 4,
    title: "Swaraj Symphony",
    category: "Events",
    icon: <Calendar className="w-8 h-8 text-white" />,
    description: "Republic Day celebration. Unite, Celebrate, and Salute.",
    tags: ["Cultural", "Patriotic", "Poster"],
    color: "from-orange-500 to-green-600",
    page: "Page 8"
  },
  {
    id: 5,
    title: "Tune-E-Taal",
    category: "Events",
    icon: <Calendar className="w-8 h-8 text-white" />,
    description: "Musical event by Student Cabinet. Love is in the air.",
    tags: ["Music", "Concert", "Night"],
    color: "from-purple-500 to-pink-500",
    page: "Page 9"
  },
  {
    id: 6,
    title: "ResCon 4.0",
    category: "Events",
    icon: <Layers className="w-8 h-8 text-white" />,
    description: "Research Hackathon & Innovation Challenge.",
    tags: ["Hackathon", "Innovation", "Tech"],
    color: "from-blue-500 to-cyan-500",
    page: "Page 12"
  },
  {
    id: 7,
    title: "Coal Vision",
    category: "Events",
    icon: <PenTool className="w-8 h-8 text-white" />,
    description: "Digitalized System for Ministry of Coal. Dashboard UI & Branding.",
    tags: ["UI/UX", "Government", "Digital"],
    color: "from-slate-600 to-slate-800",
    page: "Page 14"
  },
  // Advertising
  {
    id: 8,
    title: "Brand Partners",
    category: "Advertising",
    icon: <Megaphone className="w-8 h-8 text-white" />,
    description: "Promotional assets for Coca-Cola, Grabon, and Unstop.",
    tags: ["Sponsorship", "Marketing", "Corporate"],
    color: "from-red-600 to-red-800",
    page: "Page 18"
  },
  // Social
  {
    id: 9,
    title: "Ambassador Fellowship",
    category: "Social Media",
    icon: <Share2 className="w-8 h-8 text-white" />,
    description: "Recruitment campaign posts for fellowship program.",
    tags: ["Social Media", "Hiring", "Youth"],
    color: "from-yellow-400 to-orange-500",
    page: "Page 20"
  },
  {
    id: 10,
    title: "Creator's Playground",
    category: "Social Media",
    icon: <Share2 className="w-8 h-8 text-white" />,
    description: "Where creativity runs wild and everyone's invited to play.",
    tags: ["Community", "Creative", "Fun"],
    color: "from-indigo-500 to-purple-600",
    page: "Page 23"
  }
];

import { processExperiences } from '../utils/dateUtils';

// Raw experiences data with startDate and endDate (null for present positions)
const rawExperiences = [
  {
    id: 1,
    title: "Placom Volunteer for Batch 2028",
    organization: "Career Services Center - Bennett University",
    employmentType: "Full-time",
    startDate: "2025-06-01", // Jun 2025
    endDate: null, // Present
    priority: 2, // Lower number = higher priority (appears first)
    location: "Greater Noida · On-site",
    description: "Supporting the Placement Cell for Batch 2028 by coordinating communication between students and the committee. Assisting with company interactions, placement drives, and recruitment-related activities while helping peers with queries and contributing to a smooth and organized placement process.",
    color: "from-red-500 to-red-700"
  },
  {
    id: 2,
    title: "Deputy Minister of Design",
    organization: "SCSET Student Cabinet, Bennett University",
    employmentType: "Full-time",
    startDate: "2025-08-01", // Aug 2025
    endDate: null, // Present
    priority: 1, // Lower number = higher priority (appears first)
    location: "Greater Noida · On-site",
    description: "Contributing to the university's creative direction by designing event visuals, branding elements, and digital content. I collaborate with various clubs and departments to maintain a consistent design identity and support campus initiatives with impactful visuals.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "Core Team Member - Design",
    organization: "SPARK, E-Cell",
    employmentType: "Full-time",
    startDate: "2025-07-01", // Jul 2025
    endDate: "2025-11-30", // Nov 2025
    location: "Greater Noida · On-site",
    description: "Designed branding and promotional content for entrepreneurship-focused events and initiatives. Collaborated with the team to create visually engaging assets that supported workshops, competitions, and startup-driven activities on campus.",
    color: "from-blue-600 to-red-600"
  },
  {
    id: 4,
    title: "Junior Core Member - Design Department",
    organization: "Bennett Undergraduate Research Society",
    employmentType: "Full-time",
    startDate: "2024-11-01", // Nov 2024
    endDate: "2025-05-31", // May 2025
    location: "Greater Noida · On-site",
    description: "Contributed to the creative direction of BURS through designing visuals, branding elements, and digital content for community-driven initiatives. Collaborated with team members and mentors to support events, workshops, and outreach campaigns with impactful design assets. Gained hands-on experience in design strategy, content planning, and execution while working closely with BURS leadership to enhance communication, engagement, and community impact through thoughtful visuals.",
    skills: ["Management", "Graphic Design"],
    color: "from-red-600 to-slate-800"
  }
];

// Process experiences to calculate duration and sort (Present first, then by date)
export const experiences = processExperiences(rawExperiences);


