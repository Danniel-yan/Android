//import { get } from 'utils/fetch';
//
//export function fetchingOperating() {
//  return {
//    type: 'fetchingData',
//  }
//}
//
//export function receiveOperating(operating) {
//  return {
//    type: 'receiveData',
//    operating
//  }
//}
//
//export function fetchingError(err) {
//  return {
//    type: 'fetchingDataError',
//    err
//  }
//}
//
//export default function homeOperating() {
//  return (dispatch) => {
//    dispatch(fetchingOperating());
//
//    get('/discover/config')
//      .then(response => dispatch(receiveOperating(response.data)))
//      .catch(err => {
//        dispatch(fetchingError('网络错误'));
//        console.log(err)
//      })
//  }
//}
