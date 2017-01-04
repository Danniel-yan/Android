const initUserInfo = {
  isFetching: true,
  fetched: false,
  err: null
};

export default function userInfo(state = initUserInfo, action) {
  switch(action.type) {
    case 'requetOnlineUser':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveOnlineUser':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.user });
    case 'requetOnlineUserError':
      return Object.assign({}, state, { isFetching: false, fetched: false, err: action.err });
    default: 
      return state;
  }
}
