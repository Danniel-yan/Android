import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Modal,TextInput
} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';
import { ExternalPushLink } from 'containers/shared/Link';
import alert from 'utils/alert';
import { externalPop } from 'actions/navigation';

import iconSqlc from 'assets/icons/shenqingliucheng.png'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import * as defaultStyles from 'styles';
import {
  loanType,
  firstFilterStatusSuccess,
  preloanStatus as preloanStatusConstants
} from 'constants';

import Button from 'components/shared/Button'
import AbstractScene from 'components/scene/AbstractScene.js';

import Picker from 'components/shared/Picker';

export default class LoanDetailScene extends Component {

  tracking() {
    let detail = this.props.detail;
    return { key: 'loan', topic: 'product_detail', id: detail.id, title: detail.title };
  }

  constructor(props) {
    super(props);

    var repayParams = this.props.repayCalc ? this.props.repayCalc.fetchedParams : null;

    this.state = {
      checkingGPS: false,
      amount: repayParams ? repayParams.amount.toString() : String(props.detail.amount_min),
      value: repayParams ? repayParams.period : props.detail.period_list[0],
      id: repayParams ? repayParams.id : props.detail.id
    };

    this.changeFlag = null;
  }

  componentWillMount() {

    var fetchedParams = this.props.repayCalc ? this.props.repayCalc.fetchedParams : null;

    if(fetchedParams && fetchedParams.amount == parseInt(this.state.amount) && fetchedParams.period == this.state.value && fetchedParams.id == this.state.id) return;
    this.props.fetchRepay({id:this.state.id, amount: parseInt(this.state.amount), period: this.state.value})
  }

  _formChange(name, value) {
    this.setState({ [name]: value })
  }

  _fetchRepay() {
    this.props.fetchRepay({
      id: this.state.id,
      amount: parseInt(this.state.amount),
      period: this.state.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.repayCalc.error){
      this.setState({amount: String(nextProps.repayCalc.fetchedParams.amount)});
    }
  }

  render() {

    let detail = this.props.detail;
    let sectionList = [], length = detail.apply_list.length;
    detail.apply_list.map((item, idx) => { sectionList.push(item); if(idx !== length - 1) sectionList.push("processIcon"); })

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

        <ScrollView>
          <View style={[styles.flexColumn, styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}>
              <Image source={{uri:detail.logo_detail}} style={styles.thumbnailLarge} />
              <View style={styles.rightContainer}>
                <Text style={[styles.rightContainerTitle,{marginBottom:10}]}>{detail.title}</Text>
                <Text style={[styles.rightContainerSubTitle,{marginBottom:10}]}>{detail.info}</Text>
                <View style={styles.rightContainerDes}><Text style={styles.rightContainerDesText}>{detail.tips}</Text></View>
              </View>
            </View>

            <View style={styles.flexContainerRow}>
              <View style={[styles.flexPanel,{borderRightWidth:0, alignItems:'center',flex: 1}]}>
                <View>
                  <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{fontSize:17,color:'#333'}}>金额</Text>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      style={[styles.selectBox, styles.pickerTxt]}
                      keyboardType={'numeric'}
                      onChangeText={this._formChange.bind(this, 'amount')}
                      onBlur={this._fetchRepay.bind(this)}
                      value={this.state.amount}/>
                    <Text>元</Text>
                  </View>
                  <View style={{alignItems: "flex-end"}}>
                    <Text>额度范围: {detail.amount_showinfo}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.flexPanel,{borderRightWidth:0, alignItems:'center',flex: 1}]}>
                <View>
                  <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{fontSize:17,color:'#333'}}>期数</Text>

                    {this._renderPeriodList(detail.period_list)}

                    <Text>{detail.period_name}</Text>
                  </View>
                  <View style={{alignItems: "flex-end"}}>
                    <Text>期数范围: {detail.period_showinfo}</Text>
                  </View>
                </View>
              </View>
            </View>

            {this._renderRepayCalc()}

          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}><Text style={styles.applyTitle}>申请流程</Text></View>

            <View style={{flexDirection: 'row',padding:10}}>
            {
              sectionList.map((item, idx) => {
                return (item != "processIcon") ? (
                  <View key={idx} style={{flex: 6, alignItems: 'center', justifyContent: "flex-start", flexDirection: "column"}}>
                    <Image style={{width:36,height:36}} source={{uri:item.img.x2}} />
                    <Text style={{marginTop:8, textAlign:"center"}}>{item.name}</Text>
                  </View>
                ) : (
                  <View key={idx} style={{flex:1, alignItems: 'center',  justifyContent: "flex-start", flexDirection: "column", paddingBottom: 20,marginTop:15}}>
                    <Image source={require('assets/icons/jiantou.png')}/>
                  </View>
                )
              })
            }
            </View>
          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={[styles.flexContainerRow]}><Text style={styles.applyTitle}>申请条件</Text></View>
            <View style={{padding:15}}>
              <Text style={{lineHeight: 24}}>{detail.apply_info}</Text>
            </View>
          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}><Text style={styles.applyTitle}>所有材料</Text></View>
            <View style={{padding:15}}>
              <View>
                <Text style={{lineHeight: 24}}>{detail.apply_content}</Text>
              </View>
            </View>
          </View>

        </ScrollView>

        {this._renderButton()}
      </View>
    );
  }

  _renderPeriodList(data){

    let periodList = [];

    if(data){

      data.map((value, index) => {
        periodList.push({value: value, label: String(value) })
      })

      return(
        <Picker
          style={styles.selectBox}
          textStyle={styles.pickerTxt}
          value={ this.state.value }
          onChange={value => {
            this.setState({value}, this._fetchRepay.bind(this))
          }}
          items={ periodList }
          />
      )

    }

  }


  _renderRepayCalc(){

    const repayCalc = this.props.repayCalc.repayCalc

    return(
      <View style={styles.flexRow}>
        <View style={styles.flexPanel}>
          <Text style={styles.number}>{repayCalc.repay}</Text>
          <Text>{repayCalc.repay_period}</Text>
        </View>
        <View style={[styles.flexPanel,{borderRightWidth:0}]}>
          <Text style={styles.number}>{repayCalc.interest}</Text>
          <Text>{repayCalc.interest_period}利率</Text>
        </View>
      </View>
    )
  }

  _renderButton() {

    if(this.props.isIOSVerifying) { return null; }

    let detail = this.props.detail;

    if(this.props.detail.loan_type == loanType.chaoshidai || this.props.detail.loan_type == loanType.gjj) {
      return (
        <ExternalPushLink
          processing={this.state.checkingGPS}
          {...this._chaoshidaiRouteProps()}
          style={styles.loanButton}
          textStyle={styles.loanButtonText}
          text="去贷款"
          tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                     title: detail.title, amount: this.state.amount, period: this.state.value}}
          />
      );
      // prePress={ () => this.props.setLoanType() }  AsyncStorage.setItem('loan_type', this.props.detail.loan_type.toString())
    }

    if(this.props.loginUser.valid) {
      return (
        <ExternalPushLink
          tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                     title: detail.title, amount: this.state.amount, period: this.state.value}}
          style={styles.loanButton}
          textStyle={styles.loanButtonText}
          text="去贷款"
          web={detail.url}
          title={detail.title}
          componentProps={{tracking:
            {key: 'loan', topic: 'loan_application', id: detail.id, title: detail.title}
          }}
          />
      );
    }


    return (
      <ExternalPushLink
        style={styles.loanButton}
        textStyle={styles.loanButtonText}
        text="去贷款"
        toKey="FillUserInfo"
        title="完善个人信息"
        componentProps={{onSubmitSuccess: this.props.goLoan.bind(null, this.props.detail)}}
        tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                   title: detail.title, amount: this.state.amount, period: this.state.value}}
        />
    );
  }

  _chaoshidaiRouteProps() {
    let logined = this.props.loginUser.info;
    let { onlineStatus } = this.props;
    let { status, time_expire_status } = onlineStatus;

    if(!logined) {
      return {
        loginSuccess: () => {
          this.props.fetchOnlineStatus();
          this.props.dispatch(externalPop());
        },
        toKey: 'Login',
        title: '登录'
      };
    }

    // console.log("贷款状态： " + status);

    // 预授信失败 // 失败
    if(status == 4 || status == 7) {
      return this.mergeProps({ toKey: 'OnlineUserInfo', title: '完善个人信息', prePress: this.checkGPS.bind(this)});
    }

    if(status == 5 && time_expire_status == 1) {
      return this.mergeProps({toKey: 'OnlinePreloanExpire', title: '预授信申请结果'});
    }

    if(status == 5) {
      return this.mergeProps({toKey: 'OnlinePreloanSuccess', title: '预授信申请结果'});
    }

    //6=提交贷款申请中，7=提交失败，8=提交成功，9=贷款申请失败，10=贷款申请成功
    if([6, 8, 9, 10].includes(status)) {
      return this.mergeProps({toKey: 'OnlineApproveStatus', title: '审批状态'});
    }

    if([11, 12, 13, 14].includes(status)) {
      return this.mergeProps({toKey: 'OnlineSignSuccess', title: '签约'});
    }

    if([15].includes(status)) {
      return this.mergeProps({toKey: 'OnlineLoanDetail', title: '借款详情'});
    }

    // 1,2
    return this.mergeProps({ toKey: 'OnlineUserInfo', title: '完善个人信息', prePress: this.checkGPS.bind(this)});
  }

  mergeProps(props) {
    return Object.assign({ componentProps: { loan_type: this.props.detail.loan_type}}, props);
  }

  checkGPS() {
    this.setState({ checkingGPS: true })
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ checkingGPS: false })
        resolve('');
      }, (error) => {
        alert("请打开定位");
        this.setState({ checkingGPS: false })
        reject('');
      });
    })
  }
}
