import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export function BootstrapTooltip(props) {
  const classes = makeStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.black,
      marginRight: 20,
      marginLeft: 20
    }
  }));
  return <Tooltip open={true} arrow classes={classes} {...props} />;
}

export const HtmlTooltip = withStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    height: 40,
    alignItem: "center",
    marginTop: 6,
    marginRight: 15,
    padding: 3
  }
}))(<Tooltip arrow />);
