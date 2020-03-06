import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import RadioPercentage from "./RadioPercentage";
import ErrorMessage from "./ErrorMessage";
import synonymService from './services/synonymService';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
});

class App extends React.Component {
  state = {
    answer: '',
    isDisabled: false,
    userAnswer: '',
    noAnswerOnSubmit: false,
    words: [],
    synonym: '',
    totalQuestions: 1,
    correctAnswers: 0,
    aiCorrectAnswers: 0,
  }

  componentWillMount() {
    synonymService.getQuestion().then(question => {
      this.setState(question)
    });
  }

  handleSubmit = (e) => {
    if (!this.state.userAnswer) {
      this.setState({noAnswerOnSubmit: true});
    }
    else {
      if (this.state.userAnswer === this.state.answer) this.setState({correctAnswers: this.state.correctAnswers+1});

      let maxPercentage = Math.max(...this.state.words.map(word => word.percentage));

      let aiWordChoices = [];
      this.state.words.forEach((wordObj) => {
        if (wordObj.percentage === maxPercentage) aiWordChoices.push(wordObj.word); 
      });

      if (aiWordChoices.includes(this.state.answer)) this.setState({aiCorrectAnswers: this.state.aiCorrectAnswers+1});

      this.setState({ isDisabled: true, noAnswerOnSubmit: false });
    }
  }

  handleNext = (e) => {
    synonymService.getQuestion().then(question => {
      this.setState(question);
    }).then(() => {
      this.setState({
        userAnswer: '', 
        isDisabled: false,
        noAnswerOnSubmit: false,
        totalQuestions: this.state.totalQuestions+1,
      });
    });
  }

  handleChange = (e) => {
    this.setState({userAnswer: e.target.value});
  }

  render() {
    const { classes } = this.props;

    const radioItems = this.state.words.map((elem,idx) =>
      <RadioPercentage
        userAnswer={this.state.userAnswer}
        answer={this.state.answer}
        isDisabled={this.state.isDisabled}
        label={elem.word}
        value={elem.word}
        percentage={elem.percentage}
        key={idx}
        />
    );

    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <div>Correct user answers per question: {this.state.correctAnswers}/{this.state.totalQuestions}</div>
          <div>Correct AI answers per question: {this.state.aiCorrectAnswers}/{this.state.totalQuestions}</div>
          <FormLabel component="legend">
            Select the closest synonym to <b>{this.state.synonym}</b>:
          </FormLabel>
          <ErrorMessage isDisplayed={this.state.noAnswerOnSubmit}/>
          <RadioGroup aria-label="synonym" name="synonym1" value={this.state.userAnswer} onChange={this.handleChange}>
            { radioItems }            
          </RadioGroup>
          <Box m={2}>
            <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
            <Button color="primary" onClick={this.handleNext}>Next Question</Button>
          </Box>
        </FormControl>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
