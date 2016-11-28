import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import paginationCardList from 'actions/scene/card/cardList'
import CardListScene from 'components/scene/card/CardListScene';

function mapStateToProps(state){
  return state.cardList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: offset => dispatch(paginationCardList(offset)),
    pagination: offset => dispatch(paginationCardList(offset))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading,CardListScene))