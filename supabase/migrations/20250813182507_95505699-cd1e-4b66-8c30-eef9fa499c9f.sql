-- Add on_sale column to products table
ALTER TABLE public.products 
ADD COLUMN on_sale boolean NOT NULL DEFAULT false;