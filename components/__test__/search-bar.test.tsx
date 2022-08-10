import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchBar } from '@components/common/search-bar';
import type { ExtraQueryType } from '@components/common/search-bar';

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: (): ExtraQueryType => ({
    pathname: 'home',
    query: { search: '', category: '' },
    push: mockRouterPush
  })
}));

describe('test SearchBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  it.only('renders correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it('should have input value from search parameter', () => {
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('can receive input value', () => {
    const input = screen.getByRole('textbox');

    void userEvent.type(input, 'test');

    expect(input).toHaveValue('test');
  });

  it('can submit the form and navigate to input value', () => {
    const input = screen.getByRole('textbox');

    void userEvent.type(input, 'test');
    void userEvent.type(input, '{enter}');

    expect(mockRouterPush).toHaveBeenCalledWith('/store?search=test');
  });

  it('can submit with search button', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    void userEvent.type(input, 'test');
    void userEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith('/store?search=test');
  });

  it('can submit empty value', () => {
    const button = screen.getByRole('button');

    void userEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith('/store?search=');
  });
});
