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
      money: '5',
      value: '5',
      id: props.detail.id
    };

  }

  componentWillMount() {
    if(!this.props.loginUser.fetched) {
      AsyncStorage.getItem('userToken').then(userToken => {
        if(userToken != null) {
          this.props.fetchUser();
        }
      })
    }



  }

  render() {

    let detail = this.props.detail;

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

        <ScrollView>
          <View style={[styles.flexColumn, styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}>
              <Image source={{uri:detail.logo_detail}} style={{width:80,height:80}}  />
              <View style={styles.rightContainer}>
                <Text style={[styles.rightContainerTitle,{marginBottom:10}]}>{detail.title}</Text>
                <Text style={[styles.rightContainerSubTitle,{marginBottom:10}]}>{detail.info}</Text>
                <View style={styles.rightContainerDes}><Text style={{color:'#1ab4fe',fontSize:12}}>{detail.tips}</Text></View>
              </View>
            </View>

            <View style={styles.flexContainerRow}>
              <View style={[styles.flexPanel,{borderRightWidth:0}]}>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                  <Text style={{fontSize:17,color:'#333'}}>金额</Text>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.selectBox}
                    onChangeText={(money) => this.setState({money})}
                    value={this.state.money}/>
                  <Text>元</Text>
                </View>
                <Text>额度范围: {detail.amnout_showinfo}</Text>
              </View>
              <View style={[styles.flexPanel,{borderRightWidth:0}]}>
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
            <Image style={{width:Dimensions.get('window').width - 40,margin:20,marginBottom:8}} source={iconSqlc} />
            <View style={styles.applyBoxBody}>
              <View style={styles.flexAlignItems}><Text>身份认证</Text></View>
              <View style={styles.flexAlignItems}><Text>银行卡认证</Text></View>
              <View style={styles.flexAlignItems}><Text>人脸识别</Text></View>
              <View style={styles.flexAlignItems}><Text>公司识别</Text></View>
            </View>
          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={[styles.flexContainerRow]}><Text style={styles.applyTitle}>申请条件</Text></View>
            <View style={{padding:15}}>
              <Text>{detail.apply_info}</Text>
            </View>
          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}><Text style={styles.applyTitle}>所有材料</Text></View>
            <View style={{padding:15}}>
              <View>
                <Text>{detail.apply_content}</Text>
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
          onChange={(value)=>{this.setState({ value: value })}}
          items={ periodList }
          />
      )

    }

  }


  _renderRepayCalc(){

    console.log(this.state.value)

    return(
      <View style={styles.flexRow}>
        <View style={styles.flexPanel}>
          <Text style={styles.number}></Text>
          <Text>每月还款(元)</Text>
        </View>
        <View style={[styles.flexPanel,{borderRightWidth:0}]}>
          <Text style={styles.number}></Text>
          <Text>月利率</Text>
        </View>
      </View>
    )
  }

  _renderButton() {
    let loginUser = this.props.loginUser;
    let needLogin = loginUser && loginUser.info && loginUser.info.id_no;

    if(loginUser.isFetching) { return null; }

    if(needLogin) {
      return (
        <WebLink style={styles.loanButton} textStyle={styles.loanButtonText} text="去贷款" url={this.props.detail.url || ''} title={this.props.detail.title}/>
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
