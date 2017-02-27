import { connect } from 'react-redux';

import { fetchArticalList } from 'actions/find/artical';
// import ArticalList from 'components/find/artical';
import { CardArtical } from 'containers/scene/CardArticalDetail';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    isFetching: state.articalList.isFetchingDetail,
    detail: state.articalList.detail
  };

}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading,CardArtical));
