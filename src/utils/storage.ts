export const storage = {
  get<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
    try {
      const value = localStorage.getItem(key) as T | null;
      return value && allowed.includes(value) ? value : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage may be unavailable */
    }
  },
  getJson<T>(key: string, fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  setJson(key: string, value: unknown): void {
    this.set(key, JSON.stringify(value));
  },
};
