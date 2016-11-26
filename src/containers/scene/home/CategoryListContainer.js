
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchCategory } from 'actions/scene/home/categoryList';
import CategoryList from 'components/shared/CategoryList'

function mapStateToProps(state) {
  return state.categoryList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchCategory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, CategoryList));
