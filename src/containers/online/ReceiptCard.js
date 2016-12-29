import React, { Component } from 'React';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import L2RText from 'components/shared/L2RText';
import GroupTitle from 'components/GroupTitle';
import SubmitButton from './SubmitButton';
import { InputGroup, PickerGroup } from 'components/form';

import { colors, responsive, fontSize, border } from 'styles';

class ReceiptCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      card: '',
      bank: ''
    };
  }
  
  render() {
    return (
      <ScrollView>
        <L2RText left="姓名" right="123" style={styles.item} rightStyle={styles.input}/>
        <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="注：由于是收款及扣款银行卡，请认真填写"/>
        <InputGroup
          label="预留手机号"
          keyboardType="numeric"
          value={this.state.mobile}
          valueChanged={this._formChange.bind(this, 'mobile')}
          style={{wrap: styles.item, input: styles.input}}
        />
        <InputGroup
          label="银行卡号"
          keyboardType="numeric"
          value={this.state.card}
          valueChanged={this._formChange.bind(this, 'card')}
          style={{wrap: styles.item, input: styles.input}}
        />
        <PickerGroup
          label="开户银行"
          value={this.state.bank}
          valueChanged={this._formChange.bind(this, 'bank')}
          style={{wrap: styles.item}}
          items={['广大', '哈哈']}
          textStyle={styles.input}
        />

        <Text style={styles.bankTip}>限支持银行：广发银行、光大银行、兴业银行、平安银行、工商银行、农业银行、中国银行、建设银行、中心银行、交通银行、民生银行、浦发银行、上海银行、招商银行</Text>

        <SubmitButton
          offset={true}
          text="提交"
        />
      </ScrollView>
    );
  }

  _formChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.setState({ [name]: value });
  }
}


const styles = StyleSheet.create({
  item: {
    height: 55
  },
  input: {
    color: colors.grayLight,
  },
  bankTip: {
    textAlign: 'justify',
    marginVertical: 10,
    paddingHorizontal: 10,
    lineHeight: 18,
    fontSize: fontSize.normal,
    color: colors.gray
  },
  groupTitle: {
    backgroundColor: colors.bg
  },
  groupTitleText: {
    fontSize: fontSize.normal
  },
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return state.online.approveStatus;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.approveStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(ReceiptCard)));
