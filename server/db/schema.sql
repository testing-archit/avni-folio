-- Portfolio Contact Form Database Schema
-- This schema creates tables for storing all portfolio content

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CONTACTS TABLE (existing)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_name CHECK (LENGTH(TRIM(name)) >= 2),
    CONSTRAINT valid_message CHECK (LENGTH(TRIM(message)) >= 10)
);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_submitted_at ON contacts(submitted_at DESC);

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- ============================================================================
-- PORTFOLIO ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    icon VARCHAR(50),
    description TEXT,
    color_from VARCHAR(50),
    color_to VARCHAR(50),
    page_reference VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_display_order ON portfolio_items(display_order);

-- ============================================================================
-- PORTFOLIO TAGS TABLE (many-to-many relationship)
-- ============================================================================
CREATE TABLE IF NOT EXISTS portfolio_tags (
    id SERIAL PRIMARY KEY,
    portfolio_item_id INTEGER REFERENCES portfolio_items(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_portfolio_tags_item ON portfolio_tags(portfolio_item_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_tags_name ON portfolio_tags(tag_name);

-- ============================================================================
-- EXPERIENCES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    employment_type VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    location VARCHAR(255),
    description TEXT,
    color_from VARCHAR(50),
    color_to VARCHAR(50),
    priority INTEGER DEFAULT 999,
    duration VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_experiences_dates ON experiences(start_date DESC, end_date DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_priority ON experiences(priority);

-- ============================================================================
-- EXPERIENCE SKILLS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS experience_skills (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_experience_skills_exp ON experience_skills(experience_id);

-- ============================================================================
-- SERVICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE categories IS 'Portfolio categories (Logos, Events, etc.)';
COMMENT ON TABLE portfolio_items IS 'Portfolio projects and work samples';
COMMENT ON TABLE portfolio_tags IS 'Tags associated with portfolio items';
COMMENT ON TABLE experiences IS 'Work history and experiences';
COMMENT ON TABLE experience_skills IS 'Skills associated with experiences';
COMMENT ON TABLE services IS 'Services offered';
