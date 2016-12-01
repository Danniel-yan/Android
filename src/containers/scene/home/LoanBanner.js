import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';

import { window } from 'styles';
import WebLink from 'components/shared/WebLink';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';

function mapStateToProps(state) {
  return {
    isFetching: state.homeOperating.isFetching,
    fetched: state.homeOperating.fetched,
    banner: state.homeOperating.operating.index_loan_banner 
  };
}

export default connect(mapStateToProps, null)(props => {
  if(props.banner) {
    return (
      <WebLink url={props.banner.url}>
        <Image source={{uri: props.banner.pic}} style={{width: window.width, height:window.width * (176 / 750)}}/>
      </WebLink>
    );
  }

  return null;
})
