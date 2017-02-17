import { post, get, responseStatus, loanEntryClose } from 'utils/fetch';

import getBillList from './billList';

function getYysBillStatus(body) {
  var body = Object.assign({}, body, { type: 'yys' });

  return getBillList(body).then(response => {
    if(response.res == responseStatus.success) {
      var billList = response.data || [], lastestBill = billList[0];

      //账单状态：1=已提交登陆信息，2=登陆失败，3=登陆成功，4=登陆成功，等待二次登陆，5=已提交二次登陆信息，6=二次登陆失败，7=二次登陆成功，等待数据，8=数据获取成功，9=数据获取失败
      if(!lastestBill || [1].includes(+lastestBill.status)) {
        return { list: billList, billStatus: none() };
      }

      if([8].includes(+lastestBill.status)) {
        return { list: billList, billStatus: success() };
      }

      if([2,4,6,9].includes(+lastestBill.status)) {
        return { list: billList, billStatus: failure() };
      }
      return { list: billList, billStatus: progressing() };
    }
    return null;
  })
}

export function yysBillList(body) {
  return (dispatch, getState) => {
    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    dispatch({type: "yysBillFetchStart"});

    return getYysBillStatus(Object.assign({}, body, { loan_type: loanEntryClose ? 0 : loanType })).then(billData => {
      if(!billData) return null;

      dispatch({ type: "receiveOnlineYysBilllList", billList: billData.list });
      dispatch(billData.billStatus);
      return billData.billStatus;
    });
  }
}

export default function(body) {

  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineYysResult'});

    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    if(loanType == 0 || loanType == 9999 || loanEntryClose) return dispatch(yysBillList(body));
    // if(true) return dispatch(yysBillList(body));

    return getYysBillStatus(Object.assign({}, body, { loan_type: loanType })).then(billData => {
      if(!billData) return null;

      dispatch({ type: "receiveOnlineYysBilllList", billList: billData.list });
      if(billData.billStatus.status !== "success") return dispatch(billData.billStatus);
      return checkBillFilter(loanType).then(res => {
        return dispatch(res);
      });
    })
  }
}

function checkBillFilter(loan_type) {

  return post('/loanctcf/check-bill-filter', { loan_type }).then(response => {
    if(response.res == responseStatus.failure) {
      throw response.msg;
    }

    const res = response.data.find(res => res.data_type == 'yys') || {};

    if(res.status == 3 && res.is_expire == 1) {
      return expire();
    }

    switch(+res.status) {
      case 3:
        return success();
      case 2:
        return failure();
      case 1:
        return progressing();
    }
  })
}

function expire() {
  return { type: 'receiveOnlineYysResult', status: 'expire' }
}

function none() {
  return { type: 'receiveOnlineYysResult', status: 'none' }
}

function success() {
  return { type: 'receiveOnlineYysResult', status: 'success' }
}

function failure() {
  return { type: 'receiveOnlineYysResult', status: 'failure' }
}

function progressing() {
  return { type: 'receiveOnlineYysResult', status: 'progressing' }
}
