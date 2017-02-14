const initState = {
  isFetchingCardList: true,
  cardList: [],
  selectedCard: null

}

export default function(state = initState, action) {
  switch(action.type) {
    case "RequestCardList":
      return Object.assign({}, state, { isFetchingCardList: true });
    case "ReceiveCardList":
      return Object.assign({}, state, { isFetchingCardList: false, cardList: action.list });
    case "AddCard":
      var cardList = state.cardList || [], newState = Object.assign({}, state);
      cardList = [action.card].concat(cardList);
      newState.cardList = cardList;
      return newState;
    case "SelectCard":
      var newState = Object.assign({}, state);
      newState.selectedCard = action.selectedCard;
      return newState;
    default:
      return state;
  }
}
