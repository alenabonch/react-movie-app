import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

describe(Button, () => {
  it('should render button with provided label', () => {
    render(<Button label="My Button"/>);
    const button = screen.getByRole('button', {name: 'My Button'});
    expect(button).toBeInTheDocument();
  });

  it('should call provided callback on click', () => {
    const onClickCallback = jest.fn();
    render(<Button label="My Button" onClick={onClickCallback}/>);
    const button = screen.getByRole('button', {name: 'My Button'});
    button.click();
    expect(onClickCallback).toHaveBeenCalled();
  });
});
