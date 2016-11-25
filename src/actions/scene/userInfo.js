import { AsyncStorage } from 'react-native';
import { get, post } from 'utils/fetch';

import submitUserInfo from './fillUserInfo';

function fetchingStart() {
  return {
    type: 'fetchingUserInfoStart'
  };
}

function receiveUserInfo(userInfo) {
  return {
    type: 'receiveUserInfo',
    userInfo
  };
}

export function fetchUserInfo() {
  return function(dispatch) {
    dispatch(fetchingStart());

    AsyncStorage.getItem('userToken').then(token => {
      if(token == null) {
        dispatch(receiveUserInfo(null));
        return;
      }
      get('/user/info').then((rsp)=>{
        var data = rsp.data;
        dispatch(receiveUserInfo(data));
      }).catch(err=>console.log(err));
    });
  }
}

export function goLoan(params) {
  return function(dispatch) {
    AsyncStorage.getItem('userToken').then(token => {
      if(token == null) {
        var { mobile, verify_code } = params;
        // .then((rsp) => { console.log("****Login****"); console.log(rsp); rsp.res === 1 && dispatch(submitUserInfo(params)) })
        post('/user/login', { mobile, verify_code })
          .then((rsp) => { rsp.res === 1 && dispatch(submitUserInfo(params)) })
          .catch(err => { alert('网络异常'); })
        return;
      }
      dispatch(submitUserInfo(params));
    });
  }
}
