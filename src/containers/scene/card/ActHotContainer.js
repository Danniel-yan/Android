
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/card/actHot';
import ActHotScene from 'components/scene/card/ActHotScene';

function mapStateToProps(state) {
  return state.actHot;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: num => dispatch(fetchActHot( num = 8 ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActHotScene));
