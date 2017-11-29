import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { darkGreen, brightGreen, red, white, darkOrange } from '../utils/colours';
import { connect } from 'react-redux';
import FlipCard from 'react-native-flip-card';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCompleted: 0,
      score: 0
    }
  }

  addCard() {
    this.props.navigation.navigate('NewCard', this.props.deck)
  }

  restartQuiz() {
    this.props.navigation.navigate('Quiz', this.props.deck)
  }

  noQuestions() {
    console.log('no questions')
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
    console.log('quiz completed')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          QUIZ COMPLETED!
        </Text>
        <Text style={styles.questionTally}>
          Final score is {this.state.score} out of {this.props.deck.questions.length}
        </Text>
        <TouchableOpacity onPress={this.restartQuiz.bind(this)} style={[styles.submitBtn, {backgroundColor: darkOrange}]}>
          <Text style={styles.submitBtnText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }

  questionCorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1,
      score: prevState.score + 1
    }))
  }

  questionIncorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1
    }))
  }

  render() {
    const { title, questions } = this.props.deck;
    const { questionsCompleted } = this.state;
    const questionCount = questions.length;
    console.log(questionsCompleted);

    if (questionCount === 0) {
      return this.noQuestions();
    }

    if (questionsCompleted === questionCount) {
      return this.quizCompleted();
    }

    const { question, answer } = this.props.deck.questions[questionsCompleted];

    return (
      <View style={styles.container}>
        <Text style={styles.questionTally}>Question {questionsCompleted + 1} of {questionCount}</Text>
        <View style={styles.flipCard}>
          <FlipCard
            style={styles.questionCard}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            <View style={styles.question}>
              <Text>{question}</Text>
            </View>
            <View style={styles.answer}>
              <Text>{answer}</Text>
            </View>
          </FlipCard>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.questionCorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: brightGreen}]}>
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.questionIncorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: red}]}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 20
  },
  questionTally: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flipCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    alignSelf: 'stretch'
  },
  questionCard: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    // backfaceVisibility: 'hidden'
  },
  question: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  answer: {
    transform: [{scaleX: -1}],
    flex: 1,
    height: 200,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnContainer: {
    flex: 1
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
