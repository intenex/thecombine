import React from "react";
import "./App.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="row">
          <div className="col-2">
            <h3 className="ml-3">ColabLearn</h3>
          </div>
          <div className="col-8 d-flex flex-row justify-content-end">
            <button type="button" className="btn btn-primary contributeButton">
              Contribute
            </button>
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
