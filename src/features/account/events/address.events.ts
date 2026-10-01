import { addressService } from '../../../services/addressService';
import { userService } from '../../../services/userService';
import type { Language } from '../../../types';
import {
  removeAccountAddress,
  saveAccountAddress,
  setAccountDefaultAddress,
} from '../services/addressApplicationService';

interface AddressEventDependencies {
  language: Language;
  rerender: () => void;
  toast: (message: string) => void;
}

function errorMessage(error: unknown, language: Language): string {
  if (error instanceof Error) return error.message;
  return language === 'tr'
    ? 'Adres işlemi tamamlanamadı.'
    : 'The address operation could not be completed.';
}

function prepareAddressFormForEdit(
  form: HTMLFormElement,
  addressId: string,
  language: Language,
): void {
  const address = addressService.all().find((item) => item.id === addressId);

  if (!address) return;

  form.hidden = false;
  (form.elements.namedItem('id') as HTMLInputElement).value = address.id;
  (form.elements.namedItem('title') as HTMLInputElement).value = address.title;
  (form.elements.namedItem('city') as HTMLInputElement).value = address.city;
  (form.elements.namedItem('district') as HTMLInputElement).value =
    address.district;
  (form.elements.namedItem('phone') as HTMLInputElement).value = address.phone;
  (form.elements.namedItem('address') as HTMLTextAreaElement).value =
    address.addressLine;
  form.querySelector('h2')!.textContent =
    language === 'tr' ? 'Adresi Düzenle' : 'Edit Address';
  form.querySelector<HTMLButtonElement>(':scope>button')!.textContent =
    language === 'tr' ? 'DEĞİŞİKLİKLERİ KAYDET' : 'SAVE CHANGES';
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prepareAddressFormForCreate(
  form: HTMLFormElement,
  language: Language,
): void {
  form.hidden = false;
  form.reset();
  (form.elements.namedItem('id') as HTMLInputElement).value = '';
  form.querySelector('h2')!.textContent =
    language === 'tr' ? 'Yeni Adres' : 'New Address';
  form.querySelector<HTMLButtonElement>(':scope>button')!.textContent =
    language === 'tr' ? 'ADRESİ KAYDET' : 'SAVE ADDRESS';
}

async function handleAddressSubmit(
  form: HTMLFormElement,
  dependencies: AddressEventDependencies,
): Promise<void> {
  const data = new FormData(form);
  const user = userService.get();
  const addressId = String(data.get('id') ?? '');

  await saveAccountAddress(
    {
      title: String(data.get('title')),
      firstName: user.firstName,
      lastName: user.lastName,
      phone: String(data.get('phone')),
      addressLine: String(data.get('address')),
      city: String(data.get('city')),
      district: String(data.get('district')),
      country: 'Türkiye',
      isDefault: false,
    },
    addressId || undefined,
  );

  dependencies.toast(
    dependencies.language === 'tr'
      ? addressId
        ? 'Adresiniz güncellendi.'
        : 'Adresiniz kaydedildi.'
      : addressId
        ? 'Address updated.'
        : 'Address saved.',
  );
  dependencies.rerender();
}

export function bindAddressEvents(
  dependencies: AddressEventDependencies,
): void {
  const form = document.querySelector<HTMLFormElement>('.address-form');

  document
    .querySelectorAll<HTMLElement>('[data-edit-address]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const addressId = button.dataset.editAddress;
        if (form && addressId) {
          prepareAddressFormForEdit(form, addressId, dependencies.language);
        }
      });
    });

  document
    .querySelector('.new-address-trigger')
    ?.addEventListener('click', () => {
      if (form) prepareAddressFormForCreate(form, dependencies.language);
    });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    void handleAddressSubmit(form, dependencies).catch((error) => {
      dependencies.toast(errorMessage(error, dependencies.language));
    });
  });

  document
    .querySelectorAll<HTMLElement>('[data-delete-address]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const addressId = button.dataset.deleteAddress;
        if (!addressId) return;

        void removeAccountAddress(addressId)
          .then(dependencies.rerender)
          .catch((error) => {
            dependencies.toast(errorMessage(error, dependencies.language));
          });
      });
    });

  document
    .querySelectorAll<HTMLElement>('[data-default-address]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const addressId = button.dataset.defaultAddress;
        if (!addressId) return;

        void setAccountDefaultAddress(addressId)
          .then(dependencies.rerender)
          .catch((error) => {
            dependencies.toast(errorMessage(error, dependencies.language));
          });
      });
    });
}
