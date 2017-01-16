const initState = {
  isFetching: true,
  fecthed: false,
  billDetail:{}
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestBillDetail':
      return initState;
    case 'receiveBillDetail':
      return Object.assign({}, state, { isFetching: false, fected: true , billDetail:action.billDetail})
  default:
  return state;
}
}
