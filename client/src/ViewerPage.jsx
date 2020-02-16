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
    const data = fetch("/api/articles")
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles });
      });
    console.log(data);
  }

  render() {
    return (
      <>
        <Header />
        <div className="row">
          <div className="col-2 bg-light">
            <ListView articles={this.getArticles()} />
          </div>
          <div className="col-8 bg-secondary">main content</div>
          <div className="col-2 bg-success">space</div>
        </div>
      </>
    );
  }
}
