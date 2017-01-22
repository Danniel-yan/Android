import { AsyncStorage } from 'react-native';
import { get, post, responseStatus } from 'utils/fetch';

function setPBOCInfo(page, api, token) {
  return {
    type: "SetPBOCInfo",
    page, api, token
  }
}

export function initial() {
  return (dispatch, getState) => {
    var state = getState(), pbocInfo = state && state.online ? state.online.pboc : null;
    if(!!pbocInfo.token) { return new Promise(() => pbocInfo); }
    var environment = "production";
    console.log("INITIAL PBOC INFO");
    return AsyncStorage.getItem('environment').then(ev=>{
      environment = ev;
      return AsyncStorage.getItem("userToken");
    }).then(token => {
      if(!token) return;
      var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
      pbocUrl = environment=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
      var apiUrl = environment=="production" ? "https://chaoshi-api.jujinpan.cn" : "https://shiyishou-test.jujinpan.cn";
      return dispatch(setPBOCInfo(pbocUrl, apiUrl, token));
    });
  }
}

// export function getStatus() {
//   return (dispatch, getState) => {
//     var state = getState(), pbocInfo = state && state.online ? state.online.pboc : null;
//     if(!pbocInfo.token || pbocInfo.fetcingStatus) return null;
//     var apiUrl = pbocInfo.api + "/-/credit/status" + "?token=" + pbocInfo.token;
//     dispatch({type: "FetcingPBOCStatus"});
//     console.log("FETCHING PBOC : ", apiUrl);
//     fetch(apiUrl, {method: "GET"}).then(response => response["json"]()).then(response => {
//       var resStatus = response.data.status, status = "none";
//       if([-1, 0].includes(resStatus)) {
//         status = "none";
//       } else if(resStatus == 1) {
//         status = "processing";
//       } else if(resStatus == 2) {
//         status = "success";
//       } else if(resStatus == 3) {
//         status = "failure";
//       }
//       dispatch({type: "ReceivePBOCStatus", status});
//     })
//   }
// }

export function getStatus() {
  return (dispatch) => {
    dispatch({type: "FetcingPBOCStatus"});
    get("/credit/report-status").then(response=> {
      var status = "none";
      if(response.res == responseStatus.success) {
        var statusKey = response.data.status;
        status = statusKey == 1 ? "success" : "none";
      }
      dispatch({type: "ReceivePBOCStatus", status});
    })
  }
}

// export default function() {
//   return (dispatch, getState) => {
//     AsyncStorage.getItem("")
//   }
// }
