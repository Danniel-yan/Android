import { get, post, mock } from 'utils/fetch';

export function RequestCardList() {
  return { type: "RequestBankList" };
}

export function ReceiveCardList(list) {
  return {
    type: "ReceiveBankList",
    list
  };
}

export function CardList() {
  return dispatch => {
    dispatch(RequestBankList())
    mock("/payctcf/cardlist").then(response => {
      console.log(response);
      dispatch(ReceiveBankList(response.data));
    })
  }
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
