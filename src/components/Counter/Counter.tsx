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
    return React.createElement('div', null,
        React.createElement('p', null, `Count: ${this.state.count}`),
        React.createElement('button', {onClick: this.handleDecrement}, "Decrement"),
        React.createElement('button', {onClick: this.handleIncrement}, "Increment")
    );
  }
}

export default Counter;
