const initState = {
  isFetching: false
};

export default function(state = initState, action) {
  switch(action.type) {
    case "requestOnlineStatus":
      return Object.assign({}, state, { isFetching: true });
    case 'receiveOnlineStatus':
      return Object.assign({}, state, { isFetching: false, ...action.status});
    default:
      return state;
  }
}
