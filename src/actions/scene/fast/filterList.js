import { get } from 'utils/fetch';

function fetchingStart() {
  return { type: "fetchingStart" };
}

function receiveResultList(list) {
  return {
    type: "receiveResultList",
    list: list
  };
}

function receiveMoreList(list) {
  return {
    type: "receiveMoreList",
    list: list
  };
}

export function fetchingFastFilterList(params) {
  return (dispatch) => {
    dispatch(fetchingStart());

    console.log(params);
    get('/loan/filter-list', params).then(rsp=>{
      var data = rsp.data;
      data.result_list && dispatch(receiveResultList(data.result_list));
      data.more_list && dispatch(receiveMoreList(data.more_list));
    })
  };
}
