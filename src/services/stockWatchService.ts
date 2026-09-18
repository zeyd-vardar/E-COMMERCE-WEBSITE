import type { StockWatch } from '../types/account';
import { storage } from '../utils/storage';
const KEY = 'aurea-stock-watch';
const read = (): StockWatch[] => storage.getJson(KEY, []);
const save = (items: StockWatch[]) => storage.setJson(KEY, items);
export const stockWatchService = {
  all: read,
  add(productId: string, color?: string, size?: string) {
    const items = read();
    if (!items.some((item) => item.productId === productId)) {
      save([
        ...items,
        { productId, desiredColor: color, desiredSize: size, createdAt: new Date().toISOString() },
      ]);
    }
  },
  remove(productId: string) {
    save(read().filter((x) => x.productId !== productId));
  },
};
