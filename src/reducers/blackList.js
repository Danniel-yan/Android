const initState = {
  isFetchingCardList: true,
  cardList: [],
  selectedCard: null,

  target: null,
  isFetchingTicket: false,
  ticket: null,
  paymentStart: false,
  paymentSended: false,
  paymentEnd: false,

  error: null,
  stateMsg: ""
}

export default function(state = initState, action) {
  switch(action.type) {
    case "InitalBlackListTarget":
      return Object.assign({}, state, { target: action.target });

    case "RequestBlackListTicket":
      var newState = Object.assign({}, state, { paymentStart: true, isFetchingTicket: true, stateMsg: "正在创建账单" });
      newState.ticket = null;
      return newState;
    case "ReceiveBlackListTicket":
      return Object.assign({}, state, { ticket: action.ticket, isFetchingTicket: false, stateMsg: "账单已创建" });

    case "PaymentStart":
      return Object.assign({}, state, { paymentStart: true, paymentSended: false, paymentEnd: false, stateMsg: "正在发送验证码" });
    case "PaymentSended":
      return Object.assign({}, state, { paymentStart: false, paymentSended: true, paymentEnd: false, stateMsg: "验证码已发送" });
    case "paymentEnd":
      return Object.assign({}, state, { paymentStart: false, paymentSended: false, paymentEnd: true, stateMsg: "支付完成" });

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
