INSERT INTO categories (slug, name_tr, name_en) VALUES
  ('kadin', 'Kadın', 'Women'), ('erkek', 'Erkek', 'Men'), ('aksesuar', 'Aksesuar', 'Accessories')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (category_id,slug,sku,title_tr,title_en,description_tr,price,compare_at_price,images,colors,sizes,stock,is_new,is_best_seller) VALUES
  ((SELECT id FROM categories WHERE slug='kadin'),'ipek-saten-gomlek','AUR-W-001','İpek Saten Gömlek','Silk Satin Shirt','Zamansız kesimli, hafif parlak dokulu gömlek.',1890,2290,'[]','{"Ekru","Siyah"}','{"S","M","L"}',18,true,true),
  ((SELECT id FROM categories WHERE slug='erkek'),'keten-relaxed-gomlek','AUR-M-001','Keten Relaxed Gömlek','Linen Relaxed Shirt','Nefes alan keten karışımıyla günlük kullanım için tasarlandı.',1690,NULL,'[]','{"Bej","Lacivert"}','{"M","L","XL"}',24,true,false),
  ((SELECT id FROM categories WHERE slug='aksesuar'),'deri-omuz-cantasi','AUR-A-001','Deri Omuz Çantası','Leather Shoulder Bag','Minimal formda günlük deri omuz çantası.',3290,3890,'[]','{"Taba","Siyah"}','{}',8,false,true)
ON CONFLICT (sku) DO NOTHING;
