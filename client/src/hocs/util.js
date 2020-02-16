import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export function BootstrapTooltip(props) {
  const classes = makeStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.black
    }
  }));
  return <Tooltip arrow classes={classes} {...props} />;
}

export const HtmlTooltip = withStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);
