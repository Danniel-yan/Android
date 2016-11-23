const initState = { isFetching: false, fetched: false, cards: [] };

export default function homeCardList(state = initState, action) {
  switch(action.type) {
    case 'requestCards':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveCards':
      return Object.assign({}, state, { isFetching: false, fetched: true, cards: action.cards } )
    default:
      return state
  }
}
