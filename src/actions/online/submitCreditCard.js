import { post, responseStatus } from 'utils/fetch';

function submitError(err) {
  return {
    type: 'submitOnlineCreditCardError',
    err
  }
}

export default function(form) {

  return (dispatch, getState) => {
    const state = getState().online.submitCreditCard;

    if(state.submitting) { return; }

    dispatch({type: 'submittingOnlineCreditCard'});

    return;
    return post('/bill/bank-login', form).then(response => {
      if(response.res = responseStatus.success) {
        dispatch({type: 'submitOnlineCreditCardSuccess', result: response.data});
      } else {
        dispatch(submitError(response.msg));
      }
      return response;
    }).catch(err => {
      dispatch(submitError(response.msg));
    })
  }

}
