import React , {Component} from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';


const {height, width} = Dimensions.get('window');


function _renderItem(icon, title, confirm,tips,navProps) {
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
                 {
                   _renderItem(require("assets/credit-icons/shenfenrenzheng.png"), "身份证", '未认证','认证完毕，可获500-1000额度',{})
                 }
                 {
                   _renderItem(require("assets/credit-icons/tongxunlushouquan.png"), "通讯录授权", '未授权','认证完毕，可获500-1000额度',{})
                 }
                 {
                   _renderItem(require("assets/credit-icons/yanghanzhenxinbaogao.png"), "央行征信报告", '未认证','认证完毕，可增加30%贷款成功率',{})
                 }
                  {
                   _renderItem(require("assets/credit-icons/xinyongkazhangdan.png"), "信用卡账单", '未认证','最高可提升到10万额度',{})
                 }
                 {
                   _renderItem(require("assets/credit-icons/gongjijinbaogao.png"), "公积金报告", '未认证','最高可提高到10万额度',{})
                 }
                 {
                   _renderItem(require("assets/credit-icons/shebaobaogao.png"), "社保报告", '未认证' ,'认证完毕，可获500-1000',{})
                 }
                 {
                   _renderItem(require("assets/credit-icons/yunyinshangrenzheng.png"), "运营商认证", '未认证' ,'认证完毕，可获1000-3000',{})
                 }
            </View>
        )
    }
}


class ShouXin extends Component {
    render (){
        return (
            <View>

                <View>
                   {
                     _renderItem(require("assets/credit-icons/gongjijinbaogao.png"), "公积金报告", '未认证','授权完毕，可获500-1000额度',{})
                   }
                   {
                     _renderItem(require("assets/credit-icons/shebaobaogao.png"), "社保报告", '未认证' ,'认证完毕，可获1000-3000额度',{})
                   }
               </View>
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
                        <View style = {{backgroundColor : 'white',height:525}}>
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