import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

// Rich case study content for flagship projects
const caseStudyUpdates = [
    {
        id: 1, // Smart Chef
        slug: 'smart-chef',
        role: 'Lead Designer & Branding Specialist',
        timeline: '2 weeks',
        tools: ['Figma', 'Adobe Illustrator', 'Photoshop'],
        live_link: null,
        hero_image: '/projects/smart-chef/hero.jpg',
        content: {
            challenge: "Design a modern, approachable logo for a cooking assistance app that appeals to both novice and experienced chefs. The brand needed to convey expertise while remaining friendly and accessible.",
            process: "I conducted competitor analysis of top cooking apps, created extensive mood boards exploring different visual directions, and iterated through 15+ logo concepts. The focus was on clean lines, memorable shapes, and appetite-inducing colors that would work across all platforms.",
            solution: "The final minimalist logo features a chef's hat abstraction with a warm orange-to-red gradient, symbolizing both culinary expertise and passion for cooking. The design uses simple geometric shapes that scale perfectly from app icons to large displays.",
            blocks: [
                {
                    type: "text",
                    content: "## The Challenge\n\nSmart Chef needed a visual identity that would stand out in the crowded cooking app market while appealing to users of all skill levels."
                },
                {
                    type: "text",
                    content: "## Research & Discovery\n\nThrough competitive analysis and user research, I identified key opportunities:\n- Most cooking apps use food imagery rather than abstract concepts\n- Users respond well to warm, inviting color palettes\n- Simple, memorable logos perform better in app stores"
                },
                {
                    type: "text",
                    content: "## Design Process\n\nI explored multiple concepts ranging from literal food illustrations to abstract geometric forms. The chosen direction balanced modernity with approachability through clean lines and warm gradients."
                }
            ]
        }
    },
    {
        id: 2, // Calm Zone
        slug: 'calm-zone',
        role: 'UI/UX Designer',
        timeline: '3 weeks',
        tools: ['Figma', 'Adobe XD', 'Principle'],
        live_link: null,
        hero_image: '/projects/calm-zone/hero.jpg',
        content: {
            challenge: "Create a serene visual identity for a meditation and mindfulness application that promotes tranquility without appearing clinical or boring.",
            process: "Researched color psychology of calming blues and teals, created interactive prototypes to test user flow, and designed a complete UI system with smooth animations that enhance the mindfulness experience.",
            solution: "A cohesive design system featuring soothing teal-to-blue gradients, gentle rounded forms, and minimalist iconography. The interface uses breathing animations and smooth transitions to reinforce the app's calming purpose.",
            blocks: [
                {
                    type: "text",
                    content: "## Understanding Mindfulness Design\n\nThe app needed to feel like a peaceful sanctuary, not just another health app. Every design decision was made to reduce cognitive load and promote calmness."
                },
                {
                    type: "text",
                    content: "## Color Psychology\n\nTeal and blue hues were chosen for their scientifically-proven calming effects. The gradients create visual interest without overwhelming the senses."
                }
            ]
        }
    },
    {
        id: 7, // Coal Vision
        slug: 'coal-vision',
        role: 'Lead UI/UX Designer',
        timeline: '1 month',
        tools: ['Figma', 'Adobe Creative Suite', 'Miro'],
        live_link: null,
        hero_image: '/projects/coal-vision/hero.jpg',
        content: {
            challenge: "Transform complex government resource tracking data into an intuitive dashboard for the Ministry of Coal. The system needed to handle massive datasets while remaining accessible to non-technical users.",
            process: "Conducted stakeholder interviews with ministry officials, mapped existing workflows, created information architecture for complex data relationships, and designed a modular dashboard system with customizable widgets.",
            solution: "A comprehensive dashboard UI featuring data visualization cards, real-time resource tracking, and an intuitive navigation system. The design uses a professional dark mode with accent colors for data hierarchy, making complex information easily digestible.",
            blocks: [
                {
                    type: "text",
                    content: "## The Government Digital Challenge\n\nGovernment systems often struggle with usability. Coal Vision needed to break this pattern while maintaining the professionalism expected of official software."
                },
                {
                    type: "text",
                    content: "## Information Architecture\n\nI organized resources hierarchy into logical categories: Production, Distribution, Inventory, and Analytics. Each section uses consistent card-based layouts for easy scanning."
                },
                {
                    type: "text",
                    content: "## Data Visualization\n\nCustom charts and graphs were designed to make trends immediately apparent. Color-coding indicates status (green for normal, amber for attention needed, red for critical)."
                }
            ]
        }
    },
    {
        id: 6, // ResCon 4.0
        slug: 'rescon-4-0',
        role: 'Brand Designer & Event Marketing Lead',
        timeline: '3 weeks',
        tools: ['Figma', 'Illustrator', 'After Effects'],
        live_link: null,
        hero_image: '/projects/rescon/hero.jpg',
        content: {
            challenge: "Create cohesive branding for a large-scale research hackathon that would attract students, showcase innovation, and maintain visual consistency across 50+ collateral pieces including posters, banners, social media, and digital displays.",
            process: "Developed a vibrant brand identity centered on innovation and technology. Created a comprehensive brand guidelines document, designed templates for various formats, and collaborated with the organizing team to ensure consistent implementation across all touchpoints.",
            solution: "A dynamic brand system featuring cyan-to-blue gradients symbolizing innovation, geometric patterns representing data and research, and bold typography for impact. The visual language successfully unified promotional materials and created strong event recognition.",
            blocks: [
                {
                    type: "text",
                    content: "## Event Branding Challenge\n\nResCon 4.0 needed to compete for attention in a crowded hackathon landscape while communicating the serious nature of research-focused competition."
                },
                {
                    type: "text",
                    content: "## Visual Identity Development\n\nThe brand uses tech-forward gradients and geometric patterns to create a modern, innovative feel. Every element was designed for scalability from Instagram posts to 10-foot banners."
                },
                {
                    type: "text",
                    content: "## Comprehensive Deliverables\n\nCreated 50+ assets including:\n- Event posters and banners\n- Social media templates\n- Digital certificates\n- Sponsor packages\n- Presentation templates"
                }
            ]
        }
    }
];

// Gallery images for each project
const galleryImages = [
    // Smart Chef images
    { portfolio_item_id: 1, image_url: '/projects/smart-chef/logo-variations.jpg', caption: 'Logo variations and color exploration', display_order: 1 },
    { portfolio_item_id: 1, image_url: '/projects/smart-chef/brand-guidelines.jpg', caption: 'Brand guidelines and usage', display_order: 2 },
    { portfolio_item_id: 1, image_url: '/projects/smart-chef/mockups.jpg', caption: 'App interface mockups', display_order: 3 },

    // Calm Zone images
    { portfolio_item_id: 2, image_url: '/projects/calm-zone/ui-screens.jpg', caption: 'Main UI screens', display_order: 1 },
    { portfolio_item_id: 2, image_url: '/projects/calm-zone/color-palette.jpg', caption: 'Color palette and typography', display_order: 2 },
    { portfolio_item_id: 2, image_url: '/projects/calm-zone/prototype.jpg', caption: 'Interactive prototype flow', display_order: 3 },

    // Coal Vision images
    { portfolio_item_id: 7, image_url: '/projects/coal-vision/dashboard.jpg', caption: 'Main dashboard overview', display_order: 1 },
    { portfolio_item_id: 7, image_url: '/projects/coal-vision/data-viz.jpg', caption: 'Data visualization components', display_order: 2 },
    { portfolio_item_id: 7, image_url: '/projects/coal-vision/mobile.jpg', caption: 'Mobile responsive design', display_order: 3 },

    // ResCon 4.0 images
    { portfolio_item_id: 6, image_url: '/projects/rescon/branding.jpg', caption: 'Complete brand identity system', display_order: 1 },
    { portfolio_item_id: 6, image_url: '/projects/rescon/poster-designs.jpg', caption: 'Event poster designs', display_order: 2 },
    { portfolio_item_id: 6, image_url: '/projects/rescon/social-media.jpg', caption: 'Social media templates', display_order: 3 },
];

async function updateCaseStudies() {
    const client = await pool.connect();

    try {
        console.log('📝 Updating portfolio items with case study content...\n');

        await client.query('BEGIN');

        // Update each project
        for (const project of caseStudyUpdates) {
            await client.query(
                `UPDATE portfolio_items 
         SET slug = $1, role = $2, timeline = $3, tools = $4, live_link = $5, 
             hero_image = $6, content = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8`,
                [
                    project.slug,
                    project.role,
                    project.timeline,
                    project.tools,
                    project.live_link,
                    project.hero_image,
                    JSON.stringify(project.content),
                    project.id
                ]
            );

            console.log(`  ✓ Updated: ${project.slug}`);
        }

        console.log('\n📸 Adding gallery images...\n');

        // Add gallery images
        for (const image of galleryImages) {
            await client.query(
                `INSERT INTO portfolio_images (portfolio_item_id, image_url, caption, display_order)
         VALUES ($1, $2, $3, $4)`,
                [image.portfolio_item_id, image.image_url, image.caption, image.display_order]
            );
        }

        console.log(`  ✓ Added ${galleryImages.length} gallery images`);

        await client.query('COMMIT');

        // Show summary
        console.log('\n📊 Case Study Summary:');
        const summary = await client.query(`
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.role,
        COUNT(pi.id) as image_count
      FROM portfolio_items p
      LEFT JOIN portfolio_images pi ON p.id = pi.portfolio_item_id
      WHERE p.slug IS NOT NULL
      GROUP BY p.id, p.title, p.slug, p.role
      ORDER BY p.id
    `);

        summary.rows.forEach(row => {
            console.log(`\n  ${row.title} (/${row.slug})`);
            console.log(`    Role: ${row.role}`);
            console.log(`    Gallery: ${row.image_count} images`);
        });

        console.log('\n✨ Case study content updated successfully!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error updating case studies:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

updateCaseStudies()
    .then(() => {
        console.log('\n🎉 All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Update failed:', error);
        process.exit(1);
    });
