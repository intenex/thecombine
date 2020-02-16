import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faEye,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { Markup } from "interweave";
import { BootstrapTooltip, HtmlTooltip } from "./hocs/util";
import { Article } from "./ViewerPage";

interface Props {
  article?: Article;
}

export default class MainContentView extends React.Component<Props> {
  render() {
    const { article } = this.props;

    if (!article) {
      return <div>Sorry, we couldn't find this article...</div>;
    }

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
                {article.body ? (
                  <Markup content={article.body.content} />
                ) : (
                  "Nothing here"
                )}
              </p>
            </HtmlTooltip>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}
