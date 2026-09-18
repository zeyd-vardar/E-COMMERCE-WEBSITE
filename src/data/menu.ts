import type { MenuItem } from '../types';
const item = (id: string, tr: string, en: string): MenuItem => ({
  id,
  label: { tr, en },
  href: `/${id}`,
});
export const secondaryMenu = [
  item('about', 'Hakkımızda', 'About us'),
  item('stores', 'Mağazalar', 'Stores'),
  item('contact', 'İletişim', 'Contact'),
  item('help', 'Yardım', 'Help'),
];
