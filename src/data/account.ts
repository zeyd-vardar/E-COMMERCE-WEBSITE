import type { AccountMessage, Order } from '../types/account';
export const orders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'AU-10254',
    date: '2026-08-12',
    itemCount: 3,
    total: 4799,
    status: 'delivered',
    trackingNumber: 'TRK10254',
  },
  {
    id: 'o2',
    orderNumber: 'AU-10318',
    date: '2026-08-16',
    itemCount: 1,
    total: 2490,
    status: 'shipped',
    trackingNumber: 'TRK10318',
  },
];
export const messages: AccountMessage[] = [
  {
    id: 'm1',
    subject: { tr: 'Siparişiniz kargoya verildi', en: 'Your order has shipped' },
    preview: {
      tr: 'AU-10318 numaralı siparişiniz yola çıktı.',
      en: 'Your order AU-10318 is on its way.',
    },
    createdAt: '2026-08-16',
    isRead: false,
    type: 'order',
  },
  {
    id: 'm2',
    subject: { tr: 'İade talebiniz alındı', en: 'Your return request was received' },
    preview: { tr: 'Talebiniz inceleniyor.', en: 'Your request is being reviewed.' },
    createdAt: '2026-08-10',
    isRead: false,
    type: 'return',
  },
];
