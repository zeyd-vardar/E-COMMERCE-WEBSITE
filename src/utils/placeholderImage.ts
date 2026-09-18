const palette = ['#E8E4DC', '#DDE5E4', '#E7DDD8', '#E1E5DB', '#E5DFE8', '#E8E1D5'];
const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (char) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char,
  );
export const createPlaceholderSvg = (label: string, index: number) => {
  const short = label.length > 28 ? `${label.slice(0, 27)}…` : label;
  const size = short.length > 22 ? 30 : short.length > 15 ? 36 : 44;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
<rect width="900" height="1200" fill="${palette[index % palette.length]}"/>
<text x="450" y="600" text-anchor="middle" dominant-baseline="middle" fill="#282724" font-family="Arial,sans-serif" font-size="${size}" letter-spacing="3">
${escapeXml(short.toUpperCase())}
</text>
<text x="450" y="655" text-anchor="middle" fill="#77736c" font-family="Arial,sans-serif" font-size="15" letter-spacing="5">STORE COLLECTION</text>
</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
