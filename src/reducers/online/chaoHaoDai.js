const initApplyStatus = {
  isFetching: true, fetched: false, error: null,
  data: null
};

export function applyStatus(state = initApplyStatus, action) {
  switch (action.type) {
    case "RequestCHDApplyStatus": 
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case "ReceiveCHDApplyStatus":
      return Object.assign({}, state, { isFetching: false, fetched: true, data: action.data });
    default:
      return state;
  }
}

const initActiveResult = {
  isFetching: true, fetched: false, error: null,
  data: null
};

export function activeResult(state = initActiveResult, action) {
  switch (action.type) {
    case "RequestCHDActiveResult": 
      return Object.assign({}, state, { isFetching: true, fetched: false, data: null });
    case "ReceiveCHDActiveResult":
      return Object.assign({}, state, { isFetching: false, fetched: true, data: action.data });
    default:
      return state;
  }
}
