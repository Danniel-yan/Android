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
  return (dispatch, getState) => {

    dispatch(RequestCardList())
    mock("/payctcf/cardlist").then(response => {

      var cardList = response.data || [];
      var state = getState(),
        bLData = state.blackListData, selectedCard = bLData.selectedCard;
      dispatch(ReceiveCardList(cardList));
      if(!selectedCard || !selectedCard.id) {
        cardList.length > 0 && dispatch(SelectCard(cardList[0]));
      }
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
      return response;
    })
  }
}

function PaymentStart() {
  return { type: "PaymentStart" };
}

function PaymentSended(success) {
  return { type: "PaymentSended", success };
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
      if(response.res !== responseStatus.success) return dispatch(PaymentSended(false));
      dispatch(PaymentSended(true));
      // dispatch(CardList());
    })

  }
}

export function SubmitPayment() {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData;
    if(bLData.paymentStart) return null; // 原则上一个账单创建过程中不要开始另一个, View上也会有防守。

    dispatch(PaymentStart());
    dispatch(CreateBlackListTicket()).then((ticketResponse) => {
      console.log("ticketResponse");
      console.log(ticketResponse);
      if(ticketResponse && ticketResponse.data.result) return dispatch({type: "PaymentEnd", success: true}); // 免费情况下直接跳转 支付成功
      dispatch(CreatePayment())
    }).then()
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
    var state = getState(), bLData = state.blackListData;
    if(bLData.paymentStart) return null;
    return dispatch({type: "ClearPaymentInfo"});
  }
}
