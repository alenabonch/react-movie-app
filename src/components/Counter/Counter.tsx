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
        React.createElement('h3', null, `Count: ${this.state.count}`),
        React.createElement('button', {onClick: this.handleDecrement, className: 'btn btn-outline-danger'}, "Decrement"),
        React.createElement('button', {onClick: this.handleIncrement, className: 'btn btn-outline-danger m-2'}, "Increment")
    );
  }
}

export default Counter;
