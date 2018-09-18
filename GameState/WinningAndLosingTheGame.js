import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// need this import for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// to install just npm install font-awesome
import "font-awesome/css/font-awesome.min.css";

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

const Stars = props => {
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
      <button
        className="btn btn-warning btn-sm"
        onClick={props.redraw}
        disabled={props.redraws === 0}
      >
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
      <div>{numbers}</div>
    </div>
  );
};
// Every function is an object and we can store data on that object to be used by all instances
Numbers.list = Array.from({ length: 10 }, (val, idx) => idx + 1);

const DoneFrame = props => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-primary" onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
};

class Game extends Component {
  static initialState = () => {
    return {
      answerIsCorrect: null,
      // typically use objects for faster lookup, but arrays a fine for smaller data sets
      selectedNumbers: [],
      usedNumbers: [],
      randomNumberOfStars: Game.randomNumber(),
      redraws: 5,
      doneStatus: null
    };
  };

  static randomNumber = () => {
    return 1 + Math.floor(Math.random() * 9);
  };

  // to trigger a rerender, we put data in the state
  state = Game.initialState();

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
    /* setState is async, to make sure functions get called after react is done updating the state.
    We can pass a callback method as a second param for setState */
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber()
      }),
      this.updateDoneStatus
    );
  };

  redraw = () => {
    if (this.state.redraws === 0) {
      return;
    } else {
      this.setState(prevState => ({
        usedNumbers: [],
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber(),
        redraws: prevState.redraws - 1
      }));
    }
  };

  // destructing two values in parameters
  possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    // possibleNumbers gives an array of numbers that are included in the usedNumbers array
    const possibleNumbers = Array.from(
      { length: 10 },
      (val, idx) => idx + 1
    ).filter(num => !usedNumbers.includes(num));
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done. Nice!" };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "Game Over!" };
      }
    });
  };

  resetGame = () => this.setState(Game.initialState());
  render() {
    // destructor state values
    const {
      selectedNumbers,
      randomNumberOfStars,
      usedNumbers,
      answerIsCorrect,
      redraws,
      doneStatus
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
        {doneStatus ? (
          <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />
        )}
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
