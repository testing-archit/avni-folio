import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/services
 * Get all services
 */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM services ORDER BY display_order`
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch services'
        });
    }
});

/**
 * GET /api/services/:id
 * Get single service
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM services WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service'
        });
    }
});

export default router;
