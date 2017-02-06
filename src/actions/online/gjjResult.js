import { post, get, responseStatus, loanEntryClose } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {
  return (dispatch, getState) => {
    dispatch({type: 'requestGjjResult'});

    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    return getBillList(Object.assign({}, body, { loan_type: loanEntryClose ? 0 : loanType, type: "gjj" })).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data || [], lastestBill = billList[0];

        //账单状态：1=已提交登陆信息，2=登陆失败，3=登陆成功，4=登陆成功，等待二次登陆，5=已提交二次登陆信息，6=二次登陆失败，7=二次登陆成功，等待数据，8=数据获取成功，9=数据获取失败
        if(!lastestBill || [1, 3, 4, 5].includes(+lastestBill.status)) {
          // return { list: billList, billStatus: none() };
          return dispatch(receiveBillResult(billList, 'none'))
        }

        if([8].includes(+lastestBill.status)) {
          if(loanType == 0 || loanType == 9999) return dispatch(receiveBillResult(billList, 'success'));
          // dispatch(receiveBillList(billList));
          return checkBillFilter(loanType).then(res => {
            console.log("GJJBillFilterStatus: ", res.status);
            dispatch(receiveBillList(billList));
            return dispatch(res);
          });
        }

        if([2,4,6,9].includes(+lastestBill.status)) {
          return dispatch(receiveBillResult(billList, 'failure'));
        }

        return dispatch(receiveBillResult(billList, 'progressing'))
      }
    });
  }
}

function receiveBillResult(billList, status) {
  return (dispatch) => {
    dispatch(receiveBillStatus(status));
    dispatch(receiveBillList(billList));
  }
}

function receiveBillStatus(status) {
  return {
    type:'receiveGjjStatus',
    status
  }
}

function receiveBillList(billList) {
  return {
    type: 'receiveGjjBillList',
    billList
  }
}

function checkBillFilter(loan_type) {

  return post('/loanctcf/check-bill-filter', { loan_type }).then(response => {
    if(response.res == responseStatus.failure) {
      throw response.msg;
    }

    const res = response.data.find(res => res.data_type == 'gjj') || {};

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
  return { type: 'receiveGjjStatus', status: 'expire' }
}

function none() {
  return { type: 'receiveGjjStatus', status: 'none' }
}

function success() {
  return { type: 'receiveGjjStatus', status: 'success' }
}

function failure() {
  return { type: 'receiveGjjStatus', status: 'failure' }
}

function progressing() {
  return { type: 'receiveGjjStatus', status: 'progressing' }
}
