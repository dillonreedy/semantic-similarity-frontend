import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ProgressBarWrapper from "./ProgressBar";
import './RadioPercentage.css';

class RadioPercentage extends React.Component {

  render() {
    let labelClass = '';
    if (this.props.isDisabled) {
        if (this.props.userAnswer === this.props.value &&
            this.props.userAnswer !== this.props.answer)
        {
            labelClass = 'wrong-answer';
        }
        if (this.props.answer === this.props.value)
        {
            labelClass = 'right-answer';
        }
    }
    const radioLabel = <span className={labelClass}>{this.props.label}</span>;

    return (
      <div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            width: 150
          }}
        >
          <FormControlLabel
            value={this.props.value}
            control={<Radio color="default"/>}
            disabled={this.props.isDisabled}
            label={radioLabel}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "middle"
          }}
        >
          <ProgressBarWrapper percentage={this.props.percentage} />
        </div>
      </div>
    );
  }
}

export default RadioPercentage;
