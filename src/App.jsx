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

      p[i * 3] = (Math.random() - 0.5) * 60;

      p[i * 3 + 1] = (Math.random() - 0.5) * 60;

      p[i * 3 + 2] = (Math.random() - 0.5) * 60; // Spread depth

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

      <pointsMaterial size={0.1} color="#f687b3" sizeAttenuation transparent opacity={0.3} />

    </points>

  );

}





// Soft sphere with orbital ring - elegant and feminine
function SoftSphere({ position, color, speed = 1 }) {

  const sphereRef = useRef();
  const ringRef = useRef();



  useFrame((state) => {

    const t = state.clock.getElapsedTime();

    if (sphereRef.current) {

      sphereRef.current.rotation.y = t * 0.2 * speed;

    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4 * speed;
      ringRef.current.rotation.y = t * 0.1 * speed;
    }

  });



  return (

    <SimpleFloat speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>

      <group position={position}>
        {/* Main soft sphere */}
        <mesh ref={sphereRef}>

          <sphereGeometry args={[0.8, 32, 32]} />

          <meshStandardMaterial

            color={color}

            roughness={0.2}

            metalness={0.3}
            emissive={color}
            emissiveIntensity={0.2}

          />

        </mesh>

        {/* Orbital ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.3, 0.05, 16, 50]} />
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

    </SimpleFloat>

  );

}

// Floating crystal/gem - sparkly and elegant
function FloatingCrystal({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3 * speed;
      meshRef.current.rotation.y = t * 0.5 * speed;
    }
  });

  return (
    <SimpleFloat speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
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

      <pointsMaterial size={0.05} color="#ec4899" sizeAttenuation transparent opacity={0.6} />

    </points>

  );

}

// Decorative gradient blob - modern background element
function GradientBlob({ color1, color2, position, size = 400 }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20"
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
        width: `${size}px`,
        height: `${size}px`,
        ...position
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Decorative dot pattern
function DotPattern() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
      backgroundSize: '30px 30px'
    }} />
  );
}




const HeroScene = () => {

  return (

    <div className="absolute inset-0 z-0 h-screen w-full">

      <Canvas camera={{ position: [0, 0, 6] }}>

        <color attach="background" args={['#fdf2f8']} />



        <ambientLight intensity={0.6} />

        <directionalLight position={[10, 10, 5]} intensity={1} />

        <pointLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />



        <StarBackground />



        {/* Main Hero Object - Soft Sphere with Ring */}

        <SoftSphere position={[2, 0, 0]} color="#ec4899" />



        {/* Secondary decorative objects */}

        <FloatingCrystal position={[-3, 2, -4]} color="#b76e79" speed={0.5} />

        <SoftSphere position={[-2, -3, -2]} color="#f687b3" speed={0.7} />



        <FloatingParticles />

      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-t from-pink-100/40 via-transparent to-transparent pointer-events-none" />

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

    color: "from-pink-rose-300 to-pink-rose-500",

    page: "Page 3"

  },

  {

    id: 2,

    title: "Calm Zone",

    category: "Logos",

    icon: <Smartphone className="w-8 h-8 text-white" />,

    description: "Logo for a meditation and mindfulness application.",

    tags: ["Health", "App", "Serenity"],

    color: "from-pink-200 to-pink-rose-400",

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

    color: "from-purple-300 to-pink-rose-500",

    page: "Page 6"

  },

  {

    id: 4,

    title: "Swaraj Symphony",

    category: "Events",

    icon: <Calendar className="w-8 h-8 text-white" />,

    description: "Republic Day celebration. Unite, Celebrate, and Salute.",

    tags: ["Cultural", "Patriotic", "Poster"],

    color: "from-rose-300 to-pink-rose-600",

    page: "Page 8"

  },

  {

    id: 5,

    title: "Tune-E-Taal",

    category: "Events",

    icon: <Calendar className="w-8 h-8 text-white" />,

    description: "Musical event by Student Cabinet. Love is in the air.",

    tags: ["Music", "Concert", "Night"],

    color: "from-pink-rose-400 to-pink-600",

    page: "Page 9"

  },

  {

    id: 6,

    title: "ResCon 4.0",

    category: "Events",

    icon: <Layers className="w-8 h-8 text-white" />,

    description: "Research Hackathon & Innovation Challenge.",

    tags: ["Hackathon", "Innovation", "Tech"],

    color: "from-pink-rose-300 to-purple-400",

    page: "Page 12"

  },

  {

    id: 7,

    title: "Coal Vision",

    category: "Events",

    icon: <PenTool className="w-8 h-8 text-white" />,

    description: "Digitalized System for Ministry of Coal. Dashboard UI & Branding.",

    tags: ["UI/UX", "Government", "Digital"],

    color: "from-slate-400 to-slate-600",

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

    color: "from-rose-400 to-pink-rose-700",

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

    color: "from-amber-200 to-rose-300",

    page: "Page 20"

  },

  {

    id: 10,

    title: "Creator's Playground",

    category: "Social Media",

    icon: <Share2 className="w-8 h-8 text-white" />,

    description: "Where creativity runs wild and everyone's invited to play.",

    tags: ["Community", "Creative", "Fun"],

    color: "from-purple-300 to-pink-rose-500",

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
    color: "from-pink-rose-400 to-rose-600"
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
    color: "from-pink-rose-300 to-pink-rose-600"
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
    color: "from-pink-300 to-pink-rose-600"
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
    color: "from-rose-400 to-slate-500"
  }
];



// --- UI Components ---



const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);



  return (

    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-pink-rose-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">

            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-rose-500 to-rose-gold font-['Playfair_Display']">

              AVNI'S Studio

            </span>

          </div>

          <div className="hidden md:block">

            <div className="ml-10 flex items-baseline space-x-8">

              <a href="#home" className="hover:text-pink-rose-500 transition-colors px-3 py-2 rounded-md text-sm font-medium text-slate-700">Home</a>

              <a href="#portfolio" className="hover:text-pink-rose-500 transition-colors px-3 py-2 rounded-md text-sm font-medium text-slate-700">Portfolio</a>

              <a href="#about" className="hover:text-pink-rose-500 transition-colors px-3 py-2 rounded-md text-sm font-medium text-slate-700">About</a>

              <a href="#experience" className="hover:text-pink-rose-500 transition-colors px-3 py-2 rounded-md text-sm font-medium text-slate-700">Experience</a>

              <a href="#contact" className="bg-gradient-to-r from-pink-rose-500 to-pink-rose-600 hover:from-pink-rose-600 hover:to-pink-rose-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-pink-rose-500/25">

                Contact Me

              </a>

            </div>

          </div>

          <div className="-mr-2 flex md:hidden">

            <button

              onClick={() => setIsOpen(!isOpen)}

              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-pink-rose-500 hover:bg-pink-rose-50 focus:outline-none"

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

            className="md:hidden bg-white/90 backdrop-blur-md border-b border-pink-rose-200"

          >

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              <a href="#home" className="text-slate-700 hover:text-pink-rose-500 block px-3 py-2 rounded-md text-base font-medium">Home</a>

              <a href="#portfolio" className="text-slate-700 hover:text-pink-rose-500 block px-3 py-2 rounded-md text-base font-medium">Portfolio</a>

              <a href="#about" className="text-slate-700 hover:text-pink-rose-500 block px-3 py-2 rounded-md text-base font-medium">About</a>

              <a href="#experience" className="text-slate-700 hover:text-pink-rose-500 block px-3 py-2 rounded-md text-base font-medium">Experience</a>

              <a href="#contact" className="text-pink-rose-500 block px-3 py-2 rounded-md text-base font-medium">Contact Me</a>

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

      className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-pink-rose-100 hover:border-pink-rose-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-rose-200/50"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}

    >

      <div className={`h-48 w-full bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>

        {/* Abstract Pattern Overlay */}

        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="z-10 transform group-hover:scale-110 transition-transform duration-500">

          {item.icon}

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent">

          <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>

        </div>

      </div>

      <div className="p-6">

        <div className="flex flex-wrap gap-2 mb-3">

          {item.tags.map((tag, idx) => (

            <span key={idx} className="text-xs font-semibold px-2 py-1 bg-pink-rose-100 text-pink-rose-700 rounded-full">

              {tag}

            </span>

          ))}

        </div>

        <p className="text-slate-600 text-sm mb-4">{item.description}</p>

        <button className="flex items-center text-sm font-medium text-pink-rose-600 group-hover:text-pink-rose-700 transition-colors">

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
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-pink-rose-100 hover:border-pink-rose-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-rose-200/50"
      whileHover={{ y: -5, scale: 1.01 }}
    >
      <div className={`h-24 w-full bg-gradient-to-r ${experience.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="z-10 px-6 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
          <p className="text-white/90 text-sm">{experience.organization}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-600">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-pink-rose-500" />
            {experience.duration} ({experience.durationMonths})
          </span>
          <span>•</span>
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.employmentType}</span>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{experience.description}</p>
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.skills.map((skill, idx) => (
              <span key={idx} className="text-xs font-semibold px-3 py-1 bg-pink-rose-100 text-pink-rose-700 rounded-full">
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

    <div className="min-h-screen text-slate-800 font-sans selection:bg-pink-rose-500 selection:text-white">

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


              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight font-['Playfair_Display']">

                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-rose-500 via-pink-rose-600 to-rose-gold">Avni Saini</span>

              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-8 font-normal">

                A Creative Designer specializing in Brand Identity, Event Visuals, and Digital Experiences.

              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">

                <motion.a href="#portfolio" className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base bg-gradient-to-r from-pink-rose-500 to-pink-rose-600 text-white font-bold rounded-full hover:from-pink-rose-600 hover:to-pink-rose-700 transition-all shadow-lg shadow-pink-rose-300/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>

                  See My Work

                </motion.a>

                <motion.a href="#contact" className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base border-2 border-pink-rose-500 backdrop-blur-sm text-pink-rose-800 font-semibold rounded-full hover:bg-pink-rose-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>

                  Contact Me

                </motion.a>

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

          <div className="w-6 h-10 border-2 border-pink-rose-300 rounded-full flex justify-center p-1">

            <div className="w-1 h-2 bg-pink-rose-400 rounded-full" />

          </div>

        </motion.div>

      </section>



      {/* About Section */}

      <section id="about" className="py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <GradientBlob color1="#fce7f3" color2="#f9a8d4" position={{ top: '10%', right: '-10%' }} size={500} />
        <GradientBlob color1="#fbb6ce" color2="#f472b6" position={{ bottom: '20%', left: '-15%' }} size={600} />
        <DotPattern />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-pink-rose-200 shadow-xl shadow-pink-rose-100/50"

          >

            <div className="md:flex md:gap-8 items-center">

              <div className="md:w-1/3 mb-8 md:mb-0 relative">

                <div className="aspect-square rounded-2xl bg-gradient-to-tr from-pink-rose-400 to-rose-gold flex items-center justify-center overflow-hidden shadow-2xl shadow-pink-rose-300/40">

                  {/* Profile image */}
                  <img
                    src="/profile-image.jpeg"
                    alt="Avni Saini - Designer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails to load
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-gradient-to-tr', 'from-pink-rose-400', 'to-rose-gold');
                    }}
                  />

                </div>

                {/* Decorative Elements */}

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-rose-400/20 rounded-full blur-xl"></div>

                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-gold/20 rounded-full blur-xl"></div>

              </div>

              <div className="md:w-2/3">

                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-['Playfair_Display']">About The Designer</h2>

                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Hello! I'm <span className="text-pink-rose-600 font-semibold">Avni Saini</span>,
                  a Computer Science Engineering student with a specialization in blockchain
                  and a strong passion for design. I specialize in creating visual identities
                  for college events, clubs, and emerging brands. My projects range from
                  minimalistic logos for apps like
                  <span className="text-pink-rose-600 font-semibold"> Smart Chef </span>
                  to large-scale event branding for
                  <span className="text-pink-rose-600 font-semibold"> ResCon 4.0</span>
                  and <span className="text-pink-rose-600 font-semibold"> Mobile Next</span>,
                  where I focused on building cohesive, memorable visuals.
                </p>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  I believe design is not just about how things look, but how they work and feel.
                  Every color, layout, and detail must add meaning. My goal is to create immersive
                  visual experiences that leave a lasting impact — whether it's a subtle gradient-based
                  logo, a bold event banner, or a complete brand system.
                </p>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Beyond designing, I actively participate in hackathons, communities, and
                  creative tech projects that allow me to blend aesthetics with technology.
                  With each project, I aim to tell a story that feels thoughtful, modern,
                  and uniquely crafted.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                  <div className="text-center p-4 bg-pink-rose-50 rounded-xl border border-pink-rose-100">

                    <h3 className="text-3xl font-bold text-pink-rose-600 mb-1">20+</h3>

                    <p className="text-slate-600 text-sm">Projects</p>

                  </div>

                  <div className="text-center p-4 bg-pink-rose-50 rounded-xl border border-pink-rose-100">

                    <h3 className="text-3xl font-bold text-pink-rose-600 mb-1">5+</h3>

                    <p className="text-slate-600 text-sm">Major Events</p>

                  </div>

                  <div className="text-center p-4 bg-pink-rose-50 rounded-xl border border-pink-rose-100">

                    <h3 className="text-3xl font-bold text-pink-rose-600 mb-1">100%</h3>

                    <p className="text-slate-600 text-sm">Concept to Creation</p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>



      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white/40 relative overflow-hidden">
        {/* Decorative Elements */}
        <GradientBlob color1="#f9a8d4" color2="#ec4899" position={{ top: '5%', left: '-5%' }} size={400} />
        <DotPattern />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 font-['Playfair_Display']">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-rose-500 to-rose-gold mx-auto rounded-full mb-8"></div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
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

      <section id="portfolio" className="py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <GradientBlob color1="#fbb6ce" color2="#f472b6" position={{ top: '15%', right: '-10%' }} size={450} />
        <DotPattern />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold text-slate-800 mb-4 font-['Playfair_Display']">Selected Works</h2>

            <div className="w-20 h-1 bg-gradient-to-r from-pink-rose-500 to-rose-gold mx-auto rounded-full mb-8"></div>



            {/* Filter Buttons */}

            <div className="flex flex-wrap justify-center gap-4">

              {categories.map((cat) => (

                <button

                  key={cat}

                  onClick={() => setFilter(cat)}

                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat

                    ? 'bg-gradient-to-r from-pink-rose-500 to-pink-rose-600 text-white shadow-lg shadow-pink-rose-300/40'

                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-pink-rose-600 border border-pink-rose-100'

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

      <section className="py-20 bg-gradient-to-b from-white/60 to-pink-rose-50/40 relative overflow-hidden">
        {/* Decorative Elements */}
        <GradientBlob color1="#f9a8d4" color2="#fbb6ce" position={{ top: '10%', left: '-8%' }} size={350} />
        <GradientBlob color1="#ec4899" color2="#f472b6" position={{ bottom: '10%', right: '-8%' }} size={400} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h2 className="text-3xl font-bold text-slate-800 mb-16 font-['Playfair_Display']">What I Do</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-rose-100 shadow-lg hover:shadow-xl transition-all">

              <div className="w-16 h-16 bg-pink-rose-100 text-pink-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Palette className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">Brand Identity</h3>

              <p className="text-slate-600">Crafting unique logos and visual systems that define brands, like Smart Chef and Calm Zone.</p>

            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-rose-100 shadow-lg hover:shadow-xl transition-all">

              <div className="w-16 h-16 bg-pink-rose-100 text-pink-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Megaphone className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">Event Marketing</h3>

              <p className="text-slate-600">Designing cohesive collateral for large scale events including posters, banners, and digital displays.</p>

            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-rose-100 shadow-lg hover:shadow-xl transition-all">

              <div className="w-16 h-16 bg-pink-rose-100 text-pink-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">

                <Share2 className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">Social Media</h3>

              <p className="text-slate-600">Creating engaging content for social platforms to drive engagement and brand awareness.</p>

            </motion.div>

          </div>

        </div>

      </section>



      {/* Contact Section */}

      <section id="contact" className="py-20 relative overflow-hidden">

        {/* Background Gradients */}
        <GradientBlob color1="#fce7f3" color2="#f9a8d4" position={{ top: '0%', left: '10%' }} size={500} />
        <GradientBlob color1="#fbb6ce" color2="#f472b6" position={{ bottom: '0%', right: '10%' }} size={500} />
        <DotPattern />



        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-pink-rose-200">

            <div className="grid md:grid-cols-2">

              <div className="p-8 sm:p-10 bg-gradient-to-br from-pink-rose-500 via-pink-rose-600 to-rose-gold text-white flex flex-col justify-between">

                <div>

                  <p className="text-pink-50 text-sm sm:text-base">Let's create something amazing together!</p>
                  <h2 className="text-3xl font-bold mb-4"></h2>

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



              <div className="p-10 bg-white">

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                  <div>

                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Name</label>

                    <input

                      type="text"

                      id="name"

                      className="w-full bg-white border border-pink-rose-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-rose-400 focus:border-transparent transition-all"

                      placeholder="Your Name"

                    />

                  </div>

                  <div>

                    <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>

                    <input

                      type="email"

                      id="email"

                      className="w-full bg-white border border-pink-rose-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-rose-400 focus:border-transparent transition-all"

                      placeholder="your@email.com"

                    />

                  </div>

                  <div>

                    <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Message</label>

                    <textarea

                      id="message"

                      rows={4}

                      className="w-full bg-white border border-pink-rose-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-rose-400 focus:border-transparent transition-all"

                      placeholder="Tell me about your project..."

                    />

                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-pink-rose-500 to-pink-rose-600 text-white font-bold py-3 rounded-lg hover:from-pink-rose-600 hover:to-pink-rose-700 transition-all shadow-lg shadow-pink-rose-300/30">

                    Send Message

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Footer */}

      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-rose-200 py-8">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <p className="text-slate-600 text-sm">

            © {new Date().getFullYear()} Avni Saini. All rights reserved. <br />

            <span className="text-xs text-slate-500">Designed with React, Three.js & Tailwind</span>

          </p>

        </div>

      </footer>

    </div>

  );

}

