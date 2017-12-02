import React, { Component } from 'react';
import {
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { darkGreen, brightGreen, red, white, darkOrange } from '../utils/colours';
import { connect } from 'react-redux';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCompleted: 0,
      score: 0
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard() {
    console.log('flipping')
    if (this.value >= 90) {
      console.log('front')
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
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

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    if (questionCount === 0) {
      return this.noQuestions();
    }

    if (questionsCompleted === questionCount) {
      return this.quizCompleted();
    }

    const { question, answer } = this.props.deck.questions[questionsCompleted];

    return (
      <View style={styles.container}>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
              This text is flipping on the front.
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              This text is flipping on the back.
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip!</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30
  },
  questionTally: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
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
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    // transform: [{rotateY: '180deg'}]
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
})

function mapStateToProps (state, ownProps) {
  return {
    deck: state.find(deck => deck.title === ownProps.navigation.state.params.title)
  }
};

export default connect(mapStateToProps, {})(Quiz);
