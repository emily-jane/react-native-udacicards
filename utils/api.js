import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:Decks';

const dummyData = [
  {
    title: 'React',
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
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
  {
    title: 'Redux',
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

export function createDeckCard(newCard) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results).map((deck) => {
        return deck.title === newCard.title ? {title: deck.title, questions: [...deck.questions, ...newCard.questions]} : deck
      });
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      return (data);
    });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results).filter((deck) => {
        return deck.title !== title
      });
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      return (data);
    })
}
