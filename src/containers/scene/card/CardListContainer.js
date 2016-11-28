import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchCardList } from 'actions/scene/card/cardList'
import CardListScene from 'components/scene/card/CardListScene';

import externalScene from 'components/high-order/externalScene';

function mapStateToProps(state){
  return state.cardList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: param => dispatch(fetchCardList(param.categoryid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(externalScene(AsynCpGenerator(Loading,CardListScene)))