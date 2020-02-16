import React from "react";
import "./App.css";
import Header from "./Header";
import ListView from "./ListView";
import MainContentView from "./MainContentView";

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], article: [] };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    const data = fetch("/api/articles")
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles: articles, article: articles[0] });
      });
    return data;
  }

  render() {
    console.log("loeaded");
    return (
      <>
        <Header />
        <div className="row">
          <div className="col-2 bg-light">
            <ListView articles={this.state.articles} />
          </div>
          <div className="col-8">
            <MainContentView article={this.state.article} />
          </div>
          <div className="col-2"></div>
        </div>
      </>
    );
  }
}
