# Avni Portfolio Backend

Backend API server for the Avni Portfolio website with PostgreSQL database integration.

## Features

- 📧 Contact form submissions storage
- 🗄️ PostgreSQL database with Neon
- 🔒 Input validation and sanitization
- 🌐 CORS-enabled API
- ✅ Health check endpoint

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual database connection string.

### 3. Initialize Database

Run the database initialization script to create tables:

```bash
npm run init-db
```

This will:
- Connect to your Neon PostgreSQL database
- Create the `contacts` table
- Set up indexes and constraints

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```

Returns server status.

### Submit Contact Form
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

### Get All Contacts (Admin)
```
GET /api/contacts?limit=50&offset=0
```

### Get Single Contact
```
GET /api/contacts/:id
```

### Delete Contact (Admin)
```
DELETE /api/contacts/:id
```

## Database Schema

### Contacts Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Sender name |
| email | VARCHAR(255) | Sender email |
| message | TEXT | Message content |
| submitted_at | TIMESTAMP | Submission timestamp |
| ip_address | VARCHAR(45) | Sender IP |
| user_agent | TEXT | Browser info |

## Project Structure

```
server/
├── config/
│   └── database.js      # PostgreSQL connection pool
├── db/
│   ├── schema.sql       # Database schema
│   └── init.js          # Database initialization script
├── middleware/
│   └── validator.js     # Input validation middleware
├── routes/
│   └── contacts.js      # Contact API routes
├── index.js             # Express server entry point
├── package.json
├── .env.example         # Environment variables template
└── README.md
```

## Security

- All inputs are validated and sanitized
- Database queries use parameterized statements (SQL injection protection)
- CORS configured for specific frontend origin
- Email validation with regex patterns
- SSL/TLS enabled for database connections

## Error Handling

The API returns consistent JSON responses:

Success:
```json
{
  "success": true,
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "message": "Error description"
}
```
