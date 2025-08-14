-- Add detailed product fields for individual product pages
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS dimensions TEXT,
ADD COLUMN IF NOT EXISTS medium TEXT,
ADD COLUMN IF NOT EXISTS materials TEXT,
ADD COLUMN IF NOT EXISTS year_created INTEGER,
ADD COLUMN IF NOT EXISTS edition_size INTEGER,
ADD COLUMN IF NOT EXISTS frame_included BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS shipping_info TEXT,
ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'available',
ADD COLUMN IF NOT EXISTS weight DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS care_instructions TEXT;