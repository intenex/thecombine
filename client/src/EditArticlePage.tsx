import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Header from "./Header";
import ReactQuill, { Quill } from "react-quill";
import { Markup } from "interweave";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { getArticles, updateArticle } from "./functions/articleFunctions";
import { Article } from "./types/articleTypes";

type ArticleParams = { articleId: string };

interface Props extends RouteComponentProps<ArticleParams> {}

interface State {
  articles: Article[];
  article?: Article;
  title: string;
  body: string;
}

export default class EditArticlePage extends React.Component<Props> {
  state: State = {
    articles: [],
    title: "",
    body: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    getArticles().then(articles => {
      const selectedArticle = articles.find(
        article => article.id === parseInt(params.articleId)
      );
      this.setState({
        articles,
        article: selectedArticle,
        title: selectedArticle ? selectedArticle.title : "",
        body:
          selectedArticle && selectedArticle.body
            ? selectedArticle.body.content
            : "",
        loading: false
      });
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleBodyChange = (value: string) => {
    this.setState({ body: value });
  };

  handleArticleUpdate = async () => {
    const {
      match: {
        params: { articleId }
      }
    } = this.props;
    const { title, body, article } = this.state;
    const id = article ? article.id : null;
    if (!id) return;
    const postBody: Article = { id, title, body: { content: body } };
    updateArticle(postBody);
    this.props.history.push(`/view/${articleId}`);
  };

  render() {
    const { articles, title, body } = this.state;

    return (
      <>
        <div className="App">
          <Header onSubmit={this.handleArticleUpdate} />
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
