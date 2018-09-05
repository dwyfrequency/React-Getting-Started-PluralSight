import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = props => {
  return (
    <button onClick={props.clickHandler}>{`${props.innertxt}: ${
      props.counter
    }`}</button>
  );
};

class Btn extends Component {
  state = {
    counter: 0
  };

  countClickHandler = () => {
    /* B/c state is async, the calls may be batched for performance so we should use the prev state arg.
    This will ensure that we are updating the correct state*/

    this.setState(prevState => {
      return { counter: prevState.counter + 1 };
    });
  };

  render() {
    return (
      <div>
        <Button
          innertxt={this.props.innertxt}
          counter={this.state.counter}
          clickHandler={this.countClickHandler}
        />
      </div>
    );
  }
}

ReactDOM.render(<Btn innertxt="Get some" />, document.getElementById("root"));
