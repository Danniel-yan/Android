const initState = {
  isFetching: true,
  fetched: false,
  education: [],
  profession: [],
  err: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineFormPickers':
      return initState;
    case 'receiveOnlineFormPickers':
      return Object.assign({}, state, { isFetching: false, fetched: true, err: null, education: action.education, profession: action.profession});
    default: 
      return state;
  }
}
