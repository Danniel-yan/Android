const initState = {
  page: "", api: "", token: "",
  fetcingStatus: false,
  status: "none"
};

export default function(state = initState, action) {
  switch(action.type) {
    case "SetPBOCInfo":
      return Object.assign({}, state, { page: action.page, api: action.api, token: action.token });
    case "FetcingPBOCStatus":
      return Object.assign({}, state, { fetcingStatus: true });
    case "ReceivePBOCStatus":
      return Object.assign({}, state, { fetcingStatus: false, status: action.status });
    default:
      return state;
  }
}
