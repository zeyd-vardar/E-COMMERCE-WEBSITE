import type { Language } from '../../../types';
import { logout } from '../../auth/api/authApi';

export function bindSignOutEvent(
  language: Language,
  toast: (message: string) => void,
): void {
  document.querySelector('.signout-btn')?.addEventListener('click', () => {
    void logout().then(() => {
      toast(
        language === 'tr'
          ? 'Oturumunuz kapatıldı.'
          : 'You have been signed out.',
      );
    });
  });
}
