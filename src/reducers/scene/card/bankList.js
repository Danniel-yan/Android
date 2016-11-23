const initState = { isFetching: false, bankList : []}

export default function bankList (state = initState, action ){
  switch (action.type) {
    case 'requestBankList' :
      return Object.assign({}, state, { isFetching: true });
    case 'receiveBankList' :
      return Object.assign({}, state, { isFetching: false, bankList : action.bankList})
    default:
      return state;
  }
}