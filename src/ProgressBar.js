import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const styles = theme => ({
  progressBar: {
    position: "relative",
    height: 20,
    width: 350,
    borderRadius: 50,
    border: "1px solid #333",
    textAlign: 'center',
  },
  filler: {
    background: "#1DA598",
    height: "100%",
    borderRadius: "inherit",
    transition: "width 1.5s ease-in"
  },
  percentageText: {
    fontFamily: "Roboto",
    padding: 5
  }
});

const Filler = props => {
  return (
    <div
      className={props.className}
      style={{ width: `${props.percentage}%` }}
    >
      {props.percentage}%
    </div>
  );
};
const ProgressBar = props => {
  return (
    <div className={props.className}>
      <Filler className={props.fillerClassName} percentage={props.percentage} />
    </div>
  );
};

class ProgressBarWrapper extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ display: "inline-block", verticalAlign: "middle" }}>
          <ProgressBar
            className={classes.progressBar}
            fillerClassName={classes.filler}
            percentage={this.props.percentage}
          />
        </div>
      </div>
    );
  }
}

ProgressBarWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProgressBarWrapper);
