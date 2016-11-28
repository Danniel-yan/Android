
import { connect } from 'react-redux';

import paginationMessages from 'actions/scene/messages';
import MessagesScene from 'components/scene/MessagesScene';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';

function mapStateToProps(state) {
  return state.messages;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: pos => dispatch(paginationMessages(pos)),
    pagination: pos => dispatch(paginationMessages(pos))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, MessagesScene));
