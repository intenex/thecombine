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
      match: {
        params: { articleId }
      }
    } = this.props;
    if (articleId) {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE"
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    }
  };

  render() {
    const {
      match: {
        params: { articleId }
      }
    } = this.props;
    const { pathname } = this.props.location;
    const linkTo = pathname.includes("/editor") ? "/viewer" : "/editor";
    const editor = pathname.includes("edit");
    let maybeEditAndDeleteButtons = <></>;
    if (articleId && pathname.includes(`/view/${articleId}`) && !editor) {
      // then we should show edit and delete buttons
      const editPage = `/view/${articleId}/edit`;
      maybeEditAndDeleteButtons = (
        <>
          <Link to={editPage}>
            {" "}
            <button type="button" className="btn btn-primary contributeButton">
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
