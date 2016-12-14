import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchBankList } from 'actions/scene/card/bankList';
import BankListScene from 'components/scene/card/BankListScene';

function mapStateToProps(state){
  return state.bankList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: () => dispatch(fetchBankList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading,BankListScene))
