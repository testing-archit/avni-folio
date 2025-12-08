import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/portfolio
 * Get all portfolio items with optional category filter
 */
router.get('/', async (req, res) => {
    const { category } = req.query;

    try {
        let query = `
      SELECT 
        p.id,
        p.title,
        p.slug,
        c.name as category,
        p.icon,
        p.description,
        p.color_from,
        p.color_to,
        p.page_reference,
        p.hero_image,
        ARRAY_AGG(pt.tag_name) FILTER (WHERE pt.tag_name IS NOT NULL) as tags
      FROM portfolio_items p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN portfolio_tags pt ON p.id = pt.portfolio_item_id
    `;

        const params = [];

        if (category && category !== 'All') {
            query += ' WHERE c.slug = $1';
            params.push(category.toLowerCase().replace(/\s+/g, '-'));
        }

        query += `
      GROUP BY p.id, c.name
      ORDER BY p.display_order
    `;

        const result = await pool.query(query, params);

        // Format response to match frontend expectations
        const items = result.rows.map(row => ({
            id: row.id,
            title: row.title,
            slug: row.slug,
            category: row.category,
            icon: row.icon,
            description: row.description,
            tags: row.tags.filter(tag => tag !== null),
            color: `from-${row.color_from} to-${row.color_to}`,
            page: row.page_reference,
            heroImage: row.hero_image
        }));

        res.json({
            success: true,
            data: items
        });

    } catch (error) {
        console.error('Error fetching portfolio items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch portfolio items'
        });
    }
});

/**
 * GET /api/portfolio/:id
 * Get single portfolio item by ID with full case study content
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid portfolio ID'
        });
    }

    try {
        const result = await pool.query(
            `SELECT 
        p.*,
        c.name as category,
        c.slug as category_slug,
        ARRAY_AGG(DISTINCT pt.tag_name) FILTER (WHERE pt.tag_name IS NOT NULL) as tags
       FROM portfolio_items p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN portfolio_tags pt ON p.id = pt.portfolio_item_id
       WHERE p.id = $1
       GROUP BY p.id, c.name, c.slug`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio item not found'
            });
        }

        const project = result.rows[0];

        // Get gallery images
        const imagesResult = await pool.query(
            `SELECT id, image_url, caption, display_order, is_hero
       FROM portfolio_images
       WHERE portfolio_item_id = $1
       ORDER BY display_order`,
            [id]
        );

        res.json({
            success: true,
            data: {
                ...project,
                images: imagesResult.rows,
                color: {
                    from: project.color_from,
                    to: project.color_to,
                    gradient: `from-${project.color_from} to-${project.color_to}`
                }
            }
        });

    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch portfolio item'
        });
    }
});

/**
 * GET /api/portfolio/slug/:slug
 * Get single portfolio item by slug
 */
router.get('/slug/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        const result = await pool.query(
            `SELECT 
        p.*,
        c.name as category,
        c.slug as category_slug,
        ARRAY_AGG(DISTINCT pt.tag_name) FILTER (WHERE pt.tag_name IS NOT NULL) as tags
       FROM portfolio_items p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN portfolio_tags pt ON p.id = pt.portfolio_item_id
       WHERE p.slug = $1
       GROUP BY p.id, c.name, c.slug`,
            [slug]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio item not found'
            });
        }

        const project = result.rows[0];

        // Get gallery images
        const imagesResult = await pool.query(
            `SELECT id, image_url, caption, display_order, is_hero
       FROM portfolio_images
       WHERE portfolio_item_id = $1
       ORDER BY display_order`,
            [project.id]
        );

        res.json({
            success: true,
            data: {
                ...project,
                images: imagesResult.rows,
                color: {
                    from: project.color_from,
                    to: project.color_to,
                    gradient: `from-${project.color_from} to-${project.color_to}`
                }
            }
        });

    } catch (error) {
        console.error('Error fetching portfolio item by slug:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch portfolio item'
        });
    }
});

/**
 * GET /api/portfolio/:id/next
 * Get next project for navigation
 */
router.get('/:id/next', async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid portfolio ID'
        });
    }

    try {
        // Get next project (circular - wraps to first if at end)
        const result = await pool.query(
            `SELECT id, title, slug, hero_image, color_from, color_to
       FROM portfolio_items
       WHERE id > $1
       ORDER BY id
       LIMIT 1`,
            [id]
        );

        let nextProject;

        if (result.rows.length === 0) {
            // Wrap to first project
            const firstResult = await pool.query(
                `SELECT id, title, slug, hero_image, color_from, color_to
         FROM portfolio_items
         ORDER BY id
         LIMIT 1`
            );
            nextProject = firstResult.rows[0];
        } else {
            nextProject = result.rows[0];
        }

        res.json({
            success: true,
            data: nextProject
        });

    } catch (error) {
        console.error('Error fetching next project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch next project'
        });
    }
});

export default router;
