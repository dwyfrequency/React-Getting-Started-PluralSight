import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Button extends Component {
  handleClick = () => {
    return this.props.countClickHandler(this.props.incrementVal);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{`+${
          this.props.incrementVal
        }`}</button>
      </div>
    );
  }
}

const Result = props => {
  return <div>{props.counter}</div>;
};

class App extends Component {
  state = {
    counter: 0
  };

  incrementCounter = val => {
    /* B/c state is async, the calls may be batched for performance so we should use the prev state arg.
    This will ensure that we are updating the correct state*/
    this.setState(prevState => {
      return { counter: prevState.counter + val };
    });
  };

  render() {
    return (
      <div>
        <Button
          countClickHandler={x => this.incrementCounter(x)}
          incrementVal={1}
        />
        <Button
          countClickHandler={x => this.incrementCounter(x)}
          incrementVal={5}
        />
        <Button
          countClickHandler={x => this.incrementCounter(x)}
          incrementVal={10}
        />
        <Button
          countClickHandler={x => this.incrementCounter(x)}
          incrementVal={100}
        />
        <Result counter={this.state.counter} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
