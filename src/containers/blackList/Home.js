import React, { Component } from 'react';
import { View, Image ,StyleSheet,Text, TextInput, Modal, TouchableOpacity, Dimensions} from 'react-native';

import Button from 'components/shared/ButtonBase';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
//import Banner from 'containers/scene/home/Banner';
import validators from 'utils/validators';

import PayModal from './PayModal';

const {width, height } = Dimensions.get('window');

class blackListHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      ID : '',
      mobile : '',
      err : '',
      submitting : false,
      flags : false,
      payModalVisible: false
    }
  }
  render(){
    return(
      <View style = {{flex : 1}}>
        <View style = {styles.top}>
          {this._renderNavItem('当信息完整度超过70%，可免费查询一次',{toKey : 'CreditLoan', title : '信用贷'}, {status : this.props.creditScore >70 ? '立即查询' : '去完善'})}
          {this._renderNavItem('已有网贷征信报告',{toKey : 'CreditReport', title : '网贷征信报告'},{status : false ? '去完善' : '立即查看'})}
        </View>
        <View style = {styles.bottom}>
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>真实姓名</Text>
            <TextInput
              placeholder = '请输入您的姓名'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>身份证号码</Text>
            <TextInput
              placeholder = '请输入身份证号码'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={ID => this.setState({ID})}
              maxLength = {18}
            />
          </View>
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>手机号码</Text>
            <TextInput
              placeholder = '请输入您的手机号码'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={mobile => this.setState({mobile})}
              maxLength = {11}
            />
          </View>
          <Text style = {{paddingLeft : 10, marginBottom : 20}}>我们提供付费代查网贷征信服务，查询费用3元／次</Text>
          <View style = {styles.btn}>
            <Button
              style={styles.submitBtn}
              onPress={() => {this._submit()}}>
              <Text style={styles.submitBtnText}>开始查询</Text>
            </Button>
          </View>
          <View style = {{paddingLeft : 10}}>
            <Text style = {styles.footerTitle}>网贷征信查询</Text>
            <ExternalPushLink
              toKey="CardScene"
              title="办卡"
              componentProps ={{onBack : true}}>
              <View style = {styles.footer}>
                <Text style = {styles.footerCircle}>.</Text>
                <Text style = {styles.footerTxt}>权威数据，查询网贷信用</Text>
              </View>
            </ExternalPushLink>
            <ExternalPushLink
              toKey="CardScene"
              title="办卡"
              componentProps ={{onBack : true}}>
              <View style = {styles.footer}>
                <Text style = {styles.footerCircle}>.</Text>
                <Text style = {styles.footerTxt}>申请网贷被拒，可能中了网贷征信黑名单，建议关注</Text>
              </View>
            </ExternalPushLink>
            <ExternalPushLink
              toKey="AddBankCard"
              title="添加银行卡"
              componentProps ={{onBack : true}}>
              <View style = {styles.footer}>
                <Text style = {styles.footerCircle}>.</Text>
                <Text style = {styles.footerTxt}>您的网贷信用情况</Text>
              </View>
            </ExternalPushLink>

          </View>
        </View>

        <View style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,height: this.state.payModalVisible ? null : 0, overflow: "hidden"}}>
          <PayModal close={() => this.setState({payModalVisible: false})} />
        </View>
      </View>
    )
  }

  _renderNavItem( txt, navProps, status) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize:14}]}>{txt}</Text>
          <View style = {{flexDirection : 'row'}}>
            <Text style = {{color : 'orange'}}>{status.status}</Text>
            <NextIcon/>
          </View>
        </View>
      </ExternalPushLink>
    )
  }

  renderItem(title,placeholder,value,maxLength){
    return (
      <View style = {styles.item}>
        <Text style = {styles.itemTitle}>{title}</Text>
        <View style = {styles.borderBottomStyle}>
          <TextInput
            placeholder = {placeholder}
            style = {styles.itemInput}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            onChangeText={value => this.setState({value})}
            maxLength = {maxLength}
          />
        </View>
      </View>
    )
  }

  _validation() {
    let mobileValid = validators.mobile(this.state.mobile);
    let nameValid = this.state.name.length > 0;
    let IDValid = this.state.ID.length > 0;
    if(!nameValid) {
      this.setState({err: '请输入姓名'});
      return false;
    }

    if(!IDValid) {
      this.setState({err: '请输入身份证号码'});
      return false;
    }

    this.setState({err: ''});
    return true;
  }

  _submit() {
    // if(!this._validation()) {
    //   console.log('yanzheng');
    //   console.log(this.state.mobile)
    //   return null;
    // }

    this.props.initialTarget && this.props.initialTarget({
      // realname: this.state.name,
      // idnum: this.state.ID,
      // mobile: this.state.mobile
      realname: '王睆',
      idnum: '320682199010086139',
      mobile: '18221309578'
    });

    // createTicket && createTicket()

    this.setState({ payModalVisible : true });
  }


}

const styles = StyleSheet.create({
  modalContainer : {
    flex : 1,
    backgroundColor : 'rgba(0,0,0,0.5)',
    justifyContent : 'center',
    alignItems : 'center'
  },
  modalSubContainer : {
    width : 160,
    height : 110,
    backgroundColor : '#fff',
    padding : 10
  },
  modalTitle : {
    textAlign : 'center',
    marginBottom : 10
  },
  modalBottom : {
    borderTopWidth : 1,
    borderTopColor : '#cecece',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 10
  },
  btn : {
    paddingHorizontal : 20,
    paddingBottom : 5,
    marginBottom : 80
  },
  color : {
    color : 'blue'
  },
  top : {
    marginBottom : 20
  },
  bottom : {
    backgroundColor : '#fff',
    flex : 1,
    paddingHorizontal : 10,
    paddingTop : 10
  },
  item : {
    paddingLeft : 10,
    marginBottom : 10,
    flexDirection : 'row',
    paddingVertical : 10,
    borderBottomWidth : 1,
    borderBottomColor : '#cecece',
    height : 50,
    alignItems : 'center'
  },
  itemTitle : {
    marginBottom : 10,
    width : 100
  },
  itemInput : {
    fontSize : 16,
    height : 25,
    flex : 1,
    textAlign : 'right',
    paddingRight : 20
  },
  submitBtn: {
    marginTop: 10,
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
  footer : {
    flexDirection : 'row',
    height : 20,
    alignItems : 'center'
  },
  footerTitle : {
    color : 'orange',
    marginBottom : 10,

  },
  footerCircle : {
    fontSize : 30,
    lineHeight : 18,
    color : 'orange',
    backgroundColor : 'transparent',
    marginRight : 3
  },
  footerTxt : {
    flex : 1
  }
});

import { connect } from 'react-redux';
import { CreateBlackListTicket, InitalBlackListTarget } from 'actions/blackList';

function mapStateToProps(state) {
  return state.blackListData
}

function mapDispatchToProps(dispatch) {
  return {
    createTicket: body => dispatch(CreateBlackListTicket(body)),
    initialTarget: targetInfo => dispatch(InitalBlackListTarget(targetInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(blackListHome);
