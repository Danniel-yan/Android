import React, { Component } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Text
} from 'react-native';

import Input from 'components/shared/Input';
import ProcessingButton from 'components/shared/ProcessingButton';
import onlineStyles from './styles';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

class PreloanSuccess extends Component {
  state = {
    submitting: false
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

        <View style={styles.inputWrap}>
          <Text style={styles.text}>申请金额：</Text>
          <Input
            maxLength={5}
            style={[container, styles.input]}
            placeholder="请输入申请金额"/>
        </View>

        <ExpireGroup style={styles.tip} date={this.props.data.time_expire}/>


        <ProcessingButton
          processing={this.state.submitting}
          text="立即申请"
          onPress={this._submit.bind(this)}
          style={[onlineStyles.btn, onlineStyles.btnOffset ]}
          textStyle={onlineStyles.btnText}
        />
      </ScrollView>

    );
  }

  _selector() {
    let max = this.props.data.sug_loan_amount;

    return (
      <View>
        <View style={styles.sbg}>
          <Animated.View style={styles.scur}>
            <View style={styles.spoint}>
            </View>
            <View style={[centering, styles.svalue]}>
              <Text style={styles.snum}>12222</Text>
              <View style={styles.triangle}/>
            </View>
          </Animated.View>
        </View>

        <View style={styles.sfooter}>
          <Text style={[container, styles.text]}>1万</Text>
          <Text style={styles.text}>{(max / 10000).toFixed(1)}万</Text>
        </View>
      </View>
    );
  }

  _submit() {
  }

}


const styles = StyleSheet.create({
  sbg: {
    marginTop: 60,
    position: 'relative',
    height: 6,
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 3,
  },
  scur: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 6,
    width: 200,
    backgroundColor: '#FFBE00',
    borderRadius: 3,
  },
  spoint: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 14,
    height: 14,
    backgroundColor: '#FFBE00',
    borderRadius: 7,
  },
  triangle: {
    position: 'absolute',
    bottom: -4,
    left: 31,
    ...border('top', 4, '#FFBE00'),
    ...border('right', 4, 'transparent'),
    ...border('left', 4, 'transparent'),
  },
  svalue: {
    position: 'absolute',
    right: -31,
    top: -36,
    width: 70,
    height: 26,
    backgroundColor: '#FFBE00',
  },
  snum: {
    fontSize: fontSize.small,
    color: '#fff'
  },
  sfooter: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
  },
  banner: {
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  selectorWrap: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  inputWrap: {
    paddingHorizontal: 10,
    marginTop: 10,
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    textAlign: 'right'
  }
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return state.online.preloanStatus;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.preloanStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(PreloanSuccess)));
