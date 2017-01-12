import { get, post, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  // auto refresh
  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineBankResult'});
    var state = getState(), loanType = state && state.online && state.online.loanType ? state.online.loanType.type : null;
    loanType && (body.loan_type = loanType);
    getBillList(body).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data, lastestBill = null, existSuccessBill = false;

        billList && billList.length > 0 && (lastestBill = billList[0]);
        lastestBill && billList.map(bill => { existSuccessBill = existSuccessBill || bill.status == 8 });


        dispatch({type: 'receiveBankEntryStatus', existSuccessBill: existSuccessBill});
        dispatch({type: 'receiveOnlineBankResult', status: lastestBill ? lastestBill.status : undefined});
      }
    });
  }
}
