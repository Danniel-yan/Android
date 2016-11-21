import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';

import externalScene from 'components/high-order/externalScene';
import { externalPop } from 'actions/navigation';

function mapStateToProps(state) {
  return state.loanDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchLoanDetail(params.id)),
    onBack:() => dispatch(externalPop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, externalScene(LoanDetail)));