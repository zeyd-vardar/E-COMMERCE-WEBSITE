import { storage } from '../utils/storage';

const KEY = 'aurea-recently-viewed';
export const recentlyViewedService = {
  add(id: string) {
    const next = [id, ...this.all().filter((x) => x !== id)].slice(0, 8);
    storage.setJson(KEY, next);
  },
  all(): string[] {
    return storage.getJson<string[]>(KEY, []);
  },
};
