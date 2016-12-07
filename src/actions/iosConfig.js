import { get, post, defaultApiVersion } from 'utils/fetch';
import { Platform } from 'react-native';

function startFetching() {
  return {
    type: "startFetching"
  };
}

function endFetching() {
  return {
    type: "endFetching"
  }
}

function receiveIOSConfig(data) {
  return {
    type: "receiveIOSConfig",
    data
  }
}

export function fetchingIOSConfig() {
  return function(dispatch) {
    dispatch(startFetching());

    if(Platform == "android") {
      dispatch(endFetching());
      dispatch(receiveIOSConfig({isIOSVerifying: false}))
      return;
    }

    get("/app/ios-checking").then(rsp => {
      dispatch(endFetching());

      var checking_version = rsp.data ? rsp.data.checking_version : 0;
      dispatch(receiveIOSConfig({isIOSVerifying: checking_version === defaultApiVersion}));
      // dispatch(receiveIOSConfig({isIOSVerifying: !(checking_version == 0)}));
    });
  };
}
