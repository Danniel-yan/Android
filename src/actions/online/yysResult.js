import { get, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  return dispatch => {

    dispatch({type: 'requestOnlineYysResult'});

    getBillList(Object.assign({}, body, { type: 'yys' })).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data;
        var existSuccessBill = false;
        billList && billList.length > 0 && billList.map(bill => { existSuccessBill = existSuccessBill || bill.status == 8 });

        dispatch({type: 'receiveYYSEntryStatus', existSuccessBill: existSuccessBill});
        dispatch({type: 'receiveOnlineYysResult'});
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
