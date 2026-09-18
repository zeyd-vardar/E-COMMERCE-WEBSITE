import { catalogProducts as curatedProducts } from './catalogProducts';
import { generatedProducts } from '../generators/demoProducts';
export const catalogProducts = [...curatedProducts, ...generatedProducts];
