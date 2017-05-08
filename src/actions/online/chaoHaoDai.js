import { AsyncStorage } from 'react-native';
import * as constants from 'constants';
import { get, post, mock, responseStatus } from 'utils/fetch';

// 查询当前贷款产品资料提交状态 （当前仅loan_type=4的贷款产品有效）
function applyStatus() {
  return ( dispatch, getState ) => {
    var state = getState(), loanType = state ? state.online.loanType.type : null;
    if(loanType != constants.loanType.chaohaodaicard) return;

    dispatch({type: "RequestCHDApplyStatus"});
    // return mock("/loanctcf/check-apply-status", { loan_type: parseInt(loanType) }).then((response) => {
    return post("/loanctcf/check-apply-status", { loan_type: parseInt(loanType) }).then((response) => {
      if(response.res === responseStatus.success) {
        dispatch({type: "ReceiveCHDApplyStatus", data: response.data});
      }
    });
  };
}

// 查询活体验证分数是否通过 （当前仅loan_type=4的贷款产品有效）
function checkActiveResult() {
  return ( dispatch, getState ) => {
    var state = getState(), loanType = state ? state.online.loanType.type : null;
    if(loanType != constants.loanType.chaohaodaicard) return;

    dispatch({type: "RequestCHDActiveResult"});
    // return mock("/loanctcf/check-alive-result", { loan_type: parseInt(loanType) }).then((response) => {
    return post("/loanctcf/check-alive-result", { loan_type: parseInt(loanType) }).then((response) => {
      if(response.res === responseStatus.success) {
        dispatch({type: "ReceiveCHDActiveResult", data: response.data});
      }
    });
  };
}

export default { applyStatus, checkActiveResult }