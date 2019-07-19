import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import functions from "../utils/functions";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("<HomePage />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const HomePageCont = props => <h2>test</h2>;
    ReactDOM.render(<HomePageCont />, div);
  });
});
