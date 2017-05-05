const initState = {
  isFetching: false,
  logouting: false,
  fetched: false,
  info: null
};

export default function loginUser(state = initState, action){
  switch(action.type) {
    case 'fetchingUser':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveUser':
      return Object.assign({}, state, { isFetching: false, fetched: true, info: action.info, valid: action.info  });
    case 'logouting':
      return Object.assign({}, state, { logouting: true });
    case 'logouted':
      return Object.assign({}, state, { valid: false, info: null, fetched: false, logouting: false });
    default:
      return state;
  }
}
