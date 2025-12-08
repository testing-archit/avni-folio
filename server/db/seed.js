import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

// Data from constants.js
const categories = [
    { name: 'All', slug: 'all', display_order: 0 },
    { name: 'Logos', slug: 'logos', display_order: 1 },
    { name: 'Events', slug: 'events', display_order: 2 },
    { name: 'Advertising', slug: 'advertising', display_order: 3 },
    { name: 'Social Media', slug: 'social-media', display_order: 4 }
];

const portfolioItems = [
    {
        title: "Smart Chef",
        category: "Logos",
        icon: "Palette",
        description: "App logo design for modern cooking assistance.",
        tags: ["App Design", "Branding", "Minimalist"],
        color_from: "orange-400",
        color_to: "red-500",
        page: "Page 3",
        display_order: 1
    },
    {
        title: "Calm Zone",
        category: "Logos",
        icon: "Smartphone",
        description: "Logo for a meditation and mindfulness application.",
        tags: ["Health", "App", "Serenity"],
        color_from: "teal-400",
        color_to: "blue-500",
        page: "Page 4",
        display_order: 2
    },
    {
        title: "Mobile Next 2025",
        category: "Events",
        icon: "Calendar",
        description: "Future-tech event branding. <THE FUTURE IS HERE/>",
        tags: ["Tech", "Conference", "Futuristic"],
        color_from: "blue-600",
        color_to: "indigo-700",
        page: "Page 6",
        display_order: 3
    },
    {
        title: "Swaraj Symphony",
        category: "Events",
        icon: "Calendar",
        description: "Republic Day celebration. Unite, Celebrate, and Salute.",
        tags: ["Cultural", "Patriotic", "Poster"],
        color_from: "orange-500",
        color_to: "green-600",
        page: "Page 8",
        display_order: 4
    },
    {
        title: "Tune-E-Taal",
        category: "Events",
        icon: "Calendar",
        description: "Musical event by Student Cabinet. Love is in the air.",
        tags: ["Music", "Concert", "Night"],
        color_from: "purple-500",
        color_to: "pink-500",
        page: "Page 9",
        display_order: 5
    },
    {
        title: "ResCon 4.0",
        category: "Events",
        icon: "Layers",
        description: "Research Hackathon & Innovation Challenge.",
        tags: ["Hackathon", "Innovation", "Tech"],
        color_from: "blue-500",
        color_to: "cyan-500",
        page: "Page 12",
        display_order: 6
    },
    {
        title: "Coal Vision",
        category: "Events",
        icon: "PenTool",
        description: "Digitalized System for Ministry of Coal. Dashboard UI & Branding.",
        tags: ["UI/UX", "Government", "Digital"],
        color_from: "slate-600",
        color_to: "slate-800",
        page: "Page 14",
        display_order: 7
    },
    {
        title: "Brand Partners",
        category: "Advertising",
        icon: "Megaphone",
        description: "Promotional assets for Coca-Cola, Grabon, and Unstop.",
        tags: ["Sponsorship", "Marketing", "Corporate"],
        color_from: "red-600",
        color_to: "red-800",
        page: "Page 18",
        display_order: 8
    },
    {
        title: "Ambassador Fellowship",
        category: "Social Media",
        icon: "Share2",
        description: "Recruitment campaign posts for fellowship program.",
        tags: ["Social Media", "Hiring", "Youth"],
        color_from: "yellow-400",
        color_to: "orange-500",
        page: "Page 20",
        display_order: 9
    },
    {
        title: "Creator's Playground",
        category: "Social Media",
        icon: "Share2",
        description: "Where creativity runs wild and everyone's invited to play.",
        tags: ["Community", "Creative", "Fun"],
        color_from: "indigo-500",
        color_to: "purple-600",
        page: "Page 23",
        display_order: 10
    }
];

const experiences = [
    {
        title: "Placom Volunteer for Batch 2028",
        organization: "Career Services Center - Bennett University",
        employment_type: "Full-time",
        start_date: "2025-06-01",
        end_date: null,
        priority: 2,
        location: "Greater Noida · On-site",
        description: "Supporting the Placement Cell for Batch 2028 by coordinating communication between students and the committee. Assisting with company interactions, placement drives, and recruitment-related activities while helping peers with queries and contributing to a smooth and organized placement process.",
        color_from: "red-500",
        color_to: "red-700",
        skills: []
    },
    {
        title: "Deputy Minister of Design",
        organization: "SCSET Student Cabinet, Bennett University",
        employment_type: "Full-time",
        start_date: "2025-08-01",
        end_date: null,
        priority: 1,
        location: "Greater Noida · On-site",
        description: "Contributing to the university's creative direction by designing event visuals, branding elements, and digital content. I collaborate with various clubs and departments to maintain a consistent design identity and support campus initiatives with impactful visuals.",
        color_from: "blue-500",
        color_to: "indigo-600",
        skills: []
    },
    {
        title: "Core Team Member - Design",
        organization: "SPARK, E-Cell",
        employment_type: "Full-time",
        start_date: "2025-07-01",
        end_date: "2025-11-30",
        location: "Greater Noida · On-site",
        description: "Designed branding and promotional content for entrepreneurship-focused events and initiatives. Collaborated with the team to create visually engaging assets that supported workshops, competitions, and startup-driven activities on campus.",
        color_from: "blue-600",
        color_to: "red-600",
        skills: []
    },
    {
        title: "Junior Core Member - Design Department",
        organization: "Bennett Undergraduate Research Society",
        employment_type: "Full-time",
        start_date: "2024-11-01",
        end_date: "2025-05-31",
        location: "Greater Noida · On-site",
        description: "Contributed to the creative direction of BURS through designing visuals, branding elements, and digital content for community-driven initiatives. Collaborated with team members and mentors to support events, workshops, and outreach campaigns with impactful design assets. Gained hands-on experience in design strategy, content planning, and execution while working closely with BURS leadership to enhance communication, engagement, and community impact through thoughtful visuals.",
        color_from: "red-600",
        color_to: "slate-800",
        skills: ["Management", "Graphic Design"]
    }
];

const services = [
    {
        title: "Brand Identity",
        description: "Crafting unique logos and visual systems that define brands, like Smart Chef and Calm Zone.",
        icon: "Palette",
        color: "blue-500",
        display_order: 1
    },
    {
        title: "Event Marketing",
        description: "Designing cohesive collateral for large scale events including posters, banners, and digital displays.",
        icon: "Megaphone",
        color: "purple-500",
        display_order: 2
    },
    {
        title: "Social Media",
        description: "Creating engaging content for social platforms to drive engagement and brand awareness.",
        icon: "Share2",
        color: "pink-500",
        display_order: 3
    }
];

async function seedDatabase() {
    const client = await pool.connect();

    try {
        console.log('🌱 Starting database seeding...\n');

        await client.query('BEGIN');

        // 1. Insert Categories
        console.log('📁 Seeding categories...');
        for (const cat of categories) {
            await client.query(
                `INSERT INTO categories (name, slug, display_order)
         VALUES ($1, $2, $3)
         ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         display_order = EXCLUDED.display_order`,
                [cat.name, cat.slug, cat.display_order]
            );
        }
        console.log('✅ Categories seeded');

        // 2. Insert Portfolio Items
        console.log('\n🎨 Seeding portfolio items...');
        for (const item of portfolioItems) {
            // Get category ID
            const catResult = await client.query(
                'SELECT id FROM categories WHERE name = $1',
                [item.category]
            );
            const categoryId = catResult.rows[0]?.id;

            // Insert portfolio item
            const itemResult = await client.query(
                `INSERT INTO portfolio_items (title, category_id, icon, description, color_from, color_to, page_reference, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
                [item.title, categoryId, item.icon, item.description, item.color_from, item.color_to, item.page, item.display_order]
            );

            const portfolioId = itemResult.rows[0].id;

            // Insert tags
            for (const tag of item.tags) {
                await client.query(
                    'INSERT INTO portfolio_tags (portfolio_item_id, tag_name) VALUES ($1, $2)',
                    [portfolioId, tag]
                );
            }

            console.log(`  ✓ Added: ${item.title}`);
        }
        console.log('✅ Portfolio items seeded');

        // 3. Insert Experiences
        console.log('\n💼 Seeding experiences...');
        for (const exp of experiences) {
            // Calculate duration
            const start = new Date(exp.start_date);
            const end = exp.end_date ? new Date(exp.end_date) : new Date();
            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            let duration = '';
            if (years > 0) duration += `${years} yr${years > 1 ? 's' : ''}`;
            if (remainingMonths > 0) duration += `${duration ? ' ' : ''}${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;

            const expResult = await client.query(
                `INSERT INTO experiences (title, organization, employment_type, start_date, end_date, location, description, color_from, color_to, priority, duration)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id`,
                [exp.title, exp.organization, exp.employment_type, exp.start_date, exp.end_date, exp.location, exp.description, exp.color_from, exp.color_to, exp.priority, duration]
            );

            const experienceId = expResult.rows[0].id;

            // Insert skills
            for (const skill of exp.skills) {
                await client.query(
                    'INSERT INTO experience_skills (experience_id, skill_name) VALUES ($1, $2)',
                    [experienceId, skill]
                );
            }

            console.log(`  ✓ Added: ${exp.title}`);
        }
        console.log('✅ Experiences seeded');

        // 4. Insert Services
        console.log('\n🛠️  Seeding services...');
        for (const service of services) {
            await client.query(
                `INSERT INTO services (title, description, icon, color, display_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
                [service.title, service.description, service.icon, service.color, service.display_order]
            );
            console.log(`  ✓ Added: ${service.title}`);
        }
        console.log('✅ Services seeded');

        await client.query('COMMIT');

        console.log('\n📊 Database Summary:');
        const stats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM categories) as categories_count,
        (SELECT COUNT(*) FROM portfolio_items) as portfolio_count,
        (SELECT COUNT(*) FROM experiences) as experiences_count,
        (SELECT COUNT(*) FROM services) as services_count,
        (SELECT COUNT(*) FROM contacts) as contacts_count
    `);

        const counts = stats.rows[0];
        console.log(`  - Categories: ${counts.categories_count}`);
        console.log(`  - Portfolio Items: ${counts.portfolio_count}`);
        console.log(`  - Experiences: ${counts.experiences_count}`);
        console.log(`  - Services: ${counts.services_count}`);
        console.log(`  - Contact Forms: ${counts.contacts_count}`);

        console.log('\n✨ Database seeding completed successfully!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run seeding
seedDatabase()
    .then(() => {
        console.log('\n🎉 All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Seeding failed:', error);
        process.exit(1);
    });
