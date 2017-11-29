import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:Decks';

const dummyData = [
  {
    title: 'React',
    score: null,
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  {
    title: 'JavaScript',
    score: null,
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
  {
    title: 'Redux',
    score: null,
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  {
    title: 'French',
    score: null,
    questions: [
      {
        question: 'How do you say thank you in French?',
        answer: 'Merci',
      },
      {
        question: 'What is the Capital of France?',
        answer: 'The capital of France is Paris',
      },
    ],

  },
  {
    title: 'German',
    score:
      null,
    questions:
      [
        {
          question: 'How do you say thank you?',
          answer: 'Danke',
        },
        {
          question: 'What is the Capital of Germany?',
          answer: 'The capital of Germany is Berlin',
        },
      ],
  },
  {
    title: 'Italian',
    score: null,
    questions: [
      {
        question: 'How do you say thank you in Italian?',
        answer: 'Grazie',
      },
      {
        question: 'What is the Capital of Italy?',
        answer: 'The capital of Italy is Rome',
      },
    ],
  },
];

function setDummyData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

export function fetchDecks() {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return results ? JSON.parse(results) : setDummyData()
    });
}

export function createDeck(newDeck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = results ? JSON.parse(results) : []
      data.push(newDeck);
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      return (data);
    });
}
