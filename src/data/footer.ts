import type { LocalizedText } from '../types';
export interface FooterLink {
  id: string;
  label: LocalizedText;
  href: string;
}
export interface FooterSection {
  id: string;
  title: LocalizedText;
  links: FooterLink[];
}
const link = (id: string, tr: string, en: string, href: string): FooterLink => ({
  id,
  label: { tr, en },
  href,
});
export const footerSections: FooterSection[] = [
  {
    id: 'corporate',
    title: { tr: 'Kurumsal', en: 'Corporate' },
    links: [
      link('about', 'Hakkımızda', 'About Us', '/about'),
      link('mission', 'Misyonumuz', 'Our Mission', '/mission'),
      link('stores', 'Mağazalarımız', 'Our Stores', '/stores'),
      link('blog', 'Blog', 'Blog', '/blog'),
      link('privacy', 'Gizlilik Bildirimi', 'Privacy Notice', '/privacy'),
    ],
  },
  {
    id: 'support',
    title: { tr: 'Destek', en: 'Support' },
    links: [
      link('contact', 'Bize Ulaşın', 'Contact Us', '/contact'),
      link('returns', 'İade Şartları', 'Return Policy', '/returns'),
      link('shipping', 'Sipariş ve Teslimat', 'Orders & Delivery', '/shipping'),
      link('tracking', 'Sipariş Takip', 'Order Tracking', '/tracking'),
      link('faq', 'Sıkça Sorulan Sorular', 'Frequently Asked Questions', '/faq'),
      link('sitemap', 'Site Haritası', 'Sitemap', '/sitemap'),
    ],
  },
];
