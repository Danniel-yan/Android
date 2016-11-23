import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Image, View, Text, StyleSheet, Platform , ScrollView} from 'react-native';

import NavigationTest from 'components/NavigationTest';
import Banner from 'containers/scene/home/Banner';
import Broadcast from 'containers/scene/home/Broadcast';
import LoanNavPanel from 'components/LoanNavPanel';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import LoanList from 'containers/scene/home/LoanListContainer';
import CardList from 'containers/scene/home/CardListContainer';

import iconHuanyihuan from 'assets/index-icons/icon_huanyihuan.png';
import iconNext from 'assets/index-icons/icon_next.png';

import { colors } from 'styles/varibles'
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class HomeScene extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <StatusBar barStyle="light-content"/>
        {this._renderHeader()}
        <ScrollView>
          <Banner />
          <LoanNavPanel pressNumberBtn={this._majorNavTo.bind(this, "FastLoanScene")} pressIconBtn={this._majorNavTo.bind(this, "FastLoanScene")} />
          <Broadcast />
          <RecommendListPanel/>
          {this._renderLoan()}
          {this._renderCard()}
        </ScrollView>
      </View>
    );
  }

  _majorNavTo(key) {
    this.props.majorPush && this.props.majorPush({key: key});
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.left}><Image source={require('assets/icons/pin2.png')}/><Text style={styles.locTxt}>上海</Text></View>
        <View onPress={this._memoryPress.bind(this)} style={styles.center}><Text style={styles.titleTxt}>钞市</Text></View>
        <View style={styles.right}><Image source={require('assets/icons/message.png')}/></View>
      </View>
    )
  }

  _memoryPress() {
    clearTimeout(this.memoryTimer);

    if(this.memory == undefined) {
      this.memory = 0;
    }

    ++this.memory;

    this.memoryTimer = setTimeout(() => {
      this.memory = 0;
    }, 500);

    if(this.memory === 8) {
      this.props.secretGarden();
    }
  }

  _renderRecommend(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>热门推荐</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.titleRight}>
              换一批
              <Image style={styles.titleRightImg} source={iconHuanyihuan}/>
            </Text>
          </TouchableOpacity>
        </View>
        <RecommendList/>
      </View>
    )
  }

  _renderLoan(){
    return(
      <View style={{marginTop:5}}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>大额贷款</Text>
          <Text style={styles.titleRight}>
            更多产品
            <Image style={styles.titleRightImg} source={iconNext} />
          </Text>
        </View>
        <Image source={{uri:'https://facebook.github.io/react/img/logo_og.png'}} style={{width:400, height:90}}/>
        <LoanList/>
      </View>
    )
  }

  _renderCard(){
    return(
      <View style={{marginTop:5}}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>办卡精选</Text>
          <Text style={styles.titleRight}>
            更多产品
            <Image style={styles.titleRightImg} source={iconNext} />
          </Text>
        </View>
        <CardList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 57,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: colors.primary,
    alignItems: 'center'
  },

  locTxt: {
    fontSize: 15,
    marginLeft: 3,
    color: '#fff'
  },

  titleTxt: {
    fontSize: 18,
    color: '#fff'
  },

  center: {
    width: 100,
    alignItems: 'center'
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10
  },

  right: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end'
  },

  title:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  titleLeft:{
    fontSize:14,
    color:colors.fontColorPrimary,
    flex:1
  },
  titleRight:{
    fontSize:14
  },
  titleRightImg:{
    width:15,
    height:15,
    marginLeft:5,
  }

});
