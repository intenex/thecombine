import React from "react";
import "./App.css";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

class Header extends React.Component<Props> {
  render() {
    const linkTo =
      this.props.location.pathname === "/editor" ? "/viewer" : "/editor";
    const editor = this.props.location.pathname === "/editor";
    return (
      <div className="header">
        <div className="row">
          <div className="col-2">
            <h3 className="ml-3">ColabLearn</h3>
          </div>
          <div className="col-8 d-flex flex-row justify-content-end">
            {editor ? (
              <button
                type="button"
                className="btn btn-primary contributeButton"
              >
                Submit your change
              </button>
            ) : (
              <Link to={linkTo}>
                <button
                  type="button"
                  className="btn btn-primary contributeButton"
                >
                  Contribute
                </button>
              </Link>
            )}
          </div>
          <div className="col-2">
            <img
              className="topUserImage mr-3"
              src="assets/userbubble.png"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
