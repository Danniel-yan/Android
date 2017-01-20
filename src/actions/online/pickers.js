import { get, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {
    const state = getState();

    if(state.online.pickers.fetched) {
      return dispatch({type: 'receiveOnlineFormPickers', education: state.online.pickers.education, profession: state.online.pickers.profession})
    }

    dispatch({type: 'requestOnlineFormPickers'});

    Promise.all([get('/loanctcf/education-list'), get('/loanctcf/profession-list')]).then(responsies => {
      if(responsies[0].res == responseStatus.failure && responsies[1].res == responseStatus.failure) {
        return dispatch({type: 'requestOnlineFormPickersError', err: '服务器出错'})
      }

      dispatch({type: 'receiveOnlineFormPickers', education: responsies[0].data, profession: responsies[1].data})
    })

  }

}
