import preloan from "./preloan";
import preloanStatus from './preloanStatus';
import chaoHaoDai from './chaoHaoDai';

export let hBFlag = null;

export function hbFetchingStatus(dispatch) {
  return (dispatch, getState) => {
    hBFlag = setInterval(() => {
      dispatch(preloanStatus());
      dispatch(chaoHaoDai.applyStatus());
    }, 20000);
  };
}

export function clearHbFetching() {
  clearInterval(hBFlag);
}