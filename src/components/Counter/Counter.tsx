import React from 'react';

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
          <button onClick={this.handleDecrement} className="btn btn-outline-danger">Decrement</button>
          <button onClick={this.handleIncrement} className="btn btn-outline-danger m-2">Increment</button>
        </div>
    )
  }
}

export default Counter;
