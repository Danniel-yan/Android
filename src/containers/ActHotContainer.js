
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/actHot';
import ActHotScene from 'components/ActHotScene';

function mapStateToProps(state) {
  return state.actHot;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchActHot())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActHotScene));
