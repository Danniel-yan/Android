const initUserInfo = {
  isFetching: true,
  fetched: false,
  err: null,

  isFetchingCreditScore: false,
  creditScore: null
};

export default function userInfo(state = initUserInfo, action) {
  switch(action.type) {
    case 'requetOnlineUser':
      return Object.assign({}, state, { isFetching: true,  });
    case 'receiveOnlineUser':
      return Object.assign({}, state, { isFetching: false, ...action.user });
    case 'requetOnlineUserError':
      return Object.assign({}, state, { isFetching: false, fetched: false, err: action.err });

    case 'requestUserCreditScore':
      return Object.assign({}, state, { isFetchingCreditScore: true });
    case 'receiveUserCreditScore':
      return Object.assign({}, state, { isFetchingCreditScore: false, creditScore: action.score });
    default:
      return state;
  }
}
