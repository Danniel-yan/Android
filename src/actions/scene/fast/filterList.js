import { Platform } from 'react-native';
import { get } from 'utils/fetch';

export function setAmount(amount) {
  return {
    type: "setAmount",
    amount: amount
  };
}

export function setLoanInfo(info) {
  return {
    type: "setLoanInfo",
    amount: info.amount,
    period: info.period
  }
}

function fetchingStart() {
  return { type: "fetchingStart" };
}

function receiveResultList(list) {
  return {
    type: "receiveResultList",
    list: list
  };
}

function receiveMoreList(list) {
  return {
    type: "receiveMoreList",
    list: list
  };
}

function receiveApplyResList(list) {
  return {
    type: 'receiveApplyResList',
    list
  };
}

function refershFetch() {
  return {
    type: 'refershFetch'
  };
}

export function fetchingFastFilterList(params) {
  return (dispatch) => {
    dispatch(fetchingStart());

    var url = Platform.OS == 'ops' ? '/loan/filter-list-ios' : '/loan/filter-list';
    get(url, params).then(rsp=>{
      var data = rsp.data;
      data.result_list && dispatch(receiveResultList(data.result_list));
      data.more_list && dispatch(receiveMoreList(data.more_list));
    }).catch(error=>console.log(error));
  };
}

export function fetchingApplyResList() {
  return (dispatch) => {
    dispatch(fetchingStart());

    get("/loan/apply-res-list").then(rsp=>{
      var data = rsp.data;
      data && data.length > 0 && dispatch(receiveApplyResList(data));
    });
  }
}

export function reFetchingFastFilterList(params) {
  return (dispatch) => {
    dispatch(refershFetch());
    dispatch(fetchingFastFilterList(params))
  }
}
