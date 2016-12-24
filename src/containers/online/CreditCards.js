import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import { ExternalPushLink } from 'containers/shared/Link';
import NextIcon from 'components/shared/NextIcon';
import MenuItem from 'components/shared/MenuItem';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

import actions from 'actions/online';

export class CreditCards extends Component {
  render() {

    let banks = this.props.banks.map((bank, index) => {
      return (
        <ExternalPushLink
          key={"bank"+index}
          title="信用卡认证"
          toKey="OnlineCreditCardForm"
          componentProps={{fetchingParams: bank.id}}
          >
          <MenuItem
            iconStyle={styles.icon}
            icon={bank.logo.px80}
            title={bank.name}/>
        </ExternalPushLink>
      );
    })

    return (
      <ScrollView>
        <Text style={styles.title}>网银导入</Text>
        {banks}
      </ScrollView>
    );
  }
}

function mapState(store) {
  return store.online.banks;
}

function mapDispatch(dispatch) {
  return {
    fetching: () => dispatch(actions.banks())
  };
}

export default connect(mapState, mapDispatch)(AsynCpGenerator(Loading, CreditCards));

const styles = StyleSheet.create({
  title: {
    padding: 10,
    color: colors.grayLight,
    fontSize: fontSize.small
  },
  icon: {
    height: 40,
    width: 40
  }
});
