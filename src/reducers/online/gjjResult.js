const initState = {
  isFetching: true,
  fecthed: false,
  billList:[],
  status: 'none'
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestGjjResult':
      return Object.assign({}, state, { isFetching: true, fecthed: false });
    case 'receiveGjjResult':
      var newStatus = Object.assign({}, state, { isFetching: false, fected: true , status: action.status});
      newStatus.billList = action.billList || [];
      return newStatus;
    default:
    return state;
  }
}
