
const initState = {
  isFetching: true,
  fetched: false,
  operating: {}
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'fetchingOperating':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveOperating':
      return Object.assign({}, state, { operating: action.operating, isFetching: false, fetched: true });
    case 'fetchingOperatingError':
      return Object.assign({}, state, { isFetching: false, feched: false });
    default:
      return state;
  }
}
