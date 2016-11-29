const initState = {
  isFetching: true,
  fetched: false,
  userInfo: null
}

export default function userInfo(state = initState, action) {
  switch(action.type) {
    case 'fetchingUserInfoStart':
      return Object.assign({}, state, { isFetching: true });
    case 'userInfoUpdated':
      return Object.assign({}, state, { fetched: false });
    case 'receiveUserInfo':
      return Object.assign({}, state, { isFetching: false, fetched: true, userInfo: action.userInfo });
    default:
      return state;
  }
}
