import userEvent from '@testing-library/user-event';
import React from 'react';
import Counter from './Counter';
import { render } from '@testing-library/react';

describe(Counter, () => {
  it('should render counter with initial value', () => {
    const {getByTestId} = render(<Counter initialValue={5}/>);
    const counterElement = getByTestId('counter');
    expect(counterElement).toHaveTextContent('5');
  });

  it('should decrement counter value on Decrement button click', () => {
    const {getByTestId, getByRole} = render(<Counter initialValue={5}/>);
    const decrementButton = getByRole('button', {name: 'Decrement'});
    userEvent.click(decrementButton)
    const counterElement = getByTestId('counter');
    expect(counterElement).toHaveTextContent('4');
  });

  it('should increment counter value on Increment button click', () => {
    const {getByTestId, getByRole} = render(<Counter initialValue={5}/>);
    const incrementButton = getByRole('button', {name: 'Increment'});
    userEvent.click(incrementButton)
    const counterElement = getByTestId('counter');
    expect(counterElement).toHaveTextContent('6');
  });
});
