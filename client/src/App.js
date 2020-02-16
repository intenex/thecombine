import React from "react";
import "./App.css";

class App extends React.Component {
  // Initialize state
  state = { articles: [] };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getArticles();
  }

  // getPasswords = () => {
  //   // Get the passwords and store them in state
  //   fetch("/api/passwords")
  //     .then(res => res.json())
  //     .then(passwords => this.setState({ passwords }));
  // };

  getArticles = () => {
    // get articles and store them in state
    fetch("/api/articles")
      .then(res => res.json())
      .then(articles => this.setState({ articles }));
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {articles.length ? (
          <div>
            <h1>Articles</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {articles.map((article, index) => (
                <li key={index}>{article}</li>
              ))}
            </ul>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No articles :(</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;
