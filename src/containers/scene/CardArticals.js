import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import * as dstyles from 'styles';
import { fetchCardArticals } from 'actions/cardArtical';
import { ExternalPushLink } from 'containers/shared/Link';
import Loading from 'components/shared/Loading';

import CardArticalListItem from 'components/CardArticalListItem';

function CardArticals(props) {

  let articals = props.articals.map((artical, index) => {
    return (
      <ExternalPushLink
        title="办卡攻略"
        key={"artical"+index}
        toKey="CardArticalDetail"
        componentProps={{fetchingParams: artical.id}}
        >
        <CardArticalListItem {...artical}/>
      </ExternalPushLink>
    ) 
  })

  return (
    <ScrollView style={dstyles.container}>
      {articals}
    </ScrollView>
  )

}


function mapStateToProps(state) {
  let { details, ...cardArticals } = state.cardArtical;
  return cardArticals;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchCardArticals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, CardArticals));
