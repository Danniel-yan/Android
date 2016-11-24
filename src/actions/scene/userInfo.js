import { AsyncStorage } from 'react-native';
import { get } from 'utils/fetch';

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

export default function fetchUserInfo() {
  return function(dispatch) {
    dispatch(fetchingStart());

    AsyncStorage.getItem('userToken').then(token => {
      if(token == null) {
        dispatch(receiveUserInfo(null));
        return;
      }
      get('/user/info', { token: token }).then((rsp)=>{
        var data = rsp.data;
        dispatch(receiveUserInfo(data));
      }).catch(err=>console.log(err));
    });
  }
}
