import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import L2RText from 'components/shared/L2RText';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import { flexRow, container, colors, fontSize, border } from 'styles'

import SubmitButton from './SubmitButton';

class LoanSign extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.content}>
          <L2RText style={styles.item} left="姓名" right="123" rightStyle={styles.text}/>
          <L2RText style={styles.item} left="身份证号" right="123" rightStyle={styles.text}/>

          <L2RText style={[styles.item, styles.amount]} left="合同金额" right="123" rightStyle={styles.text}>
            <Text style={styles.amountTip}>本次借款手续费为3,000元，到手金额为50,000元</Text>
          </L2RText>

          <L2RText style={styles.item} left="借款期限" right="123" rightStyle={styles.text}/>
          <L2RText style={styles.item} left="月服务费率" right="123" rightStyle={styles.text}/>

          <ExternalPushLink>
            <L2RText style={styles.item} left="借款期限" right="" rightStyle={styles.text}>
              <NextIcon/>
            </L2RText>
          </ExternalPushLink>

          <ExternalPushLink>
            <L2RText style={styles.item} left="借款期限" right="123123123" rightStyle={styles.text}/>
          </ExternalPushLink>
        </View>

        <View style={styles.textRow}>
          <Text>我已阅读并同意《借款咨询服务协议》相关条款</Text>
        </View>

        <SubmitButton text="提交"/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textRow: {
    padding: 10,
  },
  item: {
    position: 'relative',
    backgroundColor: '#fff',
    height: 55,
    ...border('bottom')
  },
  amount: {
    height: 80,
    paddingBottom: 30,
  },
  amountTip: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    color: colors.grayLight,
    fontSize: fontSize.normal
  },
  text: {
    color: colors.grayLight
  }
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return {isFetching: false, fetched: true}
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.preloanStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(LoanSign)));
