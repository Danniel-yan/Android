//
//const initState = {
//  isFetching: true,
//  fetched: false,
//  operating: {}
//};
//
//export default function(state = initState, action) {
//  switch(action.type) {
//    case 'fetchingData':
//      return Object.assign({}, state, { isFetching: true, fetched: false });
//    case 'receiveData':
//      return Object.assign({}, state, { operating: action.operating, isFetching: false, fetched: true });
//    case 'fetchingDataError':
//      return Object.assign({}, state, { isFetching: false, feched: false });
//    default:
//      return state;
//  }
//}
