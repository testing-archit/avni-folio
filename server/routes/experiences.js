import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/experiences
 * Get all experiences sorted by priority and date
 */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
        e.*,
        ARRAY_AGG(es.skill_name) FILTER (WHERE es.skill_name IS NOT NULL) as skills,
        CASE 
          WHEN e.end_date IS NULL THEN true
          ELSE false
        END as is_current
       FROM experiences e
       LEFT JOIN experience_skills es ON e.id = es.experience_id
       GROUP BY e.id
       ORDER BY 
         e.priority ASC,
         CASE WHEN e.end_date IS NULL THEN 0 ELSE 1 END,
         e.start_date DESC`
        );

        // Format response to match frontend expectations
        const experiences = result.rows.map(row => ({
            id: row.id,
            title: row.title,
            organization: row.organization,
            employmentType: row.employment_type,
            startDate: row.start_date,
            endDate: row.end_date,
            location: row.location,
            description: row.description,
            color: `from-${row.color_from} to-${row.color_to}`,
            duration: row.duration,
            skills: row.skills || [],
            isCurrent: row.is_current
        }));

        res.json({
            success: true,
            data: experiences
        });

    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch experiences'
        });
    }
});

/**
 * GET /api/experiences/:id
 * Get single experience
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT 
        e.*,
        ARRAY_AGG(es.skill_name) FILTER (WHERE es.skill_name IS NOT NULL) as skills
       FROM experiences e
       LEFT JOIN experience_skills es ON e.id = es.experience_id
       WHERE e.id = $1
       GROUP BY e.id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch experience'
        });
    }
});

export default router;
