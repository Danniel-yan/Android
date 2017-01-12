const initState = {
  type: undefined
}

export default function(state = initState, action) {
  switch(action.type) {
    case "SetLoanType":
      return Object.assign({}, state, { type: action.value });
    default:
      return state;
  }
}
