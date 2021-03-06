import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const data = [
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
];

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
        <Card {...x} />
      ))}
      ;
    </div>
  );
};

ReactDOM.render(<CardList cards={data} />, document.getElementById("root"));
