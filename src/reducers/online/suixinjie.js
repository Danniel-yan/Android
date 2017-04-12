const initState = {
  isFetching: true,
  fetched: false,
  list: null
};

export default function(state = initState, action) {
  switch(action.type) {
    case "RequestSuiXinJie":
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'ReceiveSuiXinJie':
      return Object.assign({}, state, { isFetching: false, fetched: true, list: action.list});
    default:
      return state;
  }
}
