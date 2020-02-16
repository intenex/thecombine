import React from "react";
import "./App.css";
import List from "@material-ui/core/List";
import ListItemView from "./ListItemView";

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
  }
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
