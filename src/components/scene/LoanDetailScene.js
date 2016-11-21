import React, { Component } from 'react';
import { View  , StyleSheet, ScrollView , Image, ActivityIndicator} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';

import iconSqlc from 'assets/icons/shenqingliucheng.png'
import Dimensions from 'Dimensions';

import Button from 'components/shared/Button'

export default class LoanDetailScene extends Component {

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

        <ScrollView>
          <View style={[styles.flexColumn, styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}>
              <Image source={{uri:this.props.detail.thumbnail}} style={styles.thumbnail} />
              <View style={styles.rightContainer}>
                <Text style={styles.rightContainerTitle}>{this.props.detail.name}</Text>
                <Text style={styles.rightContainerSubTitle}>{this.props.detail.dec}</Text>
                <Text style={styles.rightContainerDes}>无需抵押</Text>
              </View>
            </View>

            <View style={styles.flexContainerRow}>
              <View style={[styles.flexPanel,{borderRightWidth:0}]}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize:17,color:'#333'}}>金额</Text>
                  <View style={styles.selectBox}>
                    <Text style={{fontSize:17,color:'#333',}}>5万</Text>
                  </View>
                </View>
                <Text>额度范围</Text>
              </View>
              <View style={[styles.flexPanel,{borderRightWidth:0}]}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize:17,color:'#333'}}>期数</Text>
                  <View style={styles.selectBox}>
                    <Text style={{fontSize:17,color:'#333',}}>12个月</Text>
                  </View>
                </View>
                <Text>期数范围</Text>
              </View>
            </View>

            <View style={styles.flexRow}>
              <View style={styles.flexPanel}>
                <Text style={styles.number}>{this.props.detail.money}</Text>
                <Text>每月还款(元)</Text>
              </View>
              <View style={[styles.flexPanel,{borderRightWidth:0}]}>
                <Text style={styles.number}>{this.props.detail.period}</Text>
                <Text>月利率</Text>
              </View>
            </View>

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
              <Text>20-40周岁拥有稳定工作的上班族</Text>
            </View>
          </View>

          <View style={[styles.applyBox,styles.bgColorWhite]}>
            <View style={styles.flexContainerRow}><Text style={styles.applyTitle}>所有材料</Text></View>
            <View style={{padding:15}}>
              <View><Text>1.身份证</Text></View>
              <View><Text>2.征信报告</Text></View>
              <View><Text>3.保单证明</Text></View>
            </View>
          </View>

          <Button onPress={this.props.onBack} style={styles.loanButton} text="去贷款"/>

        </ScrollView>
      </View>
    );
  }

}
