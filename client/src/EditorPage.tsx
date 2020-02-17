import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import { postArticle } from "./functions/articleFunctions";
import { NewArticle } from "./types/articleTypes";

interface Props extends RouteComponentProps {}

interface State {
  title: string;
  body: string;
}

class EditorPage extends React.Component<Props> {
  state: State = {
    title: "",
    body: ""
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleBodyChange = (value: string) => {
    this.setState({ body: value });
  };

  handleArticleSubmit = async () => {
    const { title, body } = this.state;
    const postBody: NewArticle = { title, body: { content: body } };
    const newArticle = await postArticle(postBody);
    this.props.history.push(`/view/${newArticle.id}`);
  };

  render() {
    const { title, body } = this.state;

    return (
      <>
        <div className="App">
          <Header onSubmit={this.handleArticleSubmit} />
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

export default withRouter(EditorPage);
