import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ListView from "./ListView";
import MainContentView from "./MainContentView";

export interface Article {
  id: Number;
  title: string;
  body: { content: string };
}

type ArticleParams = { articleId: string };

interface Props extends RouteComponentProps<ArticleParams> {}

interface State {
  articles: Article[];
  article?: Article;
}

export default class ArticlePage extends React.Component<Props, State> {
  state: State = {
    articles: []
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = async () => {
    const {
      match: { params }
    } = this.props;
    const response = await fetch("/api/articles");
    const articles: Article[] = await response.json();
    let selectedArticle = undefined;
    if (params && params.articleId) {
      selectedArticle = articles.find(
        article => article.id === parseInt(params.articleId)
      );
    }
    this.setState({ articles, article: selectedArticle });
  };

  render() {
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
