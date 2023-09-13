import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SortControl from './SortControl';

describe(SortControl, () => {
  const onSortChange = jest.fn();
  const initialSort = 'title';

  it('should render sort control with initial value', () => {
    render(<SortControl initialSort={initialSort} onSortChange={onSortChange}/>);
    expect(screen.getByLabelText('Sort By')).toHaveValue(initialSort);
  });

  it('should display the correct number of options', () => {
    render(<SortControl initialSort={initialSort} onSortChange={onSortChange}/>);
    expect(screen.getAllByRole('option').length).toBe(2);
  });

  it('should call sort change callback on select change', () => {
    render(<SortControl initialSort={initialSort} onSortChange={onSortChange}/>);
    const selectElement = screen.getByLabelText('Sort By');
    userEvent.selectOptions(selectElement, 'year');
    expect(onSortChange).toHaveBeenCalledWith('year');
  });
});
