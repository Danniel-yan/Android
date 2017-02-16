import { get, post, mock } from 'utils/fetch';

import { creditScore } from 'actions/online/userInfo';

function RequestFreeStatus() {
  return { type: "RequestFreeStatus" };
}

function ReceiveFreeStatus(free) {
  return { type: "ReceiveFreeStatus", free };
}

export function FreeStatus() {
  return (dispatch, getState) => {
    dispatch(RequestFreeStatus());

    dispatch(creditScore()).then(() => {
      var state = getState(), score = state.online.userInfo ? state.online.userInfo.creditScore : 0;

      if(score < 70) { return dispatch(ReceiveFreeStatus(false)) }
      return mock("/blaclist/check-free").then(response => {
        dispatch(ReceiveFreeStatus(response.data && response.data.result == 0))
      })
    });
  }
}

export function BlackListReports() {
  return (dispatch, getState) => {

  };
}

export function InitalBlackListTarget(target) {
  return { type: "InitalBlackListTarget", target }
}

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

function RequestBlackListTicket() {
  return { type: "RequestBlackListTicket" };
}

function ReceiveBlackListTicket(ticket) {
  return {
    type: "ReceiveBlackListTicket",
    ticket
  };
}

function CreateBlackListTicket(body) {
  return (dispatch, getState) => {
    dispatch(RequestBlackListTicket());
    var state = getState(),
      body = state && state.blackListData ? state.blackListData.target : null;

    if(!body) return null;
    console.log("CreateTicket");
    console.log(body);
    return mock("/blaclist/create", body).then(response => {
      dispatch(ReceiveBlackListTicket(response.data.ticket_id));
      console.log(response);
    })
  }
}

function PaymentStart() {
  return { type: "PaymentStart" };
}

function PaymentSended() {
  return { type: "PaymentSended" };
}

function CreatePayment() {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData, body;
    var { ticket, selectedCard } = bLData;
    if(!ticket || !selectedCard) return null;
    body = selectedCard.id ? {
      bindcard_id: selectedCard.id
    } : {
      realname: selectedCard.name,
      idnum: selectedCard.idnum,
      mobile: selectedCard.mobile,
      cardnum: selectedCard.cardnum
    };
    body.ticket_id = ticket;

    dispatch(PaymentStart());
    console.log("CreatePayment");
    console.log(body);
    return mock("/payctcf/create", body).then(response => {
      dispatch(PaymentSended());
    })

  }
}

export function SubmitPayment() {
  return (dispatch) => {
    dispatch(CreateBlackListTicket()).then(() => {
      dispatch(CreatePayment())
    })
  }
}

export function ClearPaymentInfo() {
  return (dispatch, getState) => {
    var state = getState();
    if(state.paymentStart) return null;
    return dispatch({type: "ClearPaymentInfo"})
  }
}
