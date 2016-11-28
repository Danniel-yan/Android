import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchCardList } from 'actions/scene/card/cardList'
import CardListScene from 'components/scene/card/CardListScene';

function mapStateToProps(state){
  return state.cardList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: param => dispatch(fetchCardList(param.categoryid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading,CardListScene));
