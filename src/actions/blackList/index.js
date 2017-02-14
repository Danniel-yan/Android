import { get, post, mock } from 'utils/fetch';

export function RequestCardList() {
  return { type: "RequestCardList" };
}

export function ReceiveCardList(list) {
  return {
    type: "ReceiveCardList",
    list
  };
}

export function CardList() {
  return dispatch => {
    dispatch(RequestCardList())
    mock("/payctcf/cardlist").then(response => {
      console.log(response);
      var cardList = response.data || [];
      dispatch(ReceiveCardList(cardList));
      cardList.length > 0 && dispatch(SelectCard(cardList[0]))
    })
  }
}

export function AddCard(card) {
  return { type: "AddCard", card };
}

export function SelectCard(card) {
  return { type: "SelectCard", selectedCard: card }
}

export function RequestCreate() {
  return { type: "RequestCreateBlackList" };
}

export function ReceiveBlackListTicket(ticket) {
  return {
    type: "ReceiveBlackListTicket",
    ticket
  };
}

export function CreateBlackListTicket(body) {
  return dispatch => {
    dispatch(RequestCreate());

    mock("/blaclist/create", body).then(response => {
      dispatch(ReceiveBlackListTicket());
      console.log(response);
    })
  }
}
