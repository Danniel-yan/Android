import { connect } from 'react-redux';

import { fetchArticalList, fetchArticalDetail } from 'actions/find/artical';
import ArticalList from 'components/find/artical';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return state.articalList;

}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchArticalList(params)),
    fetchArticalDetail: id => dispatch(fetchArticalDetail(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading,ArticalList));
