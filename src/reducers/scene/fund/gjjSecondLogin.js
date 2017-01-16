const initState = { isFetching: false, login:{} };

export default function gjjSecondLogin(state = initState, action) {
  switch(action.type) {
    case 'requestGjjSecondLogin':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveGjjSecondLogin':
      return Object.assign({}, state, { isFetching: false, login: action.login });
    default:
      return state
  }
}