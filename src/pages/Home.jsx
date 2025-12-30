import React, { useState } from 'react';
import {
    AboutSection,
    ContactSection,
    ExperienceSection,
    HeroSection,
    PortfolioSection,
    ServicesSection,
} from '../components/sections';

import { categories, portfolioItems, experiences } from '../data/constants';

const Home = () => {
    const [filter, setFilter] = useState("All");

    const filteredItems =
        filter === "All"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === filter);

    return (
        <div id="home">
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
        </div>
    );
};

export default Home;
