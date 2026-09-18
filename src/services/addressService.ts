import type { Address } from '../types/account';
import { storage } from '../utils/storage';
const KEY = 'aurea-addresses';
const initialAddresses: Address[] = [
  {
    id: 'address-1',
    title: 'Ev',
    firstName: 'Zeynep',
    lastName: 'Yılmaz',
    phone: '+90 555 000 00 00',
    addressLine: 'Bağdat Caddesi No: 10 D: 4',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    isDefault: true,
  },
  {
    id: 'address-2',
    title: 'İş',
    firstName: 'Zeynep',
    lastName: 'Yılmaz',
    phone: '+90 555 000 00 00',
    addressLine: 'Büyükdere Caddesi No: 22',
    city: 'İstanbul',
    district: 'Şişli',
    country: 'Türkiye',
    isDefault: false,
  },
];
const read = (): Address[] => storage.getJson(KEY, initialAddresses);
const save = (items: Address[]) => storage.setJson(KEY, items);
export const addressService = {
  all: read,
  add(item: Address) {
    const items = read(),
      index = items.findIndex((address) => address.id === item.id);
    if (index >= 0) {
      items[index] = { ...items[index], ...item, isDefault: items[index].isDefault };
    } else {
      items.push(item);
    }
    save(items);
  },
  remove(id: string) {
    save(read().filter((x) => x.id !== id));
  },
  makeDefault(id: string) {
    save(read().map((x) => ({ ...x, isDefault: x.id === id })));
  },
};
