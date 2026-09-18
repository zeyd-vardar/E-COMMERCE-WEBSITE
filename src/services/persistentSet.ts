import { storage } from '../utils/storage';

export class PersistentSet {
  private values: Set<string>;
  constructor(private key: string) {
    this.values = new Set(storage.getJson<string[]>(key, []));
  }
  has(id: string) {
    return this.values.has(id);
  }
  all() {
    return [...this.values];
  }
  toggle(id: string) {
    this.values.has(id) ? this.values.delete(id) : this.values.add(id);
    this.save();
    return this.values.has(id);
  }
  remove(id: string) {
    this.values.delete(id);
    this.save();
  }
  clear() {
    this.values.clear();
    this.save();
  }
  private save() {
    storage.setJson(this.key, this.all());
  }
}
