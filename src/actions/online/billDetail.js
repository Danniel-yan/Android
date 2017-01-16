import { post, get, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {

  return (dispatch, getState) => {

    dispatch({type: 'requestBillDetail'});

    var type = "gjj";

    return getBillList(Object.assign({type: type, status: 0}, body)).then(response => {
      if(response.res == responseStatus.success) {

        var billList = response.data || [];

        if(billList[0].status == 8){

          return get(`/bill/bill-detail?type=${type}&id=${billList[0].ticket_id}`)
            .then(response => {
              if(response.res == responseStatus.success) {
                dispatch(receiveBillDetail(response.data));
              }
            })
        }
      }
    })

  }
}

function receiveBillDetail(billDetail){
  return{
    type:'receiveBillDetail',
    billDetail
  }
}