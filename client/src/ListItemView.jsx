import React from "react";
import "./App.css";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/List";

export default class ListItemView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { article } = this.props;
    return (
      <ListItem button>
        <ListItemText className="ml-3">{article}</ListItemText>
      </ListItem>
    );
  }
}
