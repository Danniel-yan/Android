import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

import { ExternalPushLink } from 'containers/shared/Link';
import { externalPush, majorTab } from 'actions/navigation';
import { colors } from 'styles';

const {height, width} = Dimensions.get('window');

function Item({icon, title, confirm, tips, navProps = {}, textStyle}) {
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

class CertifPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        shouXinFlag : true
    }
  }

  closeModal() {
    var closeFunc = this.props.closeModal ? this.props.closeModal : null;
    closeFunc && closeFunc();
  }

  render() {
    var bankResult = this.props.bankResult;
    return (

          <View style = {{backgroundColor : 'white',height:520}}>
          {
            <View style = {styles.title}>
              <Text style= {[styles.titleL,this.state.shouXinFlag ? {} : {color : '#999'}]} onPress = {this.toggleSceneTiE.bind(this)}>提额资料</Text>
              <Text style={[styles.titleR,this.state.shouXinFlag ? {} : {color:'#333'}]} onPress = {this.toggleSceneShouXin.bind(this)}>授信资料</Text>
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
    var externalPush = this.props.externalPush, route;
    var environment = "production";
    AsyncStorage.getItem('environment').then(ev=>{
      environment = ev;
      return AsyncStorage.getItem("userToken");
    }).then(token => {
        var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
        pbocUrl = environment=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
        // console.log(pbocUrl + "&token=" + token);
        return externalPush && externalPush({web: pbocUrl + "&token=" + token, title: "央行征信"});
        //return { web: pbocUrl + "&token=" + token, title: "央行征信" }
    })
    this.closeModal();
    // return false;
  }

  renderTiE() {
    var bankResult = this.props.bankResult, bankSuccess = bankResult && bankResult.existSuccessBill,
      yysResult = this.props.yysResult, yysSuccess = yysResult && yysResult.existSuccessBill;
    return (
      <View>
        <Item
          icon={require("assets/credit-icons/shenfenrenzheng.png")}
          title="身份证"
          confirm="未授权"
          tips="认证完毕，可获500-1000额度"/>
        <Item
          icon={require("assets/credit-icons/tongxunlushouquan.png")}
          title="通讯录授权"
          confirm="未授权"
          tips="认证完毕，可获500-1000额度"/>
        <TouchableOpacity onPress={() => {this._navToPBOC()}}>
          <View style = {[styles.item,styles.bdTop]}>
            <Image source={require("assets/credit-icons/yanghanzhenxinbaogao.png")} style = {styles.icon}/>
            <View style = {{flex : 1}}>
              <View style = {styles.top}>
                  <Text style = {styles.topL}>央行征信报告</Text>
                  <View style = {{flex : 1,flexDirection : 'row'}}>
                      <Text style = {[styles.topR]}>未认证</Text>
                      <Text style = {{color : '#999',width : 20}}>{'>'}</Text>
                  </View>
              </View>
              <Text style = {{paddingLeft : 20,color: '#999',fontSize : 14}}>认证完毕，可增加30%贷款成功率</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Item
          icon={require("assets/credit-icons/xinyongkazhangdan.png")}
          title="信用卡账单"
          confirm={bankSuccess ? "已认证" : "未认证"}
          tips="最高可提升到10万额度"
          textStyle={bankSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{title:"信用卡认证", toKey:"OnlineCreditCards", prePress: () => { this.closeModal(); }}}/>
        <Item
          icon={require("assets/credit-icons/gongjijinbaogao.png")}
          title="公积金报告"
          confirm="未认证"
          tips="最高可提高到10万额度"/>
        <Item
          icon={require("assets/credit-icons/shebaobaogao.png")}
          title="社保报告"
          confirm="未认证"
          tips="认证完毕，可获500-1000额度"/>
        <Item
          icon={require("assets/credit-icons/yunyinshangrenzheng.png")}
          title="运营商认证"
          confirm={yysSuccess ? "已认证" : "未认证"}
          tips="认证完毕，可获1000-3000额度"
          textStyle={yysSuccess ? {color: colors.success} : {color: colors.error}}
          navProps={{title:"运营商认证", toKey:"OnlineYysForm", prePress: () => { this.closeModal(); }}}/>
      </View>
    );
  }

  renderShouXin() {
    return (
      <View>
        <Item
          icon={require("assets/credit-icons/gongjijinbaogao.png")}
          title="公积金报告"
          confirm="未认证"
          tips="最高可提高到10万额度"/>
        <Item
          icon={require("assets/credit-icons/shebaobaogao.png")}
          title="社保报告"
          confirm="未认证"
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

  return {
    isFetching: bank.isFetching || yys.isFetching,
    fetched: bank.fetched && yys.fetched,
    bankResult: bank,
    yysResult: yys
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPreloan: () => dispatch(actions.preloan()),
    fetching: () => {
      dispatch(actions.bankResult());
      dispatch(actions.yysResult());
    },
    externalPush: (route) => dispatch(externalPush(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, CertifPanel)
);
