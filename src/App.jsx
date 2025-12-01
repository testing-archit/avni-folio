import React, { useState, useRef, useEffect, useMemo } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';

import { motion, AnimatePresence } from 'framer-motion';

import { 

  Palette, 

  Smartphone, 

  Calendar, 

  Megaphone, 

  Share2, 

  Mail, 

  Linkedin, 

  Instagram, 

  ChevronRight, 

  Menu,

  X,

  Layers,

  PenTool

} from 'lucide-react';

import * as THREE from 'three';



// --- 3D Components (Custom Implementations to avoid library conflicts) ---



// Custom Float component to replace @react-three/drei Float

function SimpleFloat({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }) {

  const group = useRef();

  useFrame((state) => {

    const t = state.clock.getElapsedTime();

    if (group.current) {

        group.current.position.y = Math.sin(t * speed) * 0.2 * floatIntensity;

        group.current.rotation.x = (Math.cos(t * speed) * 0.1 * rotationIntensity);

        group.current.rotation.z = (Math.sin(t * speed) * 0.1 * rotationIntensity);

    }

  });

  return <group ref={group}>{children}</group>;

}



// Custom Stars component to replace @react-three/drei Stars

function StarBackground({ count = 2000 }) {

  const points = useMemo(() => {

    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        p[i*3] = (Math.random() - 0.5) * 60;

        p[i*3+1] = (Math.random() - 0.5) * 60;

        p[i*3+2] = (Math.random() - 0.5) * 60; // Spread depth

    }

    return p;

  }, [count]);

  

  return (

    <points>

        <bufferGeometry>

            <bufferAttribute 

              attach="attributes-position" 

              count={points.length/3} 

              array={points} 

              itemSize={3} 

            />

        </bufferGeometry>

        <pointsMaterial size={0.1} color="#ffffff" sizeAttenuation transparent opacity={0.4} />

    </points>

  );

}



function AnimatedShape({ position, color, speed = 1 }) {

  const meshRef = useRef();

  

  useFrame((state) => {

    const t = state.clock.getElapsedTime();

    if (meshRef.current) {

      meshRef.current.rotation.x = t * 0.2 * speed;

      meshRef.current.rotation.y = t * 0.3 * speed;

    }

  });



  return (

    <SimpleFloat speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

      <mesh ref={meshRef} position={position}>

        <torusKnotGeometry args={[1, 0.3, 100, 16]} />

        <meshStandardMaterial 

          color={color} 

          roughness={0.3}

          metalness={0.8}

        />

      </mesh>

    </SimpleFloat>

  );

}



function FloatingParticles({ count = 50 }) {

  const points = useMemo(() => {

    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

      p[i * 3] = (Math.random() - 0.5) * 20;

      p[i * 3 + 1] = (Math.random() - 0.5) * 20;

      p[i * 3 + 2] = (Math.random() - 0.5) * 10;

    }

    return p;

  }, [count]);



  return (

    <points>

      <bufferGeometry>

        <bufferAttribute 

          attach="attributes-position" 

          count={points.length / 3} 

          array={points} 

          itemSize={3} 

        />

      </bufferGeometry>

      <pointsMaterial size={0.05} color="#8b5cf6" sizeAttenuation transparent opacity={0.8} />

    </points>

  );

}



const HeroScene = () => {

  return (

    <div className="absolute inset-0 z-0 h-screen w-full">

      <Canvas camera={{ position: [0, 0, 6] }}>

        <color attach="background" args={['#0f172a']} />

        

        <ambientLight intensity={0.5} />

        <directionalLight position={[10, 10, 5]} intensity={1} />

        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />

        

        <StarBackground />

        

        {/* Main Hero Object */}

        <AnimatedShape position={[2, 0, 0]} color="#a855f7" />

        

        {/* Secondary decorative objects */}

        <AnimatedShape position={[-3, 2, -4]} color="#3b82f6" speed={0.5} />

        <AnimatedShape position={[-2, -3, -2]} color="#ec4899" speed={0.7} />

        

        <FloatingParticles />

      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />

    </div>

  );

};



// --- Data ---



const categories = ["All", "Logos", "Events", "Advertising", "Social Media"];



const portfolioItems = [

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



const experiences = [
  {
    id: 1,
    title: "Placom Volunteer for Batch 2028",
    organization: "Career Services Center - Bennett University",
    employmentType: "Full-time",
    duration: "Jun 2025 - Present",
    durationMonths: "7 mos",
    location: "Greater Noida · On-site",
    description: "Supporting the Placement Cell for Batch 2028 by coordinating communication between students and the committee. Assisting with company interactions, placement drives, and recruitment-related activities while helping peers with queries and contributing to a smooth and organized placement process.",
    color: "from-red-500 to-red-700"
  },
  {
    id: 2,
    title: "Deputy Minister of Design",
    organization: "SCSET Student Cabinet, Bennett University",
    employmentType: "Full-time",
    duration: "Aug 2025 - Present",
    durationMonths: "5 mos",
    location: "Greater Noida · On-site",
    description: "Contributing to the university's creative direction by designing event visuals, branding elements, and digital content. I collaborate with various clubs and departments to maintain a consistent design identity and support campus initiatives with impactful visuals.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "Core Team Member - Design",
    organization: "SPARK, E-Cell",
    employmentType: "Full-time",
    duration: "Jul 2025 - Nov 2025",
    durationMonths: "5 mos",
    location: "Greater Noida · On-site",
    description: "Designed branding and promotional content for entrepreneurship-focused events and initiatives. Collaborated with the team to create visually engaging assets that supported workshops, competitions, and startup-driven activities on campus.",
    color: "from-blue-600 to-red-600"
  },
  {
    id: 4,
    title: "Junior Core Member - Design Department",
    organization: "Bennett Undergraduate Research Society",
    employmentType: "Full-time",
    duration: "Nov 2024 - May 2025",
    durationMonths: "7 mos",
    location: "Greater Noida · On-site",
    description: "Contributed to the creative direction of BURS through designing visuals, branding elements, and digital content for community-driven initiatives. Collaborated with team members and mentors to support events, workshops, and outreach campaigns with impactful design assets. Gained hands-on experience in design strategy, content planning, and execution while working closely with BURS leadership to enhance communication, engagement, and community impact through thoughtful visuals.",
    skills: ["Management", "Graphic Design"],
    color: "from-red-600 to-slate-800"
  }
];



// --- UI Components ---



const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);



  return (

    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">

            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">

              AVNI'S Studio

            </span>

          </div>

          <div className="hidden md:block">

            <div className="ml-10 flex items-baseline space-x-8">

              <a href="#home" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Home</a>

              <a href="#portfolio" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Portfolio</a>

              <a href="#about" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">About</a>

              <a href="#experience" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Experience</a>

              <a href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/25">

                Contact Me

              </a>

            </div>

          </div>

          <div className="-mr-2 flex md:hidden">

            <button

              onClick={() => setIsOpen(!isOpen)}

              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"

            >

              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}

            </button>

          </div>

        </div>

      </div>

      

      {/* Mobile menu */}

      <AnimatePresence>

        {isOpen && (

          <motion.div 

            initial={{ opacity: 0, height: 0 }}

            animate={{ opacity: 1, height: 'auto' }}

            exit={{ opacity: 0, height: 0 }}

            className="md:hidden bg-slate-900 border-b border-white/10"

          >

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              <a href="#home" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>

              <a href="#portfolio" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Portfolio</a>

              <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>

              <a href="#experience" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Experience</a>

              <a href="#contact" className="text-purple-400 block px-3 py-2 rounded-md text-base font-medium">Contact Me</a>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>

  );

};



const ProjectCard = ({ item }) => {

  return (

    <motion.div

      layout

      initial={{ opacity: 0, scale: 0.9 }}

      animate={{ opacity: 1, scale: 1 }}

      exit={{ opacity: 0, scale: 0.9 }}

      transition={{ duration: 0.3 }}

      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"

    >

      <div className={`h-48 w-full bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>

        {/* Abstract Pattern Overlay */}

        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="z-10 transform group-hover:scale-110 transition-transform duration-500">

          {item.icon}

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/90 to-transparent">

          <h3 className="text-xl font-bold text-white">{item.title}</h3>

        </div>

      </div>

      <div className="p-6">

        <div className="flex flex-wrap gap-2 mb-3">

          {item.tags.map((tag, idx) => (

            <span key={idx} className="text-xs font-semibold px-2 py-1 bg-slate-700 text-purple-300 rounded-full">

              {tag}

            </span>

          ))}

        </div>

        <p className="text-slate-400 text-sm mb-4">{item.description}</p>

        <button className="flex items-center text-sm font-medium text-white group-hover:text-purple-400 transition-colors">

          View Project <ChevronRight className="w-4 h-4 ml-1" />

        </button>

      </div>

    </motion.div>

  );

};



const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className={`h-24 w-full bg-gradient-to-r ${experience.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="z-10 px-6 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
          <p className="text-white/90 text-sm">{experience.organization}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-400">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {experience.duration} ({experience.durationMonths})
          </span>
          <span>•</span>
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.employmentType}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{experience.description}</p>
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.skills.map((skill, idx) => (
              <span key={idx} className="text-xs font-semibold px-3 py-1 bg-slate-700 text-purple-300 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};



export default function App() {

  const [filter, setFilter] = useState("All");



  const filteredItems = filter === "All" 

    ? portfolioItems 

    : portfolioItems.filter(item => item.category === filter);



  return (

    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-purple-500 selection:text-white">

      <Navbar />



      {/* Hero Section */}

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">

        <HeroScene />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <motion.div 

              initial={{ opacity: 0, x: -50 }}

              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.8 }}

              className="text-left"

            >


              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">

                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Avni Saini</span>

              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">

                A Creative Designer specializing in Brand Identity, Event Visuals, and Digital Experiences.

              </p>

              <div className="flex flex-wrap gap-4">

                <a href="#portfolio" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">

                  See My Work

                </a>

                <a href="#contact" className="px-8 py-3 border border-white/30 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/10 transition-colors">

                  Contact Me

                </a>

              </div>

            </motion.div>

            

            {/* The 3D element acts as the visual interest on the right for desktop, 

                but we keep text readable by positioning it on the left. */}

          </div>

        </div>

        

        {/* Scroll Indicator */}

        <motion.div 

          animate={{ y: [0, 10, 0] }}

          transition={{ repeat: Infinity, duration: 1.5 }}

          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"

        >

          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">

            <div className="w-1 h-2 bg-white rounded-full" />

          </div>

        </motion.div>

      </section>



      {/* About Section */}

      <section id="about" className="py-20 bg-slate-900 relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div 

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            className="bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5"

          >

            <div className="md:flex items-center gap-12">

              <div className="md:w-1/3 mb-8 md:mb-0 relative">

                <div className="aspect-square rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden shadow-2xl">

                   {/* Profile image */}
                   <img 
                     src="/profile-image.jpeg" 
                     alt="Avni Saini - Designer" 
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       // Fallback to gradient if image fails to load
                       e.target.style.display = 'none';
                       e.target.parentElement.classList.add('bg-gradient-to-tr', 'from-purple-600', 'to-pink-600');
                     }}
                   />

                </div>

                {/* Decorative Elements */}

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>

                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>

              </div>

              <div className="md:w-2/3">

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About The Designer</h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Hello! I'm <span className="text-purple-400 font-semibold">Avni Saini</span>, 
                  a Computer Science Engineering student with a specialization in blockchain 
                  and a strong passion for design. I specialize in creating visual identities 
                  for college events, clubs, and emerging brands. My projects range from 
                  minimalistic logos for apps like 
                  <span className="text-purple-400 font-semibold"> Smart Chef </span> 
                  to large-scale event branding for 
                  <span className="text-purple-400 font-semibold"> ResCon 4.0</span> 
                  and <span className="text-purple-400 font-semibold"> Mobile Next</span>, 
                  where I focused on building cohesive, memorable visuals.
                </p>

                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  I believe design is not just about how things look, but how they work and feel. 
                  Every color, layout, and detail must add meaning. My goal is to create immersive 
                  visual experiences that leave a lasting impact — whether it's a subtle gradient-based 
                  logo, a bold event banner, or a complete brand system.
                </p>

                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Beyond designing, I actively participate in hackathons, communities, and 
                  creative tech projects that allow me to blend aesthetics with technology. 
                  With each project, I aim to tell a story that feels thoughtful, modern, 
                  and uniquely crafted.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                  <div className="text-center p-4 bg-slate-900/50 rounded-xl">

                    <h3 className="text-3xl font-bold text-white mb-1">20+</h3>

                    <p className="text-slate-400 text-sm">Projects</p>

                  </div>

                  <div className="text-center p-4 bg-slate-900/50 rounded-xl">

                    <h3 className="text-3xl font-bold text-white mb-1">5+</h3>

                    <p className="text-slate-400 text-sm">Major Events</p>

                  </div>

                  <div className="text-center p-4 bg-slate-900/50 rounded-xl">

                    <h3 className="text-3xl font-bold text-white mb-1">100%</h3>

                    <p className="text-slate-400 text-sm">Concept to Creation</p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>



      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              My professional journey and contributions to various organizations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>



      {/* Portfolio Section */}

      <section id="portfolio" className="py-20 bg-slate-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold text-white mb-4">Selected Works</h2>

            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>

            

            {/* Filter Buttons */}

            <div className="flex flex-wrap justify-center gap-4">

              {categories.map((cat) => (

                <button

                  key={cat}

                  onClick={() => setFilter(cat)}

                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${

                    filter === cat 

                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 

                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'

                  }`}

                >

                  {cat}

                </button>

              ))}

            </div>

          </div>



          <motion.div 

            layout

            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

          >

            <AnimatePresence>

              {filteredItems.map((item) => (

                <ProjectCard key={item.id} item={item} />

              ))}

            </AnimatePresence>

          </motion.div>

        </div>

      </section>



      {/* Services/Capabilities Section */}

      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl font-bold text-white mb-16">What I Do</h2>

          <div className="grid md:grid-cols-3 gap-8">

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">

              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Palette className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">Brand Identity</h3>

              <p className="text-slate-400">Crafting unique logos and visual systems that define brands, like Smart Chef and Calm Zone.</p>

            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">

              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Megaphone className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">Event Marketing</h3>

              <p className="text-slate-400">Designing cohesive collateral for large scale events including posters, banners, and digital displays.</p>

            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">

              <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Share2 className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>

              <p className="text-slate-400">Creating engaging content for social platforms to drive engagement and brand awareness.</p>

            </motion.div>

          </div>

        </div>

      </section>



      {/* Contact Section */}

      <section id="contact" className="py-20 bg-slate-950 relative overflow-hidden">

        {/* Background Gradients */}

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>



        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10">

            <div className="grid md:grid-cols-2">

              <div className="p-10 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex flex-col justify-between">

                <div>

                  <h2 className="text-3xl font-bold mb-4">Let's work together!</h2>

                  <p className="text-purple-100 mb-8">

                    Have a project in mind? I'm available for freelance work and collaborations.

                  </p>

                </div>

                <div className="space-y-4">

                  <a 
                    href="mailto:avnisixc13@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                  >

                    <Mail className="w-5 h-5 text-purple-200" />

                    <span>avnisixc13@gmail.com</span>

                  </a>

                  <a 
                    href="https://www.linkedin.com/in/avni-saini-0927a12b9/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                  >

                    <Linkedin className="w-5 h-5 text-purple-200" />

                    <span>linkedin.com/in/avni-saini</span>

                  </a>

                  <a 
                    href="https://instagram.com/damnitavni" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                  >

                    <Instagram className="w-5 h-5 text-purple-200" />

                    <span>@damnitavni</span>

                  </a>

                </div>

              </div>



              <div className="p-10 bg-slate-900">

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                  <div>

                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>

                    <input 

                      type="text" 

                      id="name" 

                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

                      placeholder="Your Name" 

                    />

                  </div>

                  <div>

                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>

                    <input 

                      type="email" 

                      id="email" 

                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

                      placeholder="your@email.com" 

                    />

                  </div>

                  <div>

                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>

                    <textarea 

                      id="message" 

                      rows={4} 

                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

                      placeholder="Tell me about your project..." 

                    />

                  </div>

                  <button type="submit" className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition-colors">

                    Send Message

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Footer */}

      <footer className="bg-slate-950 border-t border-white/5 py-8">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <p className="text-slate-500 text-sm">

            © {new Date().getFullYear()} Avni Saini. All rights reserved. <br/>

            <span className="text-xs text-slate-600">Designed with React, Three.js & Tailwind</span>

          </p>

        </div>

      </footer>

    </div>

  );

}

