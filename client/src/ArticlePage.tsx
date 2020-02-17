import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ListView from "./ListView";
import MainContentView from "./MainContentView";
import { getArticles } from "./functions/articleFunctions";
import { Article } from "./types/articleTypes";

type ArticleParams = { articleId: string };

interface Props extends RouteComponentProps<ArticleParams> {}

interface State {
  articles: Article[];
  article?: Article;
  loading: boolean;
}

export default class ArticlePage extends React.Component<Props, State> {
  state: State = {
    articles: [],
    loading: false
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
      this.setState({ articles, article: selectedArticle, loading: false });
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div className="row">
          <div className="col-2 bg-light">
            <ListView articles={this.state.articles} />
          </div>
          <div className="col-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <MainContentView article={this.state.article} />
            )}
          </div>
          <div className="col-2"></div>
        </div>
      </>
    );
  }
}
