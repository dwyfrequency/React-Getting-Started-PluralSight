import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// need this import for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// to install just npm install font-awesome
import "font-awesome/css/font-awesome.min.css";

const Stars = props => {
  // add one so it can actually be between 1 and 9
  // const numberOfStars = 1 + Math.floor(Math.random() * 9);
  // first arg gives us an undefined array of the len passed in, second populates the array locations based on func output
  console.log(props.numberOfStars);
  const stars = Array.from({ length: props.numberOfStars }, (val, idx) => (
    <i key={idx} className="fa fa-star" />
  ));

  return <div className="col-5">{stars}</div>;
};

const Button = props => {
  return (
    <div className="col-2">
      <button
        disabled={props.selectedNumbers.length === 0}
        className="btn btn-primary"
      >
        =
      </button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, idx) => (
        <span key={idx} onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
      ))}
    </div>
  );
};

const Numbers = props => {
  const numberClassName = number => {
    return props.selectedNumbers.includes(number) ? "selected" : "";
  };
  const numbers = Numbers.list.map(number => (
    <span
      key={number}
      className={numberClassName(number)}
      onClick={() => props.selectNumber(number)}
    >
      {number}
    </span>
  ));
  return (
    <div className="card text-center">
      <div>
        {numbers}
        {/* <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span> */}
      </div>
    </div>
  );
};
// Every function is an object and we can store data on that object to be used by all instances
Numbers.list = Array.from({ length: 10 }, (val, idx) => idx + 1);

class Game extends Component {
  // to trigger a rerender, we put data in the state
  state = {
    // typically use objects for faster lookup, but arrays a fine for smaller data sets
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
  };

  /*when we setSTate in selectNumber, the entire Game component gets rerendered including the children.
  thus are stars are changing for each click
  to solve, we move the numberOfStars var up to the game component*/

  selectNumber = clickedNumber => {
    // used the function version of setState, b/c the update depends on prevState
    if (this.state.selectedNumbers.includes(clickedNumber)) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = clickedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        num => num !== clickedNumber
      )
    }));
  };

  render() {
    // destructor state values
    const { selectedNumbers, randomNumberOfStars } = this.state;
    return (
      <div className="container">
        <hr />
        <h3>Play Nine</h3>
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br />
        <Numbers
          selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
