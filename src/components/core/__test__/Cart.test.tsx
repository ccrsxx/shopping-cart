import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Cart } from '..';

export type CartProps = { name: string; price: number; quantity: number };

interface MockProps {
  cartProducts: number;
  currentCart: CartProps[];
  totalPrice: number;
  clearCart: () => void;
}

let mockCurrentCart = [
  { id: 1, name: 'emilia', price: 10, quantity: 2 },
  { id: 2, name: 'rem', price: 9, quantity: 1 },
  { id: 3, name: 'lena', price: 7, quantity: 3 }
];

const mockClearCart = (): void => {
  mockCurrentCart = [];
};

const [mockCartProducts, mockTotalPrice] = mockCurrentCart.reduce(
  ([products, total], { price, quantity }) => [
    products + quantity,
    total + price * quantity
  ],
  [0, 0]
);

jest.mock('../../../context', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useShoppingCart: (): MockProps => ({
    cartProducts: mockCartProducts,
    currentCart: mockCurrentCart,
    totalPrice: mockTotalPrice,
    clearCart: mockClearCart
  })
}));

jest.mock('../CartItem', () => ({
  CartItem: (): JSX.Element => <div data-testid='cart-item' />
}));

let rerenderComponent: (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => void;

describe('test Cart', () => {
  beforeEach(() => {
    const { rerender } = render(<Cart />, { wrapper: BrowserRouter });
    rerenderComponent = rerender;
  });

  function getCartItems(): HTMLElement[] {
    return screen.queryAllByTestId('cart-item');
  }

  it('renders correctly', () => {
    const tree = renderer.create(<Cart />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should not render cart items in the beginning', () => {
    const cartItems = getCartItems();

    expect(cartItems).toHaveLength(0);
  });

  it('renders cart items when cart button is clicked', () => {
    const cartButton = screen.getByRole('button');

    userEvent.click(cartButton);

    const cartItems = getCartItems();

    expect(cartItems).toHaveLength(3);
  });

  it('should clear cart items when clear button is clicked', () => {
    const cartButton = screen.getByRole('button');

    userEvent.click(cartButton);

    const beforeClickedCartItems = getCartItems();

    expect(beforeClickedCartItems).toHaveLength(3);

    const clearButton = screen.getByRole('button', {
      name: /clear/i
    });

    userEvent.click(clearButton);

    rerenderComponent(<Cart />);
    rerenderComponent(<Cart />);

    const afterClickedCartItems = getCartItems();

    expect(afterClickedCartItems).toHaveLength(0);
  });
});
