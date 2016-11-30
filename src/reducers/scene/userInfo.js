const initState = {
  isFetching: true,
  fetched: false,
  hasLogin: false,
  userInfo: null
}

export default function userInfo(state = initState, action) {
  switch(action.type) {
    case 'fetchingUserInfoStart':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveUserInfo':
      return Object.assign({}, state, { isFetching: false, fetched: action.hasLogin, hasLogin: action.hasLogin, userInfo: action.userInfo });
    case 'removeUserInfo':
      state.userInfo = null;
      return Object.assign({}, state, { isFetching: false, fetched: false });
    default:
      return state;
  }
}
