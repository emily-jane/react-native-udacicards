import {
  GET_DECKS,
  DELETE_DECK,
  ADD_DECK_TITLE,
  ADD_CARD_TO_DECK
} from '../actions';

function decks (state = [], action) {
  switch (action.type) {
    case GET_DECKS :
      return action.payload
    case ADD_DECK_TITLE :
      return [
        ...state,
        action.payload
      ]
    case ADD_CARD_TO_DECK :
      return state.map((deck) => {
        return (deck.title === action.payload.title) ? {...deck, questions: [...deck.questions, action.payload.questions[0]]} : deck
      })
    default :
      return [
        ...state
      ]
  }
}

export default decks;
