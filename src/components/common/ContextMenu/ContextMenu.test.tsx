import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ContextMenu from './ContextMenu';

describe(ContextMenu, () => {
  const user = userEvent.setup();
  const options = ['Edit', 'Delete'];
  const onSelect = jest.fn();

  it('should render context menu button', () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    screen.getByLabelText('Options', {selector: 'button'});
    expect(screen.getByLabelText('Options', {selector: 'button'})).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should render context menu options on Options button click', async () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    await user.click(screen.getByLabelText('Options', {selector: 'button'}));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should allow user to select an option and trigger onSelect callback', async () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    await user.click(screen.getByLabelText('Options', {selector: 'button'}));
    await user.click(screen.getByText('Delete'));
    expect(onSelect).toHaveBeenCalledWith('Delete');
  });
});
