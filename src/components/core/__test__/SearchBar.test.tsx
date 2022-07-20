import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { SearchBar } from '..';

type GetProp = { get: () => string };

interface MockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: jest.Mock<any, any> | GetProp;
}

const mockPathname = jest.fn();
const mockParameter = jest.fn() as unknown as GetProp;
const mockNavigate = jest.fn();

mockParameter.get = (): string => '';

jest.mock('../../../context', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useShoppingCart: (): MockProps => ({
    pathname: mockPathname,
    parameter: mockParameter,
    navigate: mockNavigate
  })
}));

describe('test SearcBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<SearchBar />).toJSON();
    expect(tree).toMatchSnapshot();
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

    expect(mockNavigate).toHaveBeenCalledWith('/store?search=test');
  });

  it('can submit with search button', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(input, 'test');
    userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/store?search=test');
  });

  it('can submit empty value', () => {
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/store?search=');
  });
});
