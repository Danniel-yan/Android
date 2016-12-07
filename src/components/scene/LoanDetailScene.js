import React, { PureComponent, PropTypes } from 'react';
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
import WebLink from 'components/shared/WebLink';
import { ExternalPushLink } from 'containers/shared/Link';

import iconSqlc from 'assets/icons/shenqingliucheng.png'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import * as defaultStyles from 'styles';

import Button from 'components/shared/Button'
import AbstractScene from 'components/scene/AbstractScene.js';

import Picker from 'components/shared/Picker';

export default class LoanDetailScene extends PureComponent {

  constructor(props) {
    super(props);
    this.sceneEntity= props.detail.title;
    this.sceneTopic = "detail";
    this.sceneKey = "loan";

    this.state = {
      amount: String(props.detail.amount_min),
      value: props.detail.period_list[0],
      id: props.detail.id
    };

    this.changeFlag = null;

  }

  componentWillMount() {
    if(!this.props.loginUser.fetched) {
      AsyncStorage.getItem('userToken').then(userToken => {
        if(userToken != null) {
          this.props.fetchUser();
        }
      })
    }

    this.props.fetchRepay({id:this.state.id, amount: parseInt(this.state.amount), period: this.state.value})
  }

  changeAmount(amount) {
    clearTimeout(this.changeFlag);
    this.state.amount = amount;
    this.changeFlag = setTimeout(() => {
      this.props.fetchRepay({id:this.state.id,amount: parseInt(this.state.amount) ,period: this.state.value});
    }, 600);
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
              <View style={[styles.flexPanel,{borderRightWidth:0, paddingRight:10,alignItems:'flex-end'}]}>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                  <Text style={{fontSize:17,color:'#333'}}>金额</Text>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    style={[styles.selectBox, styles.pickerTxt]}
                    keyboardType={'numeric'}
                    onChangeText={(amount) => this.changeAmount(amount)}
                    defaultValue={this.state.amount}/>
                  <Text>元</Text>
                </View>
                <Text>额度范围: {detail.amount_showinfo}</Text>
              </View>
              <View style={[styles.flexPanel,{borderRightWidth:0,alignItems:'flex-end'}]}>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                  <Text style={{fontSize:17,color:'#333'}}>期数</Text>

                  {this._renderPeriodList(detail.period_list)}

                  <Text>{detail.period_name}</Text>
                </View>
                <Text>期数范围: {detail.period_showinfo}</Text>
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
                  <View key={idx} style={{flex: 8, alignItems: 'center', justifyContent: "center", flexDirection: "column"}}>
                    <Image style={{width:36,height:36}} source={{uri:item.img.x3}} />
                    <Text style={{marginTop:8, textAlign:"center"}}>{item.name}</Text>
                  </View>
                ) : (
                  <View key={idx} style={{flex:1, alignItems: 'center',  justifyContent: "center", flexDirection: "column", paddingBottom: 20}}>
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
          onChange={(value)=>{ this.props.fetchRepay({id:this.state.id,amount: this.state.amount ,period: value})}}
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
    let loginUser = this.props.loginUser;
    let hasLogin = loginUser && loginUser.info && loginUser.info.id_no;

    if(loginUser.isFetching || this.props.isIOSVerifying) { return null; }

    if(hasLogin) {
      return (
        <WebLink
          tracking={{key: 'detail', topic: 'btn_sec', entity: 'application', event: 'click'}}
          style={styles.loanButton} textStyle={styles.loanButtonText} text="去贷款" url={this.props.detail.url || ''} title={this.props.detail.title}/>
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
        />
    );
  }
}
