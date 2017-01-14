import { post, get, responseStatus } from 'utils/fetch';

export default function() {
  return (dispatch, getState) => {
    dispatch({type: 'requestGjjDetail'});

    var state = getState(), gjjResult = state.online.gjjResult,
      status = gjjResult.status, gjjBill = gjjResult.billList;

    if(status != 'success' || gjjBill.length < 1) {
      return dispatch({ type: 'receiveGjjDetail', detail: null, error: "报告未出 或 报告认证失败， 请重新认证" }); // 报告未出 或 报告认证失败
    }

    var gjjBill = gjjResult.billList[0], gjjId = gjjBill.id;

    get(`/bill/bill-detail?type=gjj&id=${gjjId}`).then(rsp => {
      if(rsp.res != responseStatus.success) {
        return dispatch({ type: 'receiveGjjDetail', detail: null, error: rsp.msg });
      };
      console.log(rsp.data);
      return dispatch({ type: 'receiveGjjDetail', detail: rsp.data });
    });
  }
}
