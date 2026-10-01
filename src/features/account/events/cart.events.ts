import { cartService } from '../../../services/cartService';
import {
  changeCartQuantity,
  removeCartLine,
} from '../services/cartApplicationService';

interface CartEventDependencies {
  rerender: () => void;
  onError: (error: unknown) => void;
}

export function bindCartEvents(dependencies: CartEventDependencies): void {
  document
    .querySelectorAll<HTMLElement>('[data-cart-minus]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.cartMinus);
        const line = cartService.all()[index];
        if (!line) return;

        void changeCartQuantity(index, line.quantity - 1)
          .then(dependencies.rerender)
          .catch(dependencies.onError);
      });
    });

  document
    .querySelectorAll<HTMLElement>('[data-cart-plus]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.cartPlus);
        const line = cartService.all()[index];
        if (!line) return;

        void changeCartQuantity(index, line.quantity + 1)
          .then(dependencies.rerender)
          .catch(dependencies.onError);
      });
    });

  document
    .querySelectorAll<HTMLElement>('[data-cart-remove]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.cartRemove);
        void removeCartLine(index)
          .then(dependencies.rerender)
          .catch(dependencies.onError);
      });
    });
}
