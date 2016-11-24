import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchLoanDetail, goLoan } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';

import externalScene from 'components/high-order/externalScene';

function mapStateToProps(state) {
  return state.loanDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchLoanDetail(params.id)),
    goLoan: (url, title) => dispatch(goLoan(url, title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(externalScene(AsynCpGenerator(Loading, LoanDetail)));
