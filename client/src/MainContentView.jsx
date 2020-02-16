import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faEye,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { BootstrapTooltip, HtmlTooltip } from "./hocs/util";

export default class MainContentView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { article } = this.props;
    return (
      <div className="p-5 container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h3 className="mb-1">Intro to Programming</h3>
            <h1 className="font-weight-bold mt-1">{article.title}</h1>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <img className="collaborators" src="assets/userbubble.png" />
                <img
                  className="collaborators overlap"
                  src="assets/userbubble.png"
                />
              </div>
              <div className="d-flex flex-row align-items-center reaction">
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                <div className="mr-3 reactionNumber">1496</div>
                <FontAwesomeIcon icon={faComment} className="mr-1" />
                <div className="mr-3 reactionNumber">56</div>

                <div className="mr-3 reactionNumber">234</div>
                <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                <div className="reactionNumber">34</div>
              </div>
            </div>
            <p className="mt-2 lastEdited">Last edited: 02/14/2020</p>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                  <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                </React.Fragment>
              }
            >
              <p data-tip="hello world" className="mt-5">
                Being a developer isn't just hacking away into the wee hours of
                the morning or debugging a new feature. In order to become a
                well-rounded developer we should also understand what tools we
                need and a minimum understanding of how they work. This includes
                setting up our computers for development. Here at App Academy we
                work with a Ruby on Rails, JavaScript, React, Redux, and
                PostgresSQL stack. A stack is simply a collection of software
                and hardware used in development of an application. For our
                specific purposes we are using Ruby on Rails on the
                backend/server, PostgresSQL to house our database, and
                JavaScript + React + Redux for frontend rendering and logic. As
                we progress through the course you will be prompted to complete
                a few installation and configuration steps to get your personal
                machine ready for the next phase.
              </p>
            </HtmlTooltip>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}
