import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts.js';
import portfolioRouter from './routes/portfolio.js';
import experiencesRouter from './routes/experiences.js';
import servicesRouter from './routes/services.js';
import categoriesRouter from './routes/categories.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Avni Portfolio Backend API',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/contacts', contactsRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/categories', categoriesRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 Server is running!');
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log(`📧 Contacts API: http://localhost:${PORT}/api/contacts`);
    console.log('\n✨ Ready to accept requests!\n');
});

export default app;
