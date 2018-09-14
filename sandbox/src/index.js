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
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
        </button>
      );
      break;
    default:
      button = (
        <button
          className="btn btn-primary"
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );
      break;
  }
  return (
    <div className="col-2">
      {button}
      <br />
      <br />
      <button className="btn btn-warning btn-sm" onClick={props.redraw}>
        <i className="fa fa-refresh" /> {props.redraws}
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
    if (props.usedNumbers.includes(number)) {
      return "used";
    } else if (props.selectedNumbers.includes(number)) {
      return "selected";
    }
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
    answerIsCorrect: null,
    // typically use objects for faster lookup, but arrays a fine for smaller data sets
    selectedNumbers: [],
    usedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    redraws: 5
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
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = clickedNumber => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        num => num !== clickedNumber
      )
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((accum, val) => accum + val, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
    }));
  };

  redraw = () => {
    this.setState(prevState => ({
      usedNumbers: [],
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
    }));
  };

  render() {
    // destructor state values
    const {
      selectedNumbers,
      randomNumberOfStars,
      usedNumbers,
      answerIsCorrect,
      redraws
    } = this.state;
    return (
      <div className="container">
        <hr />
        <h3>Play Nine</h3>
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button
            answerIsCorrect={answerIsCorrect}
            checkAnswer={this.checkAnswer}
            selectedNumbers={selectedNumbers}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br />
        <Numbers
          selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}
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
