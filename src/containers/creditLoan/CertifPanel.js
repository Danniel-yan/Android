import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

import { ExternalPushLink } from 'containers/shared/Link';
import { externalPush, majorTab } from 'actions/navigation';
import pboc from 'actions/pboc';
import { colors, centering } from 'styles';

import TrackingPoint  from 'components/shared/TrackingPoint';
import tracker from 'utils/tracker.js';

const {height, width} = Dimensions.get('window');

function Item({icon, title, confirm, tips, navProps = {}, textStyle}) {
 return (
   <ExternalPushLink {...navProps}>
     <View style = {[styles.item,styles.bdTop]}>
       <Image source={icon} style = {styles.icon}/>
       <View style = {{flex : 1}}>
         <View style = {styles.top}>
             <Text style = {styles.topL}>{title}</Text>
             <View style = {{flex : 1,flexDirection : 'row', alignItems: "center", justifyContent: "flex-end"}}>
                 <Text style = {[styles.topR, textStyle]}>{confirm}</Text>
                 <Text style = {{color : '#999',width : 20}}>{'>'}</Text>
             </View>
         </View>
         <Text style = {{paddingLeft : 20,color: '#999',fontSize : 14}}>{tips}</Text>
       </View>
     </View>
   </ExternalPushLink>
 );
}

class CertifPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        shouXinFlag : true,
        fetching: true
    }
  }

  componentDidMount() {
    this.props.fetching && this.props.fetching();
    this.setState({fetching: false});
  }

  closeModal() {
    var closeFunc = this.props.closeModal ? this.props.closeModal : null;
    closeFunc && closeFunc();
  }

  render() {
    var bankResult = this.props.bankResult, yysResult = this.props.yysResult;
    return this.state.fetching || bankResult.isFetching || yysResult.isFetching ? <Loading /> : (

          <View style = {{backgroundColor : 'white'}}>
          {
            <View style = {styles.title}>
              <Text style= {[styles.titleL,this.state.shouXinFlag ? {} : {color : '#999'}]} onPress = {this.toggleSceneTiE.bind(this)}>信用提升资料</Text>
              { false ?  <Text style={[styles.titleR,this.state.shouXinFlag ? {} : {color:'#333'}]} onPress = {this.toggleSceneShouXin.bind(this)}>授信资料</Text> : null}
            </View>
          }
          {this.state.shouXinFlag ? this.renderTiE() : this.renderShouXin()}
          </View>
    );
  }

  toggleSceneShouXin() {
      this.setState ({
          shouXinFlag : false
      })
  }
  toggleSceneTiE(){
       this.setState ({
          shouXinFlag : true
      })
  }

  _navToPBOC() {
    this.props.pboc && this.props.pboc();
    this.closeModal();
    // return false;
  }

  statusTxt(status) {
    var statusDir = { "success": "已认证", "failure": "认证失败", "none": "去认证" };
    return statusDir[status] || "去认证";
  }

  renderTiE() {
    var statusDir = { "success": "已认证", "failure": "认证失败", "none": "去认证" };
    var bankResult = this.props.bankResult, bankSuccess = bankResult && bankResult.status == "success",
      yysResult = this.props.yysResult, yysSuccess = yysResult && yysResult.status == "success";
      gjjResult = this.props.gjjResult, gjjSuccess = gjjResult && gjjResult.status == "success";

    var pIF = this.props.pbocIsFetching, pStatus = this.props.pbocStatus;

    return (
      <View>
        {false ? <Item
          icon={require("assets/credit-icons/shenfenrenzheng.png")}
          title="身份证"
          confirm="未授权"
          tips="认证完毕，可获500-1000额度"/> : null}
        {false ? <Item
          icon={require("assets/credit-icons/tongxunlushouquan.png")}
          title="通讯录授权"
          confirm="未授权"
          tips="认证完毕，可获500-1000额度"/> : null}
        <TrackingPoint
          tracking={{ key: 'credit_loan', topic: 'verification', entity: 'credit_report', event: 'clk', exten_info: this.props.pbocStatus}}
          onPress={() => {this._navToPBOC()}}
          title="央行征信">
          <View style = {[styles.item,styles.bdTop]}>
            <Image source={require("assets/credit-icons/yanghanzhenxinbaogao.png")} style = {styles.icon}/>
            <View style = {{flex : 1}}>
              <View style = {styles.top}>
                  <Text style = {styles.topL}>央行征信报告</Text>
                  <View style = {{flex : 1, flexDirection : 'row', alignItems: "center", justifyContent: "flex-end"}}>
                  {pIF ? (<ActivityIndicator
                    animating={true}
                    style={[centering, {marginRight: 6, height: 14}]}
                    color={"#333"}
                    size="small"
                  />):(<Text style = {[styles.topR, pStatus == "success" ? {color: colors.success} : {color: colors.error}]}>{statusDir[pStatus]}</Text>)}
                      <Text style = {{color : '#999',width : 20}}>{'>'}</Text>
                  </View>
              </View>
              <Text style = {{paddingLeft : 20,color: '#999',fontSize : 14}}>认证完毕，可增加30%贷款成功率</Text>
            </View>
          </View>
        </TrackingPoint>
        <Item
          icon={require("assets/credit-icons/xinyongkazhangdan.png")}
          title="信用卡账单"
          confirm={statusDir[bankResult.status]}
          tips="最高可提升到10万额度"
          textStyle={bankSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{
            title:"信用卡认证", toKey:"OnlineCreditCards", prePress: () => { this.closeModal(); return false; },
            tracking: {key: 'credit_loan', topic: 'verification', entity: 'bill', exten_info: bankResult.status }
          }}/>
        <Item
          icon={require("assets/credit-icons/gongjijinbaogao.png")}
          title="公积金报告"
          confirm={statusDir[gjjResult.status]}
          tips="最高可提高到10万额度"
          textStyle={gjjSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{
            toKey: "FundLogin", title:"公积金查询", prePress: () => { this.closeModal(); },
            tracking: {key: 'credit_loan', topic: 'verification', entity: 'PAF', exten_info: gjjResult.status }
          }}/>
        {false ? <Item
          icon={require("assets/credit-icons/shebaobaogao.png")}
          title="社保报告"
          confirm="去认证"
          tips="认证完毕，可获500-1000额度"/> : null}
        <Item
          icon={require("assets/credit-icons/yunyinshangrenzheng.png")}
          title="运营商认证"
          confirm={statusDir[yysResult.status]}
          tips="认证完毕，可获1000-3000额度"
          textStyle={yysSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{
            title:"运营商认证", toKey:"OnlineYysForm", prePress: () => { this.closeModal(); },
            tracking: {key: 'credit_loan', topic: 'verification', entity: 'telecom', exten_info: yysResult.status }
          }}/>
      </View>
    );
  }

  renderShouXin() {
    var statusDir = { "success": "已认证", "failure": "认证失败", "none": "去认证" };
    var gjjResult = this.props.gjjResult, gjjSuccess = gjjResult && gjjResult.status == "success";
    return (
      <View>
        <Item
          icon={require("assets/credit-icons/gongjijinbaogao.png")}
          title="公积金报告"
          confirm={statusDir[gjjResult.status]}
          tips="最高可提高到10万额度"
          textStyle={gjjSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{toKey: "FundLogin", title:"公积金查询", prePress: () => { this.closeModal(); }}}/>
        <Item
          icon={require("assets/credit-icons/shebaobaogao.png")}
          title="社保报告"
          confirm="去认证"
          tips="认证完毕，可获500-1000额度"/>
      </View>
    );
  }

  _renderItem(icon, title, confirm, tips,navProps, textStyle) {
      return (
        <ExternalPushLink {...navProps}>
          <View style = {[styles.item,styles.bdTop]}>
            <Image source={icon} style = {styles.icon}/>
            <View style = {{flex : 1}}>
              <View style = {styles.top}>
                  <Text style = {styles.topL}>{title}</Text>
                  <View style = {{flex : 1,flexDirection : 'row'}}>
                  <Text style = {[styles.topR, textStyle]}>{confirm}</Text>
                      <Text style = {{color : '#999',width : 20}}>{'>'}</Text>
                  </View>
              </View>
              <Text style = {{paddingLeft : 20,color: '#999',fontSize : 14}}>{tips}</Text>
            </View>
          </View>
        </ExternalPushLink>
      );
  }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgba(0,0,0,.5)',
        flex:1,
        position : 'absolute',
        bottom : 0,
        left : 0,
        right : 0
    },
    title : {
        flexDirection:'row',
        paddingVertical:10,
    },
    titleL : {
        color:'#333',
        fontSize:16,
        flex : 1,
        paddingLeft:20,
    },
    titleR :{
        textAlign:'right',
        paddingRight:40,
        fontSize:16,
        flex:1,
        color:'#999'
    },
    bdTop : { borderTopWidth: 1, borderTopColor: "#E6E6E6" },
    item : {

        flexDirection : 'row',
        alignItems : 'center',
        paddingVertical: 12,
        paddingLeft : 10,
        paddingRight : 5
    },
    icon : {
        width : 44,

    },
    content : {
        flex : 1,
        paddingRight : 10
    },
    top : {
        flexDirection : 'row',
        marginBottom : 10
    },
    topL : {
        flex : 1,
        paddingLeft : 20,
        color : '#333',
        fontSize : 16
    },
    topR : {
        width : 60,
        color :'#FE271E',
        fontSize : 14,
        flex : 1,
        textAlign: 'right',
        paddingRight:5
    }
})

function mapStateToProps(state) {
  let bank = state.online.bankResult;
  let yys = state.online.yysResult;
  let gjj = state.online.gjjResult;

  return {
    isFetching: bank.bankBillFetching || yys.yysBillFetching || gjj.isFetching,
    fetched: !(bank.bankBillFetching || yys.yysBillFetching || gjj.isFetching),
    bankResult: bank,
    yysResult: yys,
    gjjResult: gjj,
    userInfo: state.online.userInfo,
    pbocStatus: state.online.pboc.status,
    pbocIsFetching: state.online.pboc.fetcingStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPreloan: () => dispatch(actions.preloan()),
    fetching: () => {
      dispatch(actions.bankBillList());
      dispatch(actions.yysBillList());
      dispatch(actions.gjjResult());
      dispatch(actions.pboc.getStatus());
    },
    externalPush: (route) => dispatch(externalPush(route)),
    pboc: params => dispatch(pboc(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CertifPanel
);
