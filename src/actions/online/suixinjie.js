import { get, post, responseStatus } from 'utils/fetch';

export default function requestSuiXinJie(loanType) {
  return (dispatch, getState) => {
    dispatch({ type: "RequestSuiXinJie" });

    return get("/loan/merge-info?loan_type=" + (loanType || 1000)).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: "ReceiveSuiXinJie", list: response.data })
      }
    })
  }
}
