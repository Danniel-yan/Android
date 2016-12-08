import { get, post, mock, responseStatus } from 'utils/fetch';

import { creditScore } from 'actions/online/userInfo';

export function FreeStatus() {
  return (dispatch, getState) => {
    dispatch({ type: "RequestFreeStatus" });

    dispatch(creditScore()).then(() => {
      var state = getState(), score = state.online.userInfo ? state.online.userInfo.creditScore : 0;

      if(score < 70) { return dispatch(ReceiveFreeStatus(false)) }
      return mock("/blaclist/check-free").then(response => {
        dispatch({type: "ReceiveFreeStatus", free: response.data && response.data.result == 0});
      })
    });
  }
}

export function BlackListReports() {
  return (dispatch, getState) => {
    dispatch({type: "RequestBlackListReports"});

    return mock("/blaclist/check-list").then(response => {
      dispatch({type: "ReceiveBlackListReports", reports: response.data});
    })
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
    var state = getState(), bLData = state.blackListData,
      body = bLData ? bLData.target : null;

    if(!body) return null;
    body.pay_type = bLData.free ? "201" : "101";
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
    return mock("/payctcf/create", body).then(response => {
      dispatch(PaymentSended());
    })

  }
}

export function SubmitPayment() {
  return (dispatch) => {
    dispatch(PaymentStart());
    dispatch(CreateBlackListTicket()).then(() => {
      dispatch(CreatePayment())
    })
  }
}

export function SubmitPayCode(code) {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData,
      ticket_id = bLData ? bLData.ticket : null;

    if(!ticket_id || !code) return;

    dispatch({ type: "PaymentConfirmStart" });
    return mock("/payctcf/confirm", {ticket_id: ticket_id, msgcode: code}).then(response => {
        dispatch({ type: "PaymentEnd", success: response.res == responseStatus.success });
    }).catch(() => dispatch({ type: "PaymentEnd", success: false }));
  };
}

export function ClearPaymentInfo() {
  return (dispatch, getState) => {
    var state = getState();
    if(state.paymentStart) return null;
    return dispatch({type: "ClearPaymentInfo"});
  }
}
