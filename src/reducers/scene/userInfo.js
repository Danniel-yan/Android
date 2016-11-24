const initState = {
  isFetching: true,
  userInfo: null
}

export default function userInfo(state = initState, action) {
  switch(action.type) {
    case 'fetchingUserInfoStart':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveUserInfo':
      return Object.assign({}, state, { isFetching: false, userInfo: action.userInfo });
    default:
      return state;
  }
}
