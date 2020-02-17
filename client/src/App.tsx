import React from "react";
import ReactQuill, { Quill } from "react-quill";
import Interweave from "interweave";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { Article } from "./types/articleTypes";

class App extends React.Component {
  // Initialize state
  state: { articles: Article[]; title: string; body: string } = {
    articles: [],
    title: "",
    body: ""
  };

  // Fetch articles after first mount
  componentDidMount() {
    this.getArticles();
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleBodyChange = (value: string) => {
    this.setState({ body: value });
    console.log(value);
  };

  handleArticleSubmit = async () => {
    const { title, body } = this.state;
    const postBody = { title, body: { content: body } };
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody)
    });
    this.getArticles();
  };

  getArticles = () => {
    // get articles and store them in state
    fetch("/api/articles")
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles });
        console.log(articles);
      });
  };

  render() {
    const { articles } = this.state;

    return (
      <>
        <div className="App">
          {/* Render the articles if we have them */}
          {articles.length ? (
            <div>
              <h1>Articles</h1>
              <ul className="articles">
                {articles.map((article: Article, index) => (
                  <>
                    <ul>
                      <li key={index}>{article.title}</li>
                      {article.body ? (
                        <Interweave content={article.body.content} />
                      ) : (
                        "Nothing here"
                      )}
                    </ul>
                  </>
                ))}
              </ul>
            </div>
          ) : (
            // Render a helpful message otherwise
            <div>
              <h1>No articles :(</h1>
            </div>
          )}
        </div>
        <label>
          Title:{" "}
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Body:{" "}
          <ReactQuill
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
        </label>
        <button onClick={this.handleArticleSubmit}>Save Article</button>
      </>
    );
  }
}

export default App;
