import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

class FundReportScene extends Component{
  constructor(props) {
    super(props);
  }
  render() {

    let {real_name,gender,card_type,id_card,begin_date,pay_status,corporation_name,
      corporation_ratio,customer_ratio,base_number,fund_balance,last_pay_date} = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>姓名</Text>
          <TextInput value={real_name}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(real_name) => { this.setState({real_name}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>性别</Text>
          <TextInput value={gender}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(gender) => { this.setState({gender}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>证件类型</Text>
          <TextInput value={card_type}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(card_type) => { this.setState({card_type}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>证件号码</Text>
          <TextInput value={id_card}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(id_card) => { this.setState({id_card}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>开户日期</Text>
          <TextInput value={begin_date}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(begin_date) => { this.setState({begin_date}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>存缴状态</Text>
          <TextInput value={pay_status}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(pay_status) => { this.setState({pay_status}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>单位名称</Text>
          <TextInput value={corporation_name}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(corporation_name) => { this.setState({corporation_name}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>单位缴存</Text>
          <TextInput value={corporation_ratio}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(corporation_ratio) => { this.setState({corporation_ratio}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>个人缴存</Text>
          <TextInput value={customer_ratio}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(customer_ratio) => { this.setState({customer_ratio}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>基数</Text>
          <TextInput value={base_number}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(base_number) => { this.setState({base_number}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>公积金余额</Text>
          <TextInput value={fund_balance}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(fund_balance) => { this.setState({fund_balance}) }}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>最后缴费日期</Text>
          <TextInput value={last_pay_date}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     onChangeText={(last_pay_date) => { this.setState({last_pay_date}) }}
            />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  inputGroup: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    marginLeft: 18,
    marginRight: 10,
    fontSize: 12,
    color: '#A5A5A5',
    backgroundColor: '#fff'
  },
})

function mapStateToProps(state) {
  return state.billDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.billDetail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, FundReportScene));