import { render, screen } from '@testing-library/react';
import React from 'react';
import '../../__mocks__/intersectionObserver';
import MovieListPage from './MovieListPage';

let mockSearchParam = '';
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => {
    return [
      new URLSearchParams(mockSearchParam),
      (newParams: string) => {
        new URLSearchParams(newParams)
      }
    ];
  }
}));

describe(MovieListPage, () => {
  it('should render movie list page', () => {
    render(<MovieListPage/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
  });
});
