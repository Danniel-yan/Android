import { get, post, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  // auto refresh
  return dispatch => {

    dispatch({type: 'requestOnlineBankResult'});
    getBillList(body).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data, lastestBill = null, existSuccessBill = false;

        billLIst && billList.length > 0 && (lastestBill = billList[0]);
        lastestBill && billList.map(bill => { existSuccessBill = existSuccessBill || bill.status == 8 });


        dispatch({type: 'receiveBankEntryStatus', existSuccessBill: existSuccessBill});
        dispatch({type: 'receiveOnlineBankResult', status: lastestBill ? lastestBill.status : undefined});
      }
    });
  }
}
