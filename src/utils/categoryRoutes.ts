import type { CategoryNode } from '../types';
export const categoryPath = (segments: string[]) => segments.filter(Boolean).join('/');
export const categoryHref = (segments: string[]) => `/category/${categoryPath(segments)}`;
export const resolveCategoryPath = (tree: CategoryNode[], segments: string[]) => {
  const nodes: CategoryNode[] = [];
  let level = tree;
  for (const slug of segments) {
    const node = level.find((item) => item.slug === slug);
    if (!node) return [];
    nodes.push(node);
    level = node.children ?? [];
  }
  return nodes;
};
