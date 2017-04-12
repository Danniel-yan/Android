import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Modal,TextInput,
  NativeModules
} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';
import { ExternalPushLink } from 'containers/shared/Link';
import alert from 'utils/alert';
import { externalPop } from 'actions/navigation';

import iconSqlc from 'assets/icons/shenqingliucheng.png'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalOnlineBtn } from 'components/shared/ExternalOnlineBtn';
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

    let detail = this.props.detail, btnTxt = this.props.isIOS? '立即申请' : "去贷款";

    if(this.props.detail.loan_type == loanType.chaoshidai || this.props.detail.loan_type == loanType.gjj || this.props.detail.loan_type == loanType.chaohaodai) {
      return <ExternalOnlineBtn
        loginUser={this.props.loginUser} onlineStatus={this.props.onlineStatus}
        fetchOnlineStatus={this.props.fetchOnlineStatus}
        externalPop={() => this.props.dispatch(externalPop())}
        detail={this.props.detail}
        style={styles.loanButton} textStyle={styles.loanButtonText}
        tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
        title: detail.title, amount: this.state.amount, period: this.state.value}} />
      // prePress={ () => this.props.setLoanType() }  AsyncStorage.setItem('loan_type', this.props.detail.loan_type.toString())
    }

    if(this.props.loginUser.valid) {
      return this.props.isIOS ? (
        <Button
          tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                     title: detail.title, amount: this.state.amount, period: this.state.value}}
          style={styles.loanButton}
          textStyle={styles.loanButtonText}
          text={btnTxt}
          onPress={() => {this.__skipToSafari__(detail.url)}}
          />
      ) : (
        <ExternalPushLink
          tracking={{key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                     title: detail.title, amount: this.state.amount, period: this.state.value}}
          style={styles.loanButton}
          textStyle={styles.loanButtonText}
          text={btnTxt}
          web={detail.url}
          title={detail.title}
          componentProps={{tracking:
            {key: 'loan', topic: 'loan_application', id: detail.id, title: detail.title}
          }}
          />
      );
    }

    let loanTracking = {key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
               title: detail.title, amount: this.state.amount, period: this.state.value};

    return (
      <ExternalPushLink
        style={styles.loanButton}
        textStyle={styles.loanButtonText}
        text={this.props.isIOS?'立即查看' : "去贷款"}
        toKey="FillUserInfo"
        title="完善个人信息"
        componentProps={{onSubmitSuccess: this.props.goLoan.bind(null, this.props.detail, loanTracking)}}
        tracking={loanTracking}
        />
    );
  }

  __skipToSafari__(url) {
    var skipFunc = NativeModules.SkipSafari ? NativeModules.SkipSafari.skipSafariForUrlStr : null;

    skipFunc && typeof skipFunc == "function" && skipFunc(url);
  }
}
