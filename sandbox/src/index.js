import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Card = props => {
  return (
    <div>
      <img width="75" src={props.avatar_url} alt="" />
      <div className="info">
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  // by using the spread operator, we are passing all of the data in the object to the component
  return (
    <div>
      {props.cards.map(x => (
        <Card key={`${x.name}:${x.company}`} {...x} />
      ))}
    </div>
  );
};

class Form extends Component {
  state = {
    userName: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Event: Form Submit", this.state.userName);
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(response => response.json())
      .then(data => console.log(data));
  };

  render() {
    // we want to read the value in the form everytime we submit. by using onSubmit, it will honor the required tag on the input
    return (
      <form onSubmit={this.handleSubmit}>
        {/* we want to read the input passed in, so we give it a func executed when the element is mounted in the dom
        we create the variable and access in our handleSubmit func.
        put the ref in the input tag
        ref={input => this.userNameInput = input}*/}
        {/*adding a value attribute and a state entry to create a controlled element. We now define an onChange func to customize its controlled behavior*/}
        <input
          type="text"
          // adding value tag creates a controlled element
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends Component {
  state = {
    cards: [
      {
        name: "Johnny Tsunami",
        avatar_url: "https://avatars3.githubusercontent.com/u/8900894?v=4",
        company: "Good Burger"
      },
      {
        name: "Jannie Tsunami",
        avatar_url: "https://avatars3.githubusercontent.com/u/8900894?v=4",
        company: "Mondo Burger"
      }
    ]
  };

  render() {
    return (
      <div>
        <Form />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
