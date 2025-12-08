import express from 'express';
import pool from '../config/database.js';
import { validateContactForm, handleValidationErrors } from '../middleware/validator.js';

const router = express.Router();

/**
 * POST /api/contacts
 * Submit a new contact form
 */
router.post('/', validateContactForm, handleValidationErrors, async (req, res) => {
    const { name, email, message } = req.body;

    // Get IP address and user agent
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        const result = await pool.query(
            `INSERT INTO contacts (name, email, message, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, submitted_at`,
            [name, email, message, ipAddress, userAgent]
        );

        const contact = result.rows[0];

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                submittedAt: contact.submitted_at
            }
        });

        console.log(`✉️  New contact form submission from ${name} (${email})`);

    } catch (error) {
        console.error('Error saving contact:', error);

        // Check for specific database errors
        if (error.code === '23514') { // Check constraint violation
            return res.status(400).json({
                success: false,
                message: 'Validation error: Please check your input'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again later.'
        });
    }
});

/**
 * GET /api/contacts
 * Get all contact submissions (admin endpoint)
 */
router.get('/', async (req, res) => {
    try {
        const { limit = 50, offset = 0 } = req.query;

        const result = await pool.query(
            `SELECT id, name, email, message, submitted_at
       FROM contacts
       ORDER BY submitted_at DESC
       LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const countResult = await pool.query('SELECT COUNT(*) FROM contacts');
        const total = parseInt(countResult.rows[0].count);

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: offset + result.rows.length < total
            }
        });

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
});

/**
 * GET /api/contacts/:id
 * Get a single contact by ID
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM contacts WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact'
        });
    }
});

/**
 * DELETE /api/contacts/:id
 * Delete a contact by ID (admin endpoint)
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM contacts WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact'
        });
    }
});

export default router;
