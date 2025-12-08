import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import {
    Navbar,
    ProjectCard,
    ExperienceCard,
} from './components/ui';

import {
    AboutSection,
    ContactSection,
    ExperienceSection,
    Footer,
    HeroSection,
    PortfolioSection,
    ServicesSection,
} from './components/sections';

import { categories, portfolioItems, experiences } from './data/constants';

export default function App() {
    const [filter, setFilter] = useState("All");

    const filteredItems =
        filter === "All"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === filter);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
            <Toaster />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ExperienceSection experiences={experiences} />
            <PortfolioSection
                categories={categories}
                filter={filter}
                setFilter={setFilter}
                filteredItems={filteredItems}
            />
            <ServicesSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
