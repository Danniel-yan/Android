import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Image, View, Text, StyleSheet, Platform , ScrollView} from 'react-native';

import NavigationTest from 'components/NavigationTest';
import Banner from 'containers/scene/home/Banner';
import Broadcast from 'containers/scene/home/Broadcast';
import LoanNavPanel from 'components/LoanNavPanel';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import LoanList from 'containers/scene/home/LoanListContainer';
import CardList from 'containers/scene/home/CardListContainer';
import LoanBanner from 'containers/scene/home/LoanBanner';
import GeoCity from 'components/GeoCity';

import iconHuanyihuan from 'assets/index-icons/icon_huanyihuan.png';
import iconNext from 'assets/index-icons/icon_next.png';

import { colors, headerHeight, statusBarHeight } from 'styles/varibles'

import panelStyles from './home/panelStyles';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class HomeScene extends Component {
  componentDidMount() {
    this.props.fetchingIndexConfig && this.props.fetchingIndexConfig();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <StatusBar backgroundColor="#fe271e" barStyle="light-content"/>
        {this._renderHeader()}
        <ScrollView>
          <Banner />
          <LoanNavPanel pressNumberBtn={this._pressNumberBtn.bind(this)} pressIconBtn={this._pressIcon.bind(this)} />
          <Broadcast />
          <RecommendListPanel/>
          {this._renderLoan()}
          {this._renderCard()}
        </ScrollView>
      </View>
    );
  }

  _pressIcon(iconKey) {
    var navKey = iconKey == 0 ? "RecLoanScene" : (iconKey == 2 ? "LoanScene" : "LoanScene");
    this._externalNavTo(navKey);
  }

  _pressNumberBtn(amount) {
    this.props.setAmount && this.props.setAmount(amount);
    this._externalNavTo("LoanScene");
  }

  _externalNavTo(navKey) {
    this.props.externalPush && this.props.externalPush({key: navKey});
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <GeoCity style={styles.left}/>
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

  _renderLoan(){
    return(
      <View style={{marginTop:5}}>
        <View style={[panelStyles.panel,panelStyles.header]}>
          <Text style={panelStyles.title}>大额贷款</Text>
        </View>
        <LoanBanner/>
        <LoanList/>
      </View>
    )
  }

  _renderCard(){
    return(
      <View style={{marginTop:5}}>
        <View style={[panelStyles.panel,panelStyles.header]}>
          <Text style={panelStyles.title}>办卡精选</Text>

          <TouchableOpacity style={panelStyles.addon}>
            <Text style={panelStyles.addonTxt}>更多产品</Text>
            <Image style={panelStyles.addonImg} source={iconNext}/>
          </TouchableOpacity>
        </View>
        <CardList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: headerHeight,
    paddingTop: statusBarHeight,
    backgroundColor: colors.primary,
    alignItems: 'center'
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
    fontSize:14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleRightImg:{
    width:15,
    height:15,
    marginLeft:5,
  }

});
