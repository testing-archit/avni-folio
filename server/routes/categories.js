import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/categories
 * Get all categories
 */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM categories ORDER BY display_order`
        );

        res.json({
            success: true,
            data: result.rows.map(row => row.name)
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
});

export default router;
