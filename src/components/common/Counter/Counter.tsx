import React from 'react';
import { Button } from '../Button/Button';

interface CounterProps {
  initialValue: number;
}

interface CounterState {
  count: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialValue || 0,
    }
  }

  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }))
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    return (
        <div>
          <h3>Count: <span data-testid="counter">{this.state.count}</span></h3>
          <Button onClick={this.handleDecrement} primary={false} size="small">Decrement</Button>
          <Button onClick={this.handleIncrement} primary={false} size="small" className="m-2">Increment</Button>
        </div>
    )
  }
}

export default Counter;
