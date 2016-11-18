const initState = { isFetching: false, cards: [] };

export default function homeCardList(state = initState, action) {
  switch(action.type) {
    case 'requestCards':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveCards':
      return Object.assign({}, state, { isFetching: false, cards: action.cards } )
    default:
      return state
  }
}
