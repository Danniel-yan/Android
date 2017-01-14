import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import onlineActions from 'actions/online';

const payStatus = { "NORMAL": "正常" }
const cardTypes = { "ID_CARD": "身份证" }

class GjjDetailReport extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    let detail = this.props.detail && this.props.detail.data ? this.props.detail.data : null;

    if(!detail) return (<View><Text>{this.props.err}</Text></View>)

    let userInfo = detail.user_info ? detail.user_info : {};

    let { real_name, gender, card_type, pay_status, id_card, card_no, begin_date,
      corporation_number, corporation_name, corporation_ratio, customer_ratio, base_number, fund_balance, last_pay_date } = userInfo;

      console.log("detail")
    console.log(detail)

    id_card = id_card || card_no;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>姓名</Text>
          <TextInput value={real_name}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>性别</Text>
          <TextInput value={gender}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>证件类型</Text>
          <TextInput value={cardTypes[card_type]}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>证件号码</Text>
          <TextInput value={id_card.toString()}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>开户日期</Text>
          <TextInput value={begin_date}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>存缴状态</Text>
          <TextInput value={payStatus[pay_status]}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>单位名称</Text>
          <TextInput value={corporation_name}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>单位缴存</Text>
          <TextInput value={corporation_ratio ? corporation_ratio.toString() : ""}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>个人缴存</Text>
          <TextInput value={customer_ratio ? customer_ratio.toString() : ""}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>基数</Text>
          <TextInput value={base_number ? base_number.toString() : ""}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>公积金余额</Text>
          <TextInput value={fund_balance ? fund_balance.toString() : ""}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>最后缴费日期</Text>
          <TextInput value={last_pay_date}
                     style={styles.input}
                     placeholder=''
                     underlineColorAndroid="transparent"
                     editable={false}
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
    backgroundColor: '#fff',
    textAlign: "right",
    color: "#333"
  },
  text: { color: '#A5A5A5' }
})

function mapStateToProps(state) {
  return state.online.gjjDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    beforeRender: () => dispatch({type: "requestGjjDetail"}),
    fetching: () => dispatch(onlineActions.gjjDetail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, GjjDetailReport, true));
