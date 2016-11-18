
import { connect } from 'react-redux';

import { fetchHomeCards } from 'actions/scene/home/cardList';
import CardList from 'components/shared/CardList'

function mapStateToProps(state) {
  return state.homeCardList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCards: () => dispatch(fetchHomeCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
