const initState = { isFetching: true, fetched: false, bankList : []}

export default function bankList (state = initState, action ){
  switch (action.type) {
    case 'requestBankList' :
      return Object.assign({}, state, { isFetching: true , fetched: false});
    case 'receiveBankList' :
      return Object.assign({}, state, { isFetching: false, fetched: false, bankList : action.bankList})
    default:
      return state;
  }
}