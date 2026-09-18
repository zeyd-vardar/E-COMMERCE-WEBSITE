import type { UserProfile } from '../types/account';
import { storage } from '../utils/storage';
const KEY = 'aurea-user-profile';
const initialProfile: UserProfile = {
  id: 'store-user',
  firstName: 'Zeynep',
  lastName: 'Yılmaz',
  email: 'zeynep@store.com',
  phone: '+90 555 000 00 00',
};
export const userService = {
  get(): UserProfile {
    return {
      ...initialProfile,
      ...storage.getJson<Partial<UserProfile>>(KEY, {}),
    };
  },
  save(user: UserProfile) {
    storage.setJson(KEY, user);
  },
};
