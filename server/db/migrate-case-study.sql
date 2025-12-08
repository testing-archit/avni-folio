-- Portfolio database migration to add case study support
-- This adds rich content fields and image gallery support

-- Add new columns to portfolio_items table
ALTER TABLE portfolio_items 
  ADD COLUMN IF NOT EXISTS content JSONB,
  ADD COLUMN IF NOT EXISTS role VARCHAR(255),
  ADD COLUMN IF NOT EXISTS timeline VARCHAR(100),
  ADD COLUMN IF NOT EXISTS tools TEXT[],
  ADD COLUMN IF NOT EXISTS live_link VARCHAR(500),
  ADD COLUMN IF NOT EXISTS hero_image VARCHAR(500),
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_items(slug);

-- Create portfolio_images table for gallery support
CREATE TABLE IF NOT EXISTS portfolio_images (
  id SERIAL PRIMARY KEY,
  portfolio_item_id INTEGER REFERENCES portfolio_items(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolio_images_item ON portfolio_images(portfolio_item_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_images_order ON portfolio_images(display_order);

-- Add comments
COMMENT ON COLUMN portfolio_items.content IS 'JSONB field containing case study content blocks (challenge, process, solution)';
COMMENT ON COLUMN portfolio_items.role IS 'Avni''s role in the project (e.g., Lead Designer)';
COMMENT ON COLUMN portfolio_items.timeline IS 'Project duration (e.g., 2 weeks)';
COMMENT ON COLUMN portfolio_items.tools IS 'Array of tools/technologies used';
COMMENT ON COLUMN portfolio_items.live_link IS 'URL to live project or prototype';
COMMENT ON COLUMN portfolio_items.hero_image IS 'Main hero image URL for case study';
COMMENT ON COLUMN portfolio_items.slug IS 'URL-friendly identifier';

COMMENT ON TABLE portfolio_images IS 'Image gallery for portfolio case studies';
