import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchBar } from '@components/common/search-bar';
import type { ExtraQueryType } from '@components/common/search-bar';

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: (): Omit<ExtraQueryType, 'isReady'> => ({
    pathname: 'home',
    query: { search: '', category: '' },
    push: mockRouterPush
  })
}));

jest.mock('@lib/context/shopping-cart', () => ({
  useShoppingCart: (): { isMobile: boolean } => ({ isMobile: false })
}));

describe('test SearchBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  it('renders correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it('should have input value from search parameter', () => {
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('can receive input value', () => {
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'test');

    expect(input).toHaveValue('test');
  });

  it('can submit the form and navigate to input value', () => {
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'test');
    userEvent.type(input, '{enter}');

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/store',
      query: {
        search: 'test'
      }
    });
  });

  it('can submit with search button', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(input, 'test');
    userEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/store',
      query: {
        search: 'test'
      }
    });
  });

  it('can submit empty value', () => {
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/store',
      query: {}
    });
  });
});
