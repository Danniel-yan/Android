import { get, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  return dispatch => {

    dispatch({type: 'requestOnlineYysResult'});

    getBillList(Object.assign({}, body, { type: 'yys' })).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data, existSuccessBill = false, lastestBill;

        billList && billList.length > 0 && (lastestBill = billList[0]);
        lastestBill && billList.map(bill => { existSuccessBill = existSuccessBill || bill.status == 8 });

        dispatch({type: 'receiveYYSEntryStatus', existSuccessBill: existSuccessBill});
        dispatch({type: 'receiveOnlineYysResult', status: lastestBill ? lastestBill.status : undefined});
      }
    });
    //
    // get('/bill/yys-ctcf-result').then(response => {
    //   if(response.res = responseStatus.success) {
    //     dispatch({type: 'receiveOnlineYysResult', status: response.data.status})
    //   }
    // })
  }
}
