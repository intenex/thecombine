import React from "react";
import "./App.css";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Article } from "./types/articleTypes";

interface Props {
  article: Article;
}

export default class ListItemView extends React.Component<Props> {
  render() {
    const { article } = this.props;
    return (
      <ListItem button>
        <ListItemText className="ml-3">{article.title}</ListItemText>
      </ListItem>
    );
  }
}
