import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "./App.css";

interface Props extends RouteComponentProps<OptionalArticleParams> {
  onSubmit?: () => unknown;
}

type OptionalArticleParams = { articleId?: string };

class Header extends React.Component<Props> {
  handleDelete = async () => {
    const {
      match: { params }
    } = this.props;
    if (params.articleId) {
      const response = await fetch(`/api/articles/${params.articleId}`, {
        method: "DELETE"
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
    }
  };

  render() {
    const {
      match: { params }
    } = this.props;
    const { pathname } = this.props.location;
    const linkTo = pathname === "/editor" ? "/viewer" : "/editor";
    const editor = pathname === "/editor";
    let maybeEditAndDeleteButtons = <></>;
    if (params.articleId) {
      if (pathname === `/view/${params.articleId}`) {
        // then we should show edit and delete buttons
        const editPage = pathname + "/edit"; // create this route later to edit
        maybeEditAndDeleteButtons = (
          <>
            <Link to={editPage}>
              {" "}
              <button
                type="button"
                className="btn btn-primary contributeButton"
              >
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary contributeButton"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </>
        );
      }
    }
    return (
      <div className="Header__header">
        <div className="row">
          <div className="col-2">
            <h3 className="ml-3 Header__logoImage">ColabLearn</h3>
          </div>
          <div className="col-8 d-flex flex-row justify-content-end">
            {editor ? (
              <button
                type="button"
                className="btn btn-primary Header__actionButton"
                onClick={this.props.onSubmit}
              >
                Submit your change
              </button>
            ) : (
              <Link to={linkTo}>
                <button
                  type="button"
                  className="btn btn-primary Header__actionButton"
                >
                  Contribute
                </button>
              </Link>
            )}
            {maybeEditAndDeleteButtons}
          </div>
          <div className="col-2">
            <img
              className="Header__topUserImage mr-3"
              src="assets/mai-headshot.png"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
