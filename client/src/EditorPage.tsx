import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import Interweave from "interweave";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import { getArticles, postArticle } from "./functions/articleFunctions";
import { Article, NewArticle } from "./types/articleTypes";

interface Props extends RouteComponentProps {}

interface State {
  articles: Article[];
  title: string;
  body: string;
  loading: boolean;
}

class EditorPage extends React.Component<Props> {
  state: State = {
    articles: [],
    title: "",
    body: "",
    loading: false
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    this.setState({ loading: true });
    getArticles().then(articles => {
      this.setState({ articles });
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleBodyChange = (value: string) => {
    this.setState({ body: value });
  };

  handleArticleSubmit = async () => {
    const { title, body } = this.state;
    const postBody: NewArticle = { title, body: { content: body } };
    postArticle(postBody);
    this.props.history.push("/home");
  };

  render() {
    const { articles, title, body } = this.state;

    return (
      <>
        <div className="App">
          <Header onSubmit={this.handleArticleSubmit} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 d-flex flex-column mt-5">
              <div className="mb-2">
                <input
                  type="text"
                  value={title}
                  onChange={this.handleTitleChange}
                  className="EditorPage__titleInput"
                  placeholder="Type your title"
                />
              </div>
              <ReactQuill
                className="EditorPage__quillEditor"
                value={body}
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
