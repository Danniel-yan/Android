import React, { Component } from 'react';
import { NativeModules, View, ScrollView, Image, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback, Clipboard } from 'react-native';
import { connect } from 'react-redux';

import Text from 'components/shared/Text';
import NextIcon from 'components/shared/NextIcon';
import Button from 'components/shared/ButtonBase';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';
import zoneStyles from './zone/zoneStyles';
import * as defaultStyles from 'styles';
import { trackingScene } from 'high-order/trackingPointGenerator';
import TrackingPoint  from 'components/shared/TrackingPoint';
import { externalPush, majorTab } from 'actions/navigation';
import pboc from 'actions/pboc';
import onlineActions from 'actions/online';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import OverlayModal from 'components/modal/OverlayModal';

import tracker from 'utils/tracker.js';

class ZoneScene extends Component {

  tracking = 'my_account';

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
    this.reportFetched = false;
  }

  render() {
    let logined = this.props.loginUser.info;

    return (
      <View style={[defaultStyles.container, defaultStyles.bg]}>
        <SceneHeader title="我的"/>
        <ScrollView style={zoneStyles.container}>

          {this._loginInfo()}

          {/*
           <View style={zoneStyles.item}>
           <Image style={zoneStyles.icon} source={require('assets/zone/process.png')}/>
           <Text style={zoneStyles.txt}>办卡进度查询</Text>
           <NextIcon/>
           </View>

           <View style={zoneStyles.item}>
           <Image style={zoneStyles.icon} source={require('assets/zone/footprint.png')}/>
           <Text style={zoneStyles.txt}>我的贷款足迹</Text>
           <NextIcon/>
           </View>

           <ExternalPushLink title={logined ?  '消息' : '登录'} toKey={logined ? 'MessagesScene' : 'Login'}>
           <View style={zoneStyles.item}>
           <Image style={zoneStyles.icon} source={require('assets/zone/message.png')}/>
           <Text style={zoneStyles.txt}>我的消息</Text>
           <NextIcon/>
           </View>
           </ExternalPushLink>
           */}


           {this._reportInfo()}

           {
             this._renderNavItem(require('assets/zone/contact.png'), "联系我们", {
               tracking: {key: 'my_account', topic: 'btn_sec', entity: 'icon_contact'},
               toKey: "ContactScene", title:"联系我们"
             })
           }
           <TouchableOpacity onPress={() => this.clipWeiXing()}>
             <View style={zoneStyles.item}>
               <Image style={zoneStyles.icon} source={require('assets/zone/weixingonggonghao.png')}/>
               <Text style={{color: '#333', fontSize: 17}}>微信公共号</Text>
               <Text style={[zoneStyles.txt, {textAlign: "right", color: "#A4A4A4", fontSize: 12}]}>在微信搜索「钞市」</Text>
               <NextIcon/>
             </View>
           </TouchableOpacity>
           {
             this._renderNavItem(require('assets/zone/setting.png'), "设置", {
               tracking: {key: 'my_account', topic: 'btn_sec', entity: 'icon_set'},
               toKey: "SettingScene", title:"设置"
             })
           }

          <Button onPress={this._service.bind(this)}>
            <View style={zoneStyles.item}>
            <Image style={zoneStyles.icon} source={require('assets/zone/service.png')}/>
            <Text style={zoneStyles.txt}>用户反馈</Text>
            <NextIcon/>
            </View>
          </Button>
        </ScrollView>
        <OverlayModal
          visible={this.state.modalVisible}
          onHide={() => this.setState({modalVisible: false})}
          style={{alignItems: "center", justifyContent: "center"}}
          overlayStyle={{backgroundColor: 'rgba(0,0,0,.2)'}}>
          <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
          <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <View style={{paddingHorizontal: 30, paddingVertical: 25, backgroundColor: "#323334", borderRadius: 6}}>
              <View style={{}}><Text style={{textAlign: "center", fontSize: 14, color: "#EAEBEB"}}>已复制「钞市」到你的剪切板，</Text></View>
              <View style={{marginTop: 10}}><Text style={{textAlign: "center", fontSize: 14, color: "#EAEBEB"}}>请打开微信粘贴关注！</Text></View>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </OverlayModal>
      </View>
    );
  }

  _service() {
    NativeModules.FeedbackModule.openFeedback();
  }

  _loginInfo() {
    let loginUser = this.props.loginUser;

    if(loginUser.info) {
      return (
        <ExternalPushLink title="个人信息" toKey="UserInfo">
          <View style={[zoneStyles.item, zoneStyles.loginWrap]}>
            <Image style={zoneStyles.icon} source={require('assets/zone/user-blank.png')}/>
            <Text style={zoneStyles.txt}>{loginUser.info.username}</Text>
            <NextIcon/>
          </View>
        </ExternalPushLink>
      );
    }

    return (
      <View style={[zoneStyles.loginWrap, defaultStyles.centering]}>
        <ExternalPushLink
          tracking={{key:'my_account', entity: 'reg_login', topic: 'btn_sec'}}
          style={[zoneStyles.loginBtn, defaultStyles.centering]}
          textStyle={zoneStyles.loginBtnText}
          text="登录注册"
          title="登录"
          toKey="Login"/>
      </View>
    );
  }

  _reportInfo() {
    let loginUser = this.props.loginUser;

    return loginUser.info && !this.props.isFetching ? (
      <View>
        { this.props.bankBillList && this.props.bankBillList.length > 0 ?
          this._renderNavItem(require('assets/zone/wodezhangdan.png'), "我的账单", {
            toKey: "BillList", title: "我的账单", prePress: ()=>{this.props.setLoanType&&this.props.setLoanType()},
            tracking: { key: 'my_account', topic: 'btn_sec', entity: 'bill' }
          }) : null
        }
        {
          this.props.gjjBillList && this.props.gjjBillList.length > 0 ?
          this._renderNavItem(require('assets/zone/gongjijinbaogao.png'), "公积金报告", {
            toKey: "GjjReport", title:"公积金报告", prePress: ()=>{
              return this.props.gjjPreNavigate();
            },
            tracking: { key: 'my_account', topic: 'btn_sec', entity: 'PAF_report' }
          }) : null
        }
        {false ? this._renderNavItem(require('assets/zone/shebaobaogao.png'), "社保报告", {}) : null}
        <TrackingPoint
          tracking={{ key: 'my_account', topic: 'btn_sec', entity: 'credit_report'}}
          title="征信报告"
          onPress={this.props.pboc.bind(this)}>
          <View style={zoneStyles.item}>
            <Image style={[zoneStyles.icon]} source={require('assets/zone/zhengxinbaogao.png')}/>
            <Text style={zoneStyles.txt}>征信报告</Text>
            <NextIcon/>
          </View>
        </TrackingPoint>
        {false ? this._renderNavItem(require('assets/zone/chaoshixinyongfen.png'), "钞市信用分", {}) : null}
        {false ? this._renderNavItem(require('assets/zone/footprint.png'), "我的贷款足迹", {}) : null}
        {this._renderNavItem(require('assets/zone/process.png'), "办卡进度查询", {
          title:"办卡进度", toKey:"CardProgressList",
          tracking: { key: 'my_account', topic: 'btn_sec', entity: 'card_progress'}
        })}
      </View>
    ) : null;
  }

  _renderNavItem(icon, txt, navProps) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Image style={zoneStyles.icon} source={icon}/>
          <Text style={zoneStyles.txt}>{txt}</Text>
          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }

  clipWeiXing() {
    Clipboard.setString('钞市');

    tracker.trackAction({ key: 'my_account', topic: 'btn_sec', entity: "wechat", event: 'clk' });
    this.setState({ modalVisible: true });
  }

  componentWillReceiveProps(newProps) {
    var loginUserFetched = newProps.loginUser.fetched && newProps.loginUser.info;

    !this.reportFetched && loginUserFetched && this.props.fetching && this.props.fetching();
    this.reportFetched = true;
  }

  componentDidMount() {
    if(!this.props.loginUser.info) return;

    !this.reportFetched && this.props.fetching && this.props.fetching();
    this.reportFetched = true;
  }
}

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
    // isFetching: state.online.bankResult.bankBillFetching || state.online.gjjResult.isFetching,
    isFetching: state.online.bankResult.bankBillFetching,
    bankBillList: state.online.bankResult.billList,
    gjjBillList: state.online.gjjResult.billList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(onlineActions.setLoanType(9999));
      dispatch(onlineActions.bankBillList());
      dispatch(onlineActions.gjjResult());
    },
    pboc: params => dispatch(pboc(params)),
    externalPush: route => dispatch(externalPush(route)),
    majorTab: route => dispatch(majorTab(route)),
    setLoanType: () => dispatch(onlineActions.setLoanType(9999)),
    gjjPreNavigate: () => {
      dispatch(onlineActions.setLoanType(9999));
      return dispatch(onlineActions.gjjResult());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(ZoneScene))
