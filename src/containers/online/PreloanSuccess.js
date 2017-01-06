import React, { Component } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Text
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import RangeInput from 'components/shared/RangeInput';
import onlineStyles from './styles';
import ExpireGroup  from './ExpireGroup';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

class PreloanSuccess extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amount: props.data.sug_loan_amount,
    }

  }

  render() {
    let data = this.props.data;

    return (
      <ScrollView>
        <View style={styles.banner}>
          <Text style={styles.title}>预受额度：</Text>
          <Text style={styles.amount}>{data.sug_loan_amount}元</Text>
        </View>

        <View style={styles.descItem}>
          <Text style={[styles.text, container]}>借款期限：</Text>
          <Text style={styles.text}>{data.sug_term}期</Text>
        </View>

        <View style={styles.descItem}>
          <Text style={[styles.text, container]}>预受额度：</Text>
          <Text style={styles.text}>{data.interest_down}-{data.interest_up}</Text>
        </View>

        <View style={styles.amountWrap}>
          <Text style={styles.text}>申请金额：</Text>
          <RangeInput
            style={styles.amountSelector}
            value={this.state.amount}
            onChange={this._formChange.bind(this, 'amount')}
            step={1000}
            min={10000}
            minLabel="1万"
            maxLabel={(data.sug_loan_amount / 10000).toFixed(1) + '万'}
            max={data.sug_loan_amount}/>
        </View>

        <ExpireGroup style={styles.tip} date={this.props.onlineStatus.time_expire}/>

        <ExternalPushLink
          toKey="OnlineLoanForm"
          title="借款申请"
          componentProps={{ amount: this.state.amount }}
          text="立即申请"
          style={[onlineStyles.btn, onlineStyles.btnOffset ]}
          textStyle={onlineStyles.btnText}
        />
      </ScrollView>

    );
  }

  _formChange(name, value) {
    this.setState({ [name]: value })
  }

}


const styles = StyleSheet.create({
  banner: {
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  amountWrap: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: fontSize.xlarge,
    color: colors.grayDark
  },
  amount: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 25,
    color: colors.grayDark
  },
  amountSelector: {
    marginTop: 20,
    marginHorizontal: 10
  },
  descItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  text: {
    color: colors.grayDark,
    fontSize: fontSize.large
  },
  tip: {
    marginTop: 20,
  },
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return {
    ...state.online.preloanStatus,
    onlineStatus: state.online.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.preloanStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(PreloanSuccess)));
