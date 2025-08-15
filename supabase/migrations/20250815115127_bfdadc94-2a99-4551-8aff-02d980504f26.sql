-- Add foreign key relationship between cart_items and products
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Add foreign key relationship between cart_items and users
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;