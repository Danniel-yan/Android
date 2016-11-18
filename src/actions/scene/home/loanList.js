//import fetch from 'isomorphic-fetch';

export function requestLoans() {
  return {
    type: 'requestLoans'
  }
}

export function receiveLoans(loans) {
  return {
    type: 'receiveLoans',
    loans: loans
  }
}

export function fetchHomeLoans() {

  return function (dispatch) {

    dispatch(requestLoans())

    setTimeout(() => {
      dispatch(receiveLoans([
        {
          name: '员工贷-小额贷',
          dec: '推荐，线上申请',
          apply:'12434',
          rate:'0.55-0.99%',
          thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
        },
        {
          name: '员工贷-小额贷',
          dec: '推荐，线上申请',
          apply:'43143',
          rate:'0.55-0.99%',
          thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
        },
        {
          name: '员工贷-小额贷',
          dec: '推荐，线上申请',
          apply:'4214',
          rate:'0.55-0.99%',
          thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
        }
      ]));
    }, 2000)
    //return fetch(`recommend.json`)
    //.then(response => response.json())
    //.then(json =>dispatch(receiveRecommend(subreddit, json)))
  }
}
