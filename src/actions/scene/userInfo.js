import { AsyncStorage } from 'react-native';
import { get, post } from 'utils/fetch';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';


function fetchingStart() {
  return {
    type: 'fetchingUserInfoStart'
  };
}

function receiveUserInfo(userInfo, hasLogin) {
  return {
    type: 'receiveUserInfo',
    userInfo: userInfo,
    hasLogin: hasLogin
  };
}

export function userInfoUpdated(userInfo) {
  return {
    type: 'userInfoUpdated',
    userInfo
  };
}

export function removeUserInfo() {
  return {
    type: "removeUserInfo"
  };
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
        appendLocation(null, (fillData)=>{dispatch(receiveUserInfo(fillData, false));})
        return;
      }
      get('/user/info').then((rsp)=>{
        var data = rsp.data;
        dispatch(receiveUserInfo(data, true));
      }).catch(err=>console.log(err));
    });
  }
}
