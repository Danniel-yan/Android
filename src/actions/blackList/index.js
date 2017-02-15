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
      dispatch(ReceiveCardList(response.data));
    })
  }
}

export function AddCard(card) {
  return { type: "AddCard", card };
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
