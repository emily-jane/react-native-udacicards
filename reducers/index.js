import {
  GET_DECKS,
  DELETE_DECK,
  ADD_DECK_TITLE,
  ADD_CARD_TO_DECK
} from '../actions';

function decks (state = [], action) {
  switch (action.type) {
    case GET_DECKS :
      console.log('state', ...state)
      return [
        ...action.payload
      ]
    case ADD_DECK_TITLE :
      return [
        ...state,
        action.payload
      ]
    case ADD_CARD_TO_DECK :
      return [
        ...state,
        action.payload
      ]
    default :
      return [
        ...state
      ]
  }
}

export default decks;
