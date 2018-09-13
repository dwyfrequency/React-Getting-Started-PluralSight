import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// need this import for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// to install just npm install font-awesome
import "font-awesome/css/font-awesome.min.css";

const Stars = props => {
  // add one so it can actually be between 1 and 9
  const numberOfStars = 1 + Math.floor(Math.random() * 9);
  // first arg gives us an undefined array of the len passed in, second populates the array locations based on func output
  const stars = Array.from({ length: numberOfStars }, (val, idx) => (
    <i key={idx} className="fa fa-star" />
  ));

  return <div className="col-5">{stars}</div>;
};

const Button = props => {
  return (
    <div className="col-2">
      <button className="btn btn-primary">=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {/* hard coded values for now */}
      <span>4</span>
      <span>5</span>
    </div>
  );
};

const Numbers = props => {
  console.log(Numbers.list);
  const numbers = Numbers.list.map(val => <span key={val}>{val}</span>);
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
  render() {
    return (
      <div className="container">
        <hr />
        <h3>Play Nine</h3>
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
