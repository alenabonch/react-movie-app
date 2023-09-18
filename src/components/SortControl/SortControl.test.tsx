import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SortControl from './SortControl';

describe(SortControl, () => {
  const user = userEvent.setup();
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

  it('should call sort change callback on select change', async () => {
    render(<SortControl initialSort={initialSort} onSortChange={onSortChange}/>);
    const selectElement = screen.getByLabelText('Sort By');
    await user.selectOptions(selectElement, 'releaseDate');
    expect(onSortChange).toHaveBeenCalledWith('releaseDate');
  });
});
