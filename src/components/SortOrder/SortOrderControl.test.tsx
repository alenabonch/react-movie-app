import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SortOrderControl from './SortOrderControl';

describe(SortOrderControl, () => {
  const user = userEvent.setup();
  const mockOnSortOrderChange = jest.fn();

  it('should render sort order control with provided value marked as active', () => {
    render(<SortOrderControl sortOrder="asc" onSortOrderChange={mockOnSortOrderChange}/>);
    const sortDesc = screen.getByLabelText('Sort Down');
    expect(sortDesc).toBeInTheDocument();
    expect(sortDesc).not.toHaveClass('active');

    const sortAsc = screen.getByLabelText('Sort Up');
    expect(sortAsc).toBeInTheDocument();
    expect(sortAsc).toHaveClass('active');
  });

  it('should allow user to change sort order control', async () => {
    render(<SortOrderControl sortOrder="asc" onSortOrderChange={mockOnSortOrderChange}/>);
    const sortDesc = screen.getByLabelText('Sort Down');
    await user.click(sortDesc);
    expect(mockOnSortOrderChange).toHaveBeenCalledWith('desc')
  });
});
