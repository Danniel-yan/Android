import { connect } from 'react-redux';

import { fetchArticalList } from 'actions/find/artical';
import ArticalList from 'components/find/artical';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  console.log(state.articalList);
  return state.articalList;

}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchArticalList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading,ArticalList));
