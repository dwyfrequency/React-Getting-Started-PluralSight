import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// need this import for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// to install just npm install bootstrap
import "font-awesome/css/font-awesome.min.css";

const Stars = props => {
  return (
    <div className="col-5">
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button className="btn btn-primary">=</button>
    </div>
  );
};

const Answer = props => {
  return <div className="col-5">...</div>;
};

const Numbers = props => {
  return (
    <div className="card text-center">
      <div>
        <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>
      </div>
    </div>
  );
};

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
