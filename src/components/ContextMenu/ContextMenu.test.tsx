import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ContextMenu from './ContextMenu';

describe(ContextMenu, () => {
  const options = ['Edit', 'Delete'];
  const onSelect = jest.fn();

  it('should render context menu button', () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    screen.getByLabelText('Options', {selector: 'button'});
    expect(screen.getByLabelText('Options', {selector: 'button'})).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should render context menu options on Options button click',  () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    userEvent.click(screen.getByLabelText('Options', {selector: 'button'}));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should allow user to select an option and trigger onSelect callback', () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    userEvent.click(screen.getByLabelText('Options', {selector: 'button'}));
    userEvent.click(screen.getByText('Delete'));
    expect(onSelect).toHaveBeenCalledWith('Delete');
  });
});
