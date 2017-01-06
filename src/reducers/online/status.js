const initState = {};

export default function(state = initState, action) {
  switch(action.type) {
    case 'receiveOnlineStatus':
      return Object.assign({}, state, action.status);
    default:
      return state;
  }
}
