/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CartItem } from '@components/cart/cart-item';

interface MockProps {
  deleteProduct: (productId: number) => () => void;
  handleProductQuantity: (
    productId: number,
    type?: 'increment' | 'decrement'
  ) => (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockDeleteProduct = jest.fn((productId: number) => (): void => undefined);

const currentCart = {
  id: 24,
  index: 1,
  title: 'Emilia',
  image: '/images/emilia.jpg',
  price: 10,
  quantity: 1,
  toggleCart: (): void => undefined
};

const mockHandleProductQuantity =
  (productId: number, type?: 'increment' | 'decrement') =>
  (e?: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = !type ? parseInt(e?.target.value as string, 10) : null;

    if (!type && !inputValue) inputValue = 1;
    else if (inputValue && inputValue >= 10_000) inputValue = 10_000;

    currentCart.quantity =
      inputValue ??
      (type === 'increment'
        ? currentCart.quantity + 1
        : currentCart.quantity - 1);
  };

jest.mock('@lib/context/shopping-cart', () => ({
  useShoppingCart: (): MockProps => ({
    deleteProduct: mockDeleteProduct,
    handleProductQuantity: mockHandleProductQuantity
  })
}));

let rerenderComponent: (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => void;

describe('test CartItem', () => {
  beforeEach(() => {
    const { rerender } = render(<CartItem {...currentCart} />);
    rerenderComponent = rerender;
  });

  it('renders correctly', () => {
    const { container } = render(<CartItem {...currentCart} />);
    expect(container).toMatchSnapshot();
  });

  it('should call deleteProduct when delete button is clicked', () => {
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    userEvent.click(deleteButton);

    expect(mockDeleteProduct).toHaveBeenCalledWith(24);
  });

  it('shows the current quantity on the input', () => {
    const input = screen.getByRole('spinbutton');

    rerenderComponent(<CartItem {...currentCart} />);

    expect(input).toHaveValue(1);
  });

  it('should call handleProductQuantity when input is changed', () => {
    const input: HTMLInputElement = screen.getByRole('spinbutton');

    userEvent.type(input, '200');

    rerenderComponent(<CartItem {...currentCart} />);

    expect(input).toHaveValue(1200);
  });

  it('should not surpass the minimum and maximum quantity with input', () => {
    const input: HTMLInputElement = screen.getByRole('spinbutton');

    userEvent.type(input, '-1');

    rerenderComponent(<CartItem {...currentCart} />);

    expect(input).toHaveValue(1);

    userEvent.type(input, '20_000');

    rerenderComponent(<CartItem {...currentCart} />);

    expect(input).toHaveValue(10_000);
  });

  it('should not surpass the minimum and maximum quantity with button', () => {
    currentCart.quantity = 1;

    rerenderComponent(<CartItem {...currentCart} />);

    const input = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: /increase/i });
    const decrementButton = screen.getByRole('button', { name: /decrease/i });

    userEvent.click(decrementButton);

    expect(decrementButton).toBeDisabled();
    expect(currentCart.quantity).toBe(1);

    userEvent.click(incrementButton);
    userEvent.click(incrementButton);

    rerenderComponent(<CartItem {...currentCart} />);

    expect(input).toHaveValue(3);

    currentCart.quantity = 10_000;

    rerenderComponent(<CartItem {...currentCart} />);

    userEvent.click(incrementButton);

    rerenderComponent(<CartItem {...currentCart} />);

    expect(incrementButton).toBeDisabled();
    expect(input).toHaveValue(10_000);
  });
});
