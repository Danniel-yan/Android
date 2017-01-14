import { post, get, responseStatus } from 'utils/fetch';

import getBillList from './billList';

export default function(body) {
  return (dispatch, getState) => {
    dispatch({type: 'requestGjjResult'});

    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    return getBillList(Object.assign({}, body, { loan_type: loanType, type: "gjj" })).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data || [], lastestBill = billList[0];

        //账单状态：1=已提交登陆信息，2=登陆失败，3=登陆成功，4=登陆成功，等待二次登陆，5=已提交二次登陆信息，6=二次登陆失败，7=二次登陆成功，等待数据，8=数据获取成功，9=数据获取失败
        if(!lastestBill || [1, 3, 4, 5].includes(+lastestBill.status)) {
          // return { list: billList, billStatus: none() };
          return dispatch(receiveBillDetail(billList, 'none'))
        }

        if([8].includes(+lastestBill.status)) {
          return dispatch(receiveBillDetail(billList, 'success'))
        }

        if([2,4,6,9].includes(+lastestBill.status)) {
          return dispatch(receiveBillDetail(billList, 'failure'));
        }

        return dispatch(receiveBillDetail(billList, 'progressing'))
      }
    });
  }
}

function receiveBillDetail(billList, status){
  return{
    type:'receiveGjjResult',
    billList: billList,
    status
  }
}
