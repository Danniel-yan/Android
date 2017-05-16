import { AsyncStorage, NativeModules } from 'react-native';
import * as constants from 'constants';
import { get, post, mock, responseStatus } from 'utils/fetch';
import preloan from "./preloan";
import preloanStatus from './preloanStatus';
import tracker from 'utils/tracker.js';

// 
function checkoutStateSuccess(originData, newData) {
  var successed = false;
  if(!originData || !newData) return false;

  ["alipay", "jd", "idscore"].map((key) => {
    var tempSuccess = (newData[key] == 2) && (newData[key] != originData[key]);
    successed = (successed || tempSuccess);
  });
  return successed;
}

// 查询当前贷款产品资料提交状态 （当前仅loan_type=4的贷款产品有效）
function applyStatus() {
  return ( dispatch, getState ) => {
    var state = getState(), loanType = state ? state.online.loanType.type : null, chaoHaoDai = state.online.chaoHaoDai;
    if(loanType != constants.loanType.chaohaodaicard) return;

    dispatch({type: "RequestCHDApplyStatus"});
    // return mock("/loanctcf/check-apply-status", { loan_type: parseInt(loanType) }).then((response) => {
    return post("/loanctcf/check-apply-status", { loan_type: parseInt(loanType) }).then((response) => {
      if(response.res === responseStatus.success) {
        // console.log("state.online.applyStatus")
        // console.log(chaoHaoDai)
        chaoHaoDai.applyStatus && checkoutStateSuccess(chaoHaoDai.applyStatus.data, response.data) && dispatch(preloan());
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

const JumpFuncDir = {
  "jd": NativeModules.ImportBillModule ? NativeModules.ImportBillModule.importJingdongBill : null,
  "alipay": NativeModules.ImportBillModule ? NativeModules.ImportBillModule.importAlipayBill : null
}

function JumpNativeScene(targetKey, state) {
    var JumpFunc = JumpFuncDir[targetKey];
    var id = state.loginUser && state.loginUser.info ? state.loginUser.info.id : null;
    // id = "mockid123";
    if(!JumpFunc || !id) return null;
    return JumpFunc(id);
}

function taskLogin(task_id, url) {
  return ( dispatch, getState ) => {
    var state = getState(), loanType = state ? state.online.loanType.type : null;
    return post(url, { loan_type: loanType, task_id });
  }
}

function jumpJdNativeScene() {
  return ( dispatch, getState ) => {
      tracker.trackAction({
          key: "JD",
          event: "landing"
      })
    return Promise.resolve(JumpNativeScene("jd", getState())).then(task_id => {
      console.log("TASKID: " + task_id);
      task_id && dispatch(taskLogin(task_id, "/bill/jd-login"));
    });
  }
}

function jumpAlipyNativeScene() {
  return ( dispatch, getState ) => {
    tracker.trackAction({
      key: "ZFB",
      event: "landing"
    })
    return Promise.resolve(JumpNativeScene("alipay", getState())).then(task_id => { task_id && dispatch(taskLogin(task_id, "/bill/alipay-login")); });
  }
}

export default { applyStatus, checkActiveResult, jumpJdNativeScene, jumpAlipyNativeScene }