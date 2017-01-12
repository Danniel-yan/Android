import React , {Component} from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import CertifPanel from 'containers/creditLoan/CertifPanel';

function Item({icon, title, confirm, tips, navProps = {}}) {
 return (
   <ExternalPushLink {...navProps}>
     <View style = {[styles.item,styles.bdTop]}>
       <Image source={icon} style = {styles.icon}/>
       <View style = {{flex : 1}}>
         <View style = {styles.top}>
             <Text style = {styles.topL}>{title}</Text>
             <View style = {{flex : 1,flexDirection : 'row'}}>
                 <Text style = {styles.topR}>{confirm}</Text>
                 <Text style = {{color : '#999',width : 20}}>{'>'}</Text>
             </View>
         </View>
         <Text style = {{paddingLeft : 20,color: '#999',fontSize : 14}}>{tips}</Text>
       </View>
     </View>
   </ExternalPushLink>
 );
}

class TiEZiliao extends Component {

  render (){
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
        <Item
          icon={require("assets/credit-icons/yanghanzhenxinbaogao.png")}
          title="央行征信报告"
          confirm="未认证"
          tips="认证完毕，可增加30%贷款成功率"/>
        <Item
          icon={require("assets/credit-icons/xinyongkazhangdan.png")}
          title="信用卡账单"
          confirm="未认证"
          tips="最高可提升到10万额度"/>
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
          confirm="未认证"
          tips="认证完毕，可获1000-3000额度"/>
      </View>
     )
  }
 }

class ShouXin extends Component {
    render (){
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
        )
    }
}

export default class ModalDialog extends Component {
    constructor (props){
        super (props);
        this.state = {
            shouXinFlag : true
        }
    }
    render (){
        return (
            <Modal
               animationType={"slide"}
               transparent={true}
               visible = {this.props.flags.modalFlag}
               onRequestClose={() => {}}>
               <View style = {{flex : 1}}>
                    <View style = {{flex : 1,backgroundColor : 'rgba(0,0,0,.5)'}}></View>
                    <View style = {styles.container}>
                        <View style = {{backgroundColor : 'white',height:520}}>
                        {this.state.shouXinFlag?(<View style = {styles.title}><Text style= {styles.titleL} onPress = {this.toggleSceneTiE.bind(this)}>提额资料</Text><Text style={styles.titleR} onPress = {this.toggleSceneShouXin.bind(this)}>授信资料</Text></View>)
                            : (<View style = {styles.title}><Text style= {[styles.titleL,{color : '#999'}]} onPress = {this.toggleSceneTiE.bind(this)}>提额资料</Text><Text style={[styles.titleR,{color:'#333'}]} onPress = {this.toggleSceneShouXin.bind(this)}>授信资料</Text></View>)}
                        {this.state.shouXinFlag?<TiEZiliao /> : <ShouXin />}
                        </View>
                    </View>
                </View>
            </Modal>
        )
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
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgba(0,0,0,.5)',
        flex:1,
        position : 'absolute',
        bottom : 0,
        left : 0,
        right : 0,

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
