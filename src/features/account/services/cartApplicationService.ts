import { authTokenStore } from '../../../core/auth/authTokenStore';
import { cartService } from '../../../services/cartService';
import { deleteCartItem, saveCartItem } from '../api/cartApi';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function changeCartQuantity(
  index: number,
  quantity: number,
): Promise<void> {
  const line = cartService.all()[index];
  if (!line) return;

  if (authTokenStore.get() && uuidPattern.test(line.productId)) {
    if (quantity <= 0) {
      await deleteCartItem(line.productId);
    } else {
      await saveCartItem(line.productId, quantity);
    }
  }

  cartService.setQuantity(index, quantity);
}

export async function removeCartLine(index: number): Promise<void> {
  const line = cartService.all()[index];
  if (!line) return;

  if (authTokenStore.get() && uuidPattern.test(line.productId)) {
    await deleteCartItem(line.productId);
  }

  cartService.remove(index);
}
