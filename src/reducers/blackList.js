const initState = {
  isFetchingCardList: false,
  cardList: [],


}

export default function(state = initState, action) {
  switch(action.type) {
    case "RequestBankList":
      return Object.assign(state, { isFetchingCardList: true });
    case "ReceiveCardList":
      return Object.assign(state, { isFetchingCardList: false, cardList: action.list });
    default:
      return state;
  }
}
