import React, { Component } from 'react';
import { View, Image ,StyleSheet,Text, TextInput, Modal, TouchableOpacity, Dimensions } from 'react-native';

import Button from 'components/shared/ButtonBase';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import ProcessingButton from 'components/shared/ProcessingButton';
import Input from 'components/shared/Input';
import Checkbox from 'components/shared/Checkbox'

import { trackingScene } from 'high-order/trackingPointGenerator';
import validators from 'utils/validators';
import { fontSize ,colors} from 'styles';

import PayModal from './PayModal';

const {width, height } = Dimensions.get('window');

class blackListHome extends Component {
  tracking = "blacklist";
  constructor(props){
    super(props);
    this.state = {
      // name : '王睆',
      // ID : '320682199010086139',
      // mobile : '18221309578',
      name : '',
      ID : '',
      mobile : '',
      err : '',
      submitting : false,
      flags : false,
      payModalVisible: false,
      checkedAgreement:true,
    }
  }

  render(){
    var err = this.state.err;// || this.props.ticketError;
    return(
      <View style={{flex : 1}}>
        <View style={styles.top}>
          {this._renderNavItem('完善任意一项信用材料，均可免费查询一次',{toKey : 'CreditLoan', title : '信用贷', tracking: {
            key: 'blacklist', topic: 'deposit', entity: 'clk'
          }}, {status : this.props.creditScore >= 70 ? '立即查询' : '去完善'})}
          {this.props.reports && this.props.reports.length > 0 ? this._renderNavItem('已有网贷征信报告',{toKey : 'BlackListReports', title : '已有报告', tracking: {
            key: 'blacklist', topic: 'review', entity: 'clk'
          }},{status: '立即查看'}) : null}
        </View>
        <View style={styles.bottom}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>真实姓名</Text>
            <View style={{flex: 1, height: 30}}>
              <Input
                placeholder='请输入您的真实姓名'
                style={[styles.itemInput]}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                value={this.state.name}
                onChangeText={name => this.setState({name, err: null})}
                tracking={{key: 'blacklist', topic: 'name', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>身份证号码</Text>
            <View style={{flex: 1, height: 30}}>
              <Input
                placeholder='请输入身份证号码'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                value={this.state.ID}
                onChangeText={ID => this.setState({ID, err: null})}
                maxLength={18}
                tracking={{key: 'blacklist', topic: 'ID', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>手机号码</Text>
            <View style={{flex: 1, height: 30}}>
              <Input
                type='number'
                placeholder='请输入您的手机号码'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                onChangeText={mobile => this.setState({mobile, err: null})}
                value={this.state.mobile}
                maxLength={11}
                tracking={{key: 'blacklist', topic: 'cell', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems:"center", marginVertical: 10}}>
            <Text style={{paddingLeft: 10, fontSize: fontSize.xsmall, color: '#666'}}>
              我们提供付费代查网贷征信服务，查询费用
              <Text style={{color: '#FF6D17', fontSize: fontSize.xsmall}}>3元／次</Text>
            </Text>
          </View>
          <View style={{height: 14}}><Text style={{textAlign: "center", color : '#FF003C', fontSize : fontSize.small}}>{err ? err : " "}</Text></View>
          <View style={styles.btn}>
            <ProcessingButton
              style={styles.submitBtn}
              textStyle={styles.submitBtnText}
              processing={this.props.isFetchingTicket}
              onPress={() => {this._submit()}}
              text={"开始查询"}
              tracking={{key: 'blacklist', topic: 'submit', event: 'clk'}}>
            </ProcessingButton>
          </View>
          <View style={styles.textRow}>
            <Checkbox checked={this.state.checkedAgreement} onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})} style={{marginRight: 5}}/>
            <Text onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})} style = {{fontSize : 12, color: '#666'}}>阅读并接受</Text>
            <ExternalPushLink
                web='https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/shenqingheyue.html'
                text="《个人信用信息查询授权书》"
                title="《个人信用信息查询授权书》"
                textStyle={{ color: colors.secondary, fontSize: 12}}
            />
          </View>
          <View style={{paddingLeft : 10}}>
            <Text style={styles.footerTitle}>网贷征信查询</Text>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>权威数据，一次了解你的网贷信用</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>根据信用数据智能推荐贷款产品，助你申请成功率更高</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>数据实时更新，准确性高</Text>
              </View>
          </View>
        </View>

        {
          this.props.ticket && !this.props.isFetchingTicket ? (
            <View style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0}}>
              <PayModal close={() => this.setState({payModalVisible: false})} />
            </View>
          ) : null
        }


      </View>
    )
  }

  _renderNavItem( txt, navProps, status) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize:14}]}>{txt}</Text>
          <View style={{flexDirection : 'row'}}>
            <Text style={{color : '#FF6D17'}}>{status.status}</Text>
            <NextIcon/>
          </View>
        </View>
      </ExternalPushLink>
    )
  }

  _validation() {
    if(!this.state.name) {
      this.setState({err: '请输入姓名'});
      return false;
    }

    if(!this.state.ID) {
      this.setState({err: '请输入身份证号码'});
      return false;
    }

    if(this.state.ID.length != 15 && this.state.ID.length != 18) {
      this.setState({err: '请输入有效身份证号码'});
      return false;
    }

    if(!validators.mobile(this.state.mobile)) {
      this.setState({err: '请输入有效手机号码'});
      return false;
    }

    if(!this.state.checkedAgreement){
      this.setState({err : '请阅读并同意授权书'});
        return false;
    }
    this.setState({err: ''});
    return true;
  }

  _submit() {
    if(!this._validation()) {
      return null;
    }

    var body = {
      realname: this.state.name,
      idnum: this.state.ID,
      mobile: this.state.mobile
    };
    this.props.submit && this.props.submit(body);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.ticketError) {
      this.setState({err: newProps.ticketError});
    }
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
    paddingHorizontal : 25,
    paddingBottom : 5,
    //marginBottom : 80
  },
  color : {
    color : 'blue'
  },
  top : {
    marginBottom : 5
  },
  bottom : {
    backgroundColor : '#fff',
    flex : 1,
    // paddingHorizontal : 10,
    // paddingTop : 10
  },
  item : {
    paddingHorizontal : 10,
    flexDirection : 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
  },
  itemTitle : {
    fontSize : 16,
    color : '#333'
  },
  itemInput : {
    fontSize : 16,
    height : 25,
    flex : 1,
    textAlign : 'right',
    color : '#666'
  },
  submitBtn: {
    marginTop: 10,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#FE271E',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
  footer : {
    flexDirection : 'row',
    height : 20,
    alignItems : 'center',
    marginBottom : 5
  },
  footerTitle : {
    color : '#FF6D17',
    marginBottom : 10,

  },
  footerCircle : {
    fontSize : 30,
    lineHeight : 18,
    color : '#FF6D17',
    backgroundColor : 'transparent',
    marginRight : 3
  },
  footerTxt : {
    flex : 1,
    color : '#333'
  },
  textRow: {
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      marginLeft : 10,
      justifyContent : 'center',
      marginBottom : 60,
  },
});

import { connect } from 'react-redux';
import { FreeStatus, BlackListReports, CardList, CreateBlackListTicket, InitalBlackListTarget } from 'actions/blackList';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return Object.assign({}, state.blackListData, {
    isFetching: state.blackListData.isFetchingReports
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(FreeStatus());
      dispatch(BlackListReports());
      dispatch(CardList());
    },
    checkFree: () => dispatch(FreeStatus()),
    // fetchCardList: () => dispatch(CardList()),
    submit: body => {
      dispatch(InitalBlackListTarget(body));
      dispatch(CreateBlackListTicket());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(blackListHome)));
