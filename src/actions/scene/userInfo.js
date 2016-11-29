import { AsyncStorage } from 'react-native';
import { get, post } from 'utils/fetch';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';

import submitUserInfo from '../fillUserInfo';

function fetchingStart() {
  return {
    type: 'fetchingUserInfoStart'
  };
}

function receiveUserInfo(userInfo) {
  return {
    type: 'receiveUserInfo',
    userInfo: userInfo
  };
}

function userInfoUpdated() {
  return {
    type: 'userInfoUpdated'
  };
}

export function goLoan(params) {
  return function(dispatch) {
    // console.log(params);
    dispatch(submitUserInfo(params, () => {
      dispatch(userInfoUpdated());
      // dispatch(externalPop());
      dispatch(externalPush({key:"LoanScene"}));
    }));
  }
}

// Add Test Token : 587c47630a09b516cb2efe004a1ccd3dohclo9
// AsyncStorage.setItem('userToken', '587c47630a09b516cb2efe004a1ccd3dohclo9');
// // Remove Test Token : 587c47630a09b516cb2efe004a1ccd3dohclo9
// AsyncStorage.setItem('userToken', '');

export function fetchUserInfo() {
  return function(dispatch) {
    dispatch(fetchingStart());
    var appendLocation = function(data, successFunc) {
      AsyncStorage.getItem('geoLocation').then(rsp=>{
        var fillData = Object.assign({}, data, {location: rsp});
        successFunc(fillData)
      }).catch(error=>{console.log(error)});
    }
    AsyncStorage.getItem('userToken').then(token => {
      if(!token) {
        appendLocation(null, (fillData)=>{dispatch(receiveUserInfo(fillData));})
        return;
      }
      get('/user/info').then((rsp)=>{
        var data = rsp.data;
        // console.log("USERINFO");
        // console.log(data);
        if(!data.location) {
          appendLocation(data, (fillData)=>{dispatch(receiveUserInfo(fillData));})
        } else {
          dispatch(receiveUserInfo(data));
        }


      }).catch(err=>console.log(err));
    });
  }
}
