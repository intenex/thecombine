import React from "react";
import ReactQuill, { Quill } from "react-quill";
import Interweave from "interweave";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface Article {
  id: Number;
  title: string;
  body: { content: string };
}

interface Props extends RouteComponentProps<any> {}

interface State {
  articles: Article[];
  title: string;
  body: string;
}

class EditorPage extends React.Component<Props> {
  // Initialize state
  state: State = {
    articles: [],
    title: "",
    body: ""
  };

  constructor(props: Props) {
    super(props);
  }

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
    this.setState({ title: "", body: "" });
    this.getArticles();
    this.props.history.push("/home");
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
          <Header onSubmit={this.handleArticleSubmit} />
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
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 d-flex flex-column mt-5">
              <div className="mb-2">
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  className="EditorPage__titleInput"
                  placeholder="Type your title"
                />
              </div>
              <ReactQuill
                className="EditorPage__quillEditor"
                value={this.state.body}
                onChange={this.handleBodyChange}
              />
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(EditorPage);
