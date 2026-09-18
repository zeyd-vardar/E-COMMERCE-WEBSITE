import { storage } from '../utils/storage';

const KEY = 'aurea-cart';
export interface CartLine {
  productId: string;
  color?: string;
  size?: string;
  quantity: number;
}
type LegacyCart = Record<string, number>;
const read = (): CartLine[] => {
  const stored = storage.getJson<unknown>(KEY, []);
  if (Array.isArray(stored)) {
    return stored.filter((line): line is CartLine =>
      Boolean(line && typeof line === 'object' && 'productId' in line && 'quantity' in line),
    );
  }
  if (stored && typeof stored === 'object') {
    return Object.entries(stored as LegacyCart).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }
  return [];
};
const save = (lines: CartLine[]) => storage.setJson(KEY, lines);
export const cartService = {
  all: read,
  add(productId: string, variant: { color?: string; size?: string } = {}) {
    const lines = read();
    const existing = lines.find(
      (line) =>
        line.productId === productId && line.color === variant.color && line.size === variant.size,
    );
    if (existing) existing.quantity += 1;
    else lines.push({ productId, ...variant, quantity: 1 });
    save(lines);
    this.emit();
  },
  setQuantity(index: number, quantity: number) {
    const lines = read();
    if (!lines[index]) return;
    if (quantity <= 0) lines.splice(index, 1);
    else lines[index].quantity = quantity;
    save(lines);
    this.emit();
  },
  remove(index: number) {
    const lines = read();
    if (!lines[index]) return;
    lines.splice(index, 1);
    save(lines);
    this.emit();
  },
  prune(validProductIds: Set<string>) {
    const lines = read(),
      valid = lines.filter(
        (line) =>
          validProductIds.has(line.productId) &&
          Number.isFinite(line.quantity) &&
          line.quantity > 0,
      );
    if (valid.length !== lines.length) save(valid);
  },
  count() {
    return read().reduce((sum, line) => sum + line.quantity, 0);
  },
  emit() {
    dispatchEvent(new CustomEvent('aurea:cart'));
  },
};
