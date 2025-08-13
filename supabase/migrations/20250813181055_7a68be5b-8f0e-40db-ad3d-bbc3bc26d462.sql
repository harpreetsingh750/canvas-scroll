-- Add location column to products table for exhibitions subcategories
ALTER TABLE public.products 
ADD COLUMN location text;

-- Update any existing "prints" category to "exhibitions"
UPDATE public.products 
SET category = 'exhibitions' 
WHERE category = 'prints';

-- Add index for better performance on location queries
CREATE INDEX IF NOT EXISTS idx_products_location ON public.products(location);
CREATE INDEX IF NOT EXISTS idx_products_category_location ON public.products(category, location);