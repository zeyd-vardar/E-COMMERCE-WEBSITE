import { authTokenStore } from '../../../core/auth/authTokenStore';
import { cartService } from '../../../services/cartService';
import type { Language } from '../../../types';
import { checkout } from '../api/orderApi';

interface CheckoutEventDependencies {
  language: Language;
  onError: (error: unknown) => void;
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function bindPaymentFields(): void {
  const paymentOptions = document.querySelectorAll<HTMLInputElement>(
    'input[name="payment"]',
  );
  const cardFields = document.querySelector<HTMLElement>('.card-fields');

  const updatePayment = () => {
    const isCard =
      document.querySelector<HTMLInputElement>('input[name="payment"]:checked')
        ?.value === 'card';

    if (!cardFields) return;

    cardFields.hidden = !isCard;
    cardFields
      .querySelectorAll<HTMLInputElement>('input')
      .forEach((input) => (input.required = isCard));
  };

  paymentOptions.forEach((input) => {
    input.addEventListener('change', updatePayment);
  });
  updatePayment();

  document
    .querySelector<HTMLInputElement>('input[name="cardNumber"]')
    ?.addEventListener('input', (event) => {
      const input = event.currentTarget as HTMLInputElement;
      input.value = input.value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();
    });

  document
    .querySelector<HTMLInputElement>('input[name="expiry"]')
    ?.addEventListener('input', (event) => {
      const input = event.currentTarget as HTMLInputElement;
      const digits = input.value.replace(/\D/g, '').slice(0, 4);
      input.value =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    });
}

async function submitCheckout(form: HTMLFormElement): Promise<void> {
  const shippingAddressId = String(
    new FormData(form).get('shippingAddressId') ?? '',
  );

  if (authTokenStore.get() && uuidPattern.test(shippingAddressId)) {
    await checkout(shippingAddressId);
    cartService.clear();
  }

  form.hidden = true;
  const success = document.querySelector<HTMLElement>('.checkout-success');
  if (success) success.hidden = false;
  scrollTo({ top: 0, behavior: 'smooth' });
}

export function bindCheckoutEvents(
  dependencies: CheckoutEventDependencies,
): void {
  bindPaymentFields();

  document
    .querySelector<HTMLFormElement>('.checkout-form')
    ?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement;
      if (!form.reportValidity()) return;

      void submitCheckout(form).catch(dependencies.onError);
    });
}
