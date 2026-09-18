export type IconName =
  | 'menu'
  | 'search'
  | 'x'
  | 'truck'
  | 'heart'
  | 'bag'
  | 'user'
  | 'chevron'
  | 'message'
  | 'arrow'
  | 'send';
const paths: Record<IconName, string> = {
  menu: `<line x1="4" x2="20" y1="7" y2="7"/>
<line x1="4" x2="20" y1="12" y2="12"/>
<line x1="4" x2="20" y1="17" y2="17"/>`,
  search: `<circle cx="11" cy="11" r="7"/>
<path d="m20 20-4-4"/>`,
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  truck: `<path d="M10 17h4V5H2v12h3m9-8h4l4 4v4h-3"/>
<circle cx="7.5" cy="17.5" r="2.5"/>
<circle cx="16.5" cy="17.5" r="2.5"/>`,
  heart:
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  bag: `<path d="M6 8h12l1 13H5L6 8Z"/>
<path d="M9 9V6a3 3 0 0 1 6 0v3"/>`,
  user: `<circle cx="12" cy="8" r="4"/>
<path d="M4 21a8 8 0 0 1 16 0"/>`,
  chevron: '<path d="m9 18 6-6-6-6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  send: `<path d="m22 2-7 20-4-9-9-4Z"/>
<path d="M22 2 11 13"/>`,
};
export const icon = (name: IconName, size = 20) =>
  `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
${paths[name]}
</svg>`;
