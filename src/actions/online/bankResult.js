import { get, post, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  // auto refresh
  return dispatch => {

    dispatch({type: 'requestOnlineBankResult'});
    getBillList(body).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data;
        var existSuccessBill = false;
        billList && billList.length > 0 && billList.map(bill => { existSuccessBill = existSuccessBill || bill.status == 8 });

        dispatch({type: 'receiveBankEntryStatus', existSuccessBill: existSuccessBill});
        dispatch({type: 'receiveOnlineBankResult'});
      }
    });
  }
}
