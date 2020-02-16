import React from "react";
import "./App.css";
import Header from "./Header";
import List from "@material-ui/core/List";
import ListView from "./ListView";

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getArticles() {
    return [
      "Getting Started",
      "Introduction to Ruby",
      "Enumerables and Debugging"
    ];
  }

  render() {
    return (
      <>
        <Header />
        <div className="row">
          <div className="col-2 bg-light">
            <ListView articles={getArticles()} />
          </div>
          <div className="col-8 bg-secondary">main content</div>
          <div className="col-2 bg-success">space</div>
        </div>
      </>
    );
  }
}
