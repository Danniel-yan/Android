import { post, get, mock, responseStatus, loanEntryClose } from 'utils/fetch';

import getBillList from './billList';
import banks from './banks';
import preloan from './preloan';
import preloanStatus from './preloanStatus';



export default function(body) {

  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineBankResult'});

    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    if(loanType == 0 || loanType == 9999 || loanEntryClose) return dispatch(bankBillList(body));

    return getBankBillStatus(Object.assign({}, { loan_type: loanType }, body)).then(billData => {
      if(!billData) return null;

      dispatch({ type: "receiveOnlineBankBilllList", billList: billData.list });
      console.log("BillStatus: ", billData.billStatus.status);
      if(billData.billStatus.status !== "success") return dispatch(billData.billStatus);
      return checkBillFilter(loanType).then(res => {
        console.log("BillFilterStatus: ", res.status);
        if(loanType == 4 && res.status == "success") return dispatch(chaohaodaiCreditCardPreLoan());
        return dispatch(res);
      });
    })
  }
}

function chaohaodaiCreditCardPreLoan() {
  return ( dispatch, getState ) => {
    dispatch(preloan()).then(responseData => { 
      if(responseData.res == responseStatus.success) {
        dispatch(preloanStatus());
        return dispatch(success());
      }
      return dispatch(failure());
    })
  };
}

function checkBillFilter(loan_type) {
  return post('/loanctcf/check-bill-filter', { loan_type }).then(response => {
    if(response.res == responseStatus.failure) {
      throw response.msg;
    }

    const res = response.data.find(res => res.data_type == 'bank_wap') || {};

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



export function bankBillList(body) {
  return (dispatch, getState) => {
    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    if(!state.online.banks.fetched) dispatch(banks());
    dispatch({type: "bankBillFetchStart"});

    return getBankBillStatus(Object.assign({}, { loan_type: loanEntryClose ? 0 : loanType }, body)).then(billData => {
      if(!billData) return null;

      dispatch({ type: "receiveOnlineBankBilllList", billList: billData.list });
      dispatch(billData.billStatus);
      return billData.billStatus;
    });
  }
}

function expire() {
  return { type: 'receiveOnlineBankResult', status: 'expire' }
}

function none() {
  return { type: 'receiveOnlineBankResult', status: 'none' }
}

function success() {
  return { type: 'receiveOnlineBankResult', status: 'success' }
}

function failure() {
  return { type: 'receiveOnlineBankResult', status: 'failure' }
}

function progressing() {
  return { type: 'receiveOnlineBankResult', status: 'progressing' }
}

export function getBankBillStatus(body) {
  var body = Object.assign({}, body, { type: 'bank_wap' });

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
