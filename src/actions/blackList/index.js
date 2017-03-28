import { get, post, mock, responseStatus } from 'utils/fetch';

import { creditScore } from 'actions/online/userInfo';

export function FreeStatus() {
  return (dispatch, getState) => {
    dispatch({ type: "RequestFreeStatus" });

    dispatch(creditScore()).then(() => {
      var state = getState(), score = state.online.userInfo ? state.online.userInfo.creditScore : 0;

      // if(score < 20) { return dispatch({type: "ReceiveFreeStatus", free: false}) }


      return get("/blacklist/check-free").then(response => {
        dispatch({type: "ReceiveFreeStatus", free: response.data && response.data.free == 1, hasChance: response.data && response.data.checkmore == 1});
      })
    });
  }
}

export function BlackListReports() {
  return (dispatch, getState) => {
    dispatch({type: "RequestBlackListReports"});

    return get("/blacklist/check-list").then(response => {
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
    get("/payctcf/cardlist").then(response => {

      var cardList = response.data || [];
      var state = getState(),
        bLData = state.blackListData, selectedCard = bLData.selectedCard;
      dispatch(ReceiveCardList(cardList));
      if(!cardList ||!cardList.length) return;
      if(!selectedCard || !selectedCard.id) {
        cardList.length > 0 && dispatch(SelectCard(cardList[0]));
      } else if(selectedCard && selectedCard.id) {

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

function ReceiveBlackListTicket(ticket, error) {
  return {
    type: "ReceiveBlackListTicket",
    ticket,
    error
  };
}

export function CreateBlackListTicket() {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData, body = bLData.target;
    if(!body) return null;
    body.pay_type = bLData.free ? "201" : "101";

    dispatch(RequestBlackListTicket());
    return post("/blacklist/create", body).then(response => {
      if(response.res !== responseStatus.success) {
        dispatch(ReceiveBlackListTicket(null, response.msg));
        return response;
      }
      dispatch(ReceiveBlackListTicket(response.data.ticket_id));

      // 免费情况下， 创建ticket成功的同时， 查询已完成。
      if(bLData.free && response.data.blacklist_result) {
        dispatch({ type: "PaymentEnd", success: true });
        dispatch({ type: "ReceiveReportResult", result: response.data.blacklist_result });
      }

      return response;
    })
  }
}

function PaymentStart() {
  return { type: "PaymentStart" };
}

function PaymentSended(success, error) {
  return { type: "PaymentSended", success, error };
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
    return post("/payctcf/create", body).then(response => {
      if(response.res !== responseStatus.success) return dispatch(PaymentSended(false, response.msg || response.data.msg));
      dispatch(PaymentSended(true));
    })

  }
}

export function SubmitPayment() {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData;
    if(bLData.paymentStart) return null; // 原则上一个账单创建过程中不要开始另一个, View上也会有防守。

    dispatch(PaymentStart());
    //dispatch(CreateBlackListTicket()).then((ticketResponse) => {
      //if(ticketResponse && ticketResponse.data.result) return dispatch({type: "PaymentEnd", success: true}); // 免费情况下直接跳转 支付成功
    dispatch(CreatePayment());
    //}).then()
  }
}

export function SubmitPayCode(code) {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData,
      ticket_id = bLData ? bLData.ticket : null;

    if(!ticket_id || !code) return;

    dispatch({ type: "PaymentConfirmStart" });
    return post("/payctcf/confirm", {ticket_id: ticket_id, msgcode: code}).then(response => {
      var success = response.res == responseStatus.success;
      if(success) return dispatch(PaymentAndReportStatus());
      dispatch({ type: "PaymentBroken", error: response.msg });
    }).catch(() => dispatch({ type: "PaymentEnd", success: false }));
  };
}

function PaymentAndReportStatus() {
  return (dispatch, getState) => {
    var state = getState(), blData = state.blackListData;

    var hBTimeFlag = null, times=0, getPayStatus = () => {
      post("/payorder/check-status", {ticket_id: blData.ticket}).then(response => {
        if(response.res !== responseStatus.success) return;
        var state = getState(), blData = state.blackListData;
        var data = response.data;

        if(data.status == 2 && !blData.paymentEnd) {
          dispatch({ type: "PaymentEnd", success: true });
          dispatch({ type: "RequestReportResult" });
        } else if(data.status == 3) {
          dispatch({ type: "PaymentEnd", success: false });
          dispatch({type: "ReceiveReportResult", result: null});
          return;
        }

        if(data.status == 1 || data.blacklist_result == 0) {
          hBTimeFlag = setTimeout(() => getPayStatus(), 3000);
          return;
        }
        if(data.blacklist_result == 1 || data.blacklist_result == 2) {
          dispatch({type: "ReceiveReportResult", result: data.blacklist_result});
        }
      });
    };

    getPayStatus();
  }
}

export function ClearPaymentInfo() {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData;
    if(bLData.paymentStart) return null;
    return dispatch({type: "ClearPaymentInfo"});
  }
}
