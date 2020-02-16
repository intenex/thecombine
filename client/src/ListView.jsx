import React from "react";
import "./App.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/List";

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { articles } = this.props;
    return (
      <List>
        {articles.map(article => {
          <ListItem>{article}</ListItem>;
        })}
      </List>
    );
  }
}
