import { render, screen } from '@testing-library/react';
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
    act(() => {
      screen.getByLabelText('Options', {selector: 'button'}).click();
    });
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should allow user to select an option and trigger onSelect callback', () => {
    render(<ContextMenu options={options} onSelect={onSelect}/>);
    act(() => {
      screen.getByLabelText('Options', {selector: 'button'}).click();
    });
    act(() => {
      screen.getByText('Delete').click();
    });
    expect(onSelect).toHaveBeenCalledWith('Delete');
  });
});
