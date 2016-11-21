
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchHomeCards } from 'actions/scene/home/cardList';
import CardList from 'components/shared/CardList'

function mapStateToProps(state) {
  return state.homeCardList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchHomeCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, CardList));
