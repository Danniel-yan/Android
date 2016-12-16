import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Image, View, Text, StyleSheet, Platform, ScrollView, AsyncStorage } from 'react-native';

import Banner from 'containers/scene/home/Banner';
import Broadcast from 'containers/scene/home/Broadcast';
import LoanNavPanel from 'containers/scene/home/LoanNavPanel';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import LoanList from 'containers/scene/home/LoanListContainer';
import CategoryListContainer from 'containers/scene/home/CategoryListContainer';
import LoanBanner from 'containers/scene/home/LoanBanner';
import GeoCity from 'components/GeoCity';
import MessageIcon from 'components/shared/MessageIcon';

import iconHuanyihuan from 'assets/index-icons/icon_huanyihuan.png';
import iconNext from 'assets/index-icons/icon_next.png';

import { colors, headerHeight, statusBarHeight } from 'styles/varibles'
import { ExternalPushLink, MajorTabLink } from 'containers/shared/Link';
import SecretGardenModal from 'components/modal/SecretGarden';

import panelStyles from './home/panelStyles';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class HomeScene extends Component {

  tracking = 'homepage';

  constructor(props) {
    super(props);

    this.state = {
      showSecret: false
    }
  }

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
          <LoanNavPanel />
          { this._renderBroadcast() }
          <RecommendListPanel itemTracking={{ key: 'homepage', topic: 'rec_loan_list'}}/>
          {this._renderLoan()}
          {this._renderCard()}
        </ScrollView>

        <SecretGardenModal onCancel={() => this.setState({showSecret: false})} visible={this.state.showSecret}/>
      </View>
    );
  }

  _renderBroadcast() {
    return !this.props.iosFetched || this.props.isIOSVerifying ? null : <Broadcast />;
  }

  _pressIcon(iconKey) {
    if(iconKey !== 2) return;

    this.navToPBOC()
  }

  _pressNumberBtn(amount) {
    amount && this.props.setAmount && this.props.setAmount(amount);
    // this._externalNavTo("LoanScene");
    this.props.majorTab && this.props.majorTab("LoanScene");
  }

  _externalNavTo(navKey) {
    this.props.externalPush && this.props.externalPush({key: navKey});
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <GeoCity style={styles.left}/>
        <View style={styles.center}><Text onPress={this._memoryPress.bind(this)} style={styles.titleTxt}>钞市</Text></View>
        <View style={styles.right}></View>
      </View>
    )
  }

  navToPBOC() {
    AsyncStorage.getItem('userToken').then(token => {
      var externalPush = this.props.externalPush, route;
      if(!token) {
        route = { key: "Login", componentProps: { customLoginSuccess: () => (this.navToPBOC()) } };
        externalPush && externalPush(route);
        return;
      }
      AsyncStorage.getItem('environment').then(ev => {
        var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
        pbocUrl = ev=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
        console.log(pbocUrl + "&token=" + token)
        externalPush && externalPush({web: pbocUrl + "&token=" + token});
      })
    })
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
      this.setState({ showSecret: true })
    }
  }

  _renderLoan(){
    return !this.props.iosFetched || this.props.isIOSVerifying ? null : (
      <View style={{marginTop:5}}>
        <View style={[panelStyles.panel,panelStyles.header]}>
          <Text style={panelStyles.title}>大额贷款</Text>
        </View>
        <LoanBanner/>
        <LoanList/>
      </View>
    );
  }

  _renderCard(){
    return !this.props.iosFetched || this.props.isIOSVerifying ? null : (
      <View style={{marginTop:5}}>
        <View style={[panelStyles.panel,panelStyles.header]}>
          <Text style={panelStyles.title}>办卡精选</Text>

          <MajorTabLink
            tracking={{key: 'homepage', topic: 'featured_card', entity: 'more', event: 'clk'}}
            toKey="CardScene" style={panelStyles.addon}>
            <Text style={panelStyles.addonTxt}>更多产品</Text>
            <Image style={panelStyles.addonImg} source={iconNext}/>
          </MajorTabLink>
        </View>
        <CategoryListContainer itemTracking={{key: 'homepage', topic: 'featured_card_list'}}/>
      </View>
    );
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
