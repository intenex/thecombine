import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";
import ArticlePage from "./ArticlePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import EditArticlePage from "./EditArticlePage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/view/:articleId/edit" component={EditArticlePage} />
        <Route path="/view/:articleId" component={ArticlePage} />
        <Route path="/editor">
          <EditorPage />
        </Route>
        {/* <Route path="/">
          <ViewerPage />
        </Route> */}
      </Switch>
    </div>
  );
}
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
