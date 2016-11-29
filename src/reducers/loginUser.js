const initState = {
  isFetching: false,
  fetched: false,
  info: null
};

export default function loginUser(state = initState, action){
  switch(action.type) {
    case 'fetchingUser':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveUser':
      return Object.assign({}, state, { isFetching: false, fetched: true, info: action.info });
    default:
      return state;
  }
}
