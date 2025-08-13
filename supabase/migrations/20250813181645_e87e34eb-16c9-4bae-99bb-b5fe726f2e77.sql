-- Insert a sample exhibition product for sphinx location
INSERT INTO public.products (title, description, category, location, price, is_featured)
VALUES (
  'Exhibition at Sphinx Gallery',
  'Contemporary art exhibition featuring mixed media works',
  'exhibitions',
  'sphinx',
  0.00,
  true
);