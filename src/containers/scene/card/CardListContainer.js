import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import paginationCardList from 'actions/scene/card/cardList'
import CardListScene from 'components/scene/card/CardListScene';

function mapStateToProps(state){
  return state.cardList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: params => dispatch(paginationCardList(params)),
    pagination: params => dispatch(paginationCardList(params))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading,CardListScene))
