
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHotDetail } from 'actions/scene/card/actHotDetail';
import ActHotDetailScene from 'components/scene/card/ActHotDetailScene';

function mapStateToProps(state) {
  return state.actHotDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchActHotDetail(params.id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActHotDetailScene));
