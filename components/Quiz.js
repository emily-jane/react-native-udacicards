import React, { Component } from 'react';
import {
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { darkGreen, brightGreen, red, white, darkOrange, lightGrey } from '../utils/colours';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCompleted: 0,
      score: 0,
      isFlipped: false
    }
  }

  addCard() {
    this.props.navigation.navigate('NewCard', this.props.deck)
  }

  restartQuiz() {
    this.props.navigation.navigate('Quiz', this.props.deck)
  }

  noQuestions() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          There are not yet any questions in this quiz!
        </Text>
        <TouchableOpacity onPress={this.addCard.bind(this)} style={[styles.submitBtn, {backgroundColor: darkGreen}]}>
          <Text style={styles.submitBtnText}>Add Question</Text>
        </TouchableOpacity>
      </View>
    )
  }

  quizCompleted() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          QUIZ COMPLETED!
        </Text>
        <Text style={styles.questionTally}>
          Final score is {this.state.score} out of {this.props.deck.questions.length}
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.restartQuiz.bind(this)} style={[styles.submitBtn, {backgroundColor: darkOrange}]}>
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  questionCorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1,
      score: prevState.score + 1,
      isFlipped: false
    }))
  }

  questionIncorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1,
      isFlipped: false
    }))
  }

  renderFront(question, questionsCompleted, questionCount) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionTally}>Question {questionsCompleted + 1} of {questionCount}</Text>
        <TouchableOpacity style={styles.questionCard} onPress={this.flipCard.bind(this)}>
          <Text style={styles.cardText}>{question}</Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <Text style={[styles.questionTally, {fontSize: 18}]}>Flip card for the answer!</Text>
        </View>
      </View>
    );
  };

  renderBack(answer, questionsCompleted, questionCount) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionTally}>Question {questionsCompleted + 1} of {questionCount}</Text>
        <TouchableOpacity style={styles.questionCard} onPress={this.flipCard.bind(this)}>
          <Text style={styles.cardText}>{answer}</Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.questionCorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: brightGreen}]}>
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.questionIncorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: red}]}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  flipCard() {
    this.setState({isFlipped: !this.state.isFlipped});
  };

  render() {
    const { title, questions } = this.props.deck;
    const { questionsCompleted } = this.state;
    const questionCount = questions.length;

    if (questionCount === 0) {
      return this.noQuestions();
    }

    if (questionsCompleted === questionCount) {
      return this.quizCompleted();
    }

    const { question, answer } = this.props.deck.questions[questionsCompleted];

    return (
        <FlipView style={{flex: 1}}
                  front={this.renderFront(question, questionsCompleted, questionCount)}
                  back={this.renderBack(answer, questionsCompleted, questionCount)}
                  isFlipped={this.state.isFlipped}
                  onFlipped={(val) => {console.log('Flipped: ' + val);}}
                  flipAxis="y"
                  flipEasing={Easing.out(Easing.ease)}
                  flipDuration={500}
                  perspective={1000}/>
    )
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  questionTally: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionCard: {
    flex: 2,
    padding: 20,
    backgroundColor: lightGrey,
    marginLeft: 15,
    marginRight: 15,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: darkGreen,
    borderRadius: 6,
    width: 300
  },
  cardText: {
    fontSize: 24,
    color: darkGreen
  },
  btnContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    padding: 10,
    height: 40,
    borderRadius: 6,
    alignSelf: 'center',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
})

function mapStateToProps (state, ownProps) {
  return {
    deck: state.find(deck => deck.title === ownProps.navigation.state.params.title)
  }
};

export default connect(mapStateToProps, {})(Quiz);
