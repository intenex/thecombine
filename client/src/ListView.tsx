import React from "react";
import "./App.css";
import List from "@material-ui/core/List";
import ListItemView from "./ListItemView";
import { Article } from "./ArticlePage";

interface Props {
  articles: Article[];
}

export default class ListView extends React.Component<Props> {
  render() {
    const { articles } = this.props;
    return (
      <List>
        {articles.map(article => {
          return <ListItemView article={article} />;
        })}
      </List>
    );
  }
}
