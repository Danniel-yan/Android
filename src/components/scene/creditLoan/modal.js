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

export default class ModalDialog extends Component {
    render (){
        return (
          <Modal
           animationType={"slide"}
           transparent={true}
           visible = {this.props.flags.modalFlag}
           onRequestClose={() => {}}>
           <View style = {{backgroundColor : 'rgba(0,0,0,.5)',width:width,height:height,flex:1}}>
            <View style = {{flex : 1}}></View>
            <View style = {{backgroundColor : 'white',height:467}}>

                    <View style = {styles.title}><Text style= {styles.titleL}>提额资料</Text><Text style={styles.titleR}>提额资料</Text></View>
                    <View>
                    {
                      this._renderItem(require("assets/credit-icons/xinyongkazhangdan.png"), "信用卡账单", '未认证','最高提升到10万额度',{})
                    }
                    {
                      this._renderItem(require("assets/credit-icons/shenfenrenzheng.png"), "身份认证", '未认证','认证完毕，可获500-1000额度',{})
                    }
                    {
                      this._renderItem(require("assets/credit-icons/yanghanzhenxinbaogao.png"), "央行征信报告", '未认证','认证完毕，可增加30%贷款成功率',{})
                    }
                    {
                      this._renderItem(require("assets/credit-icons/tongxunlushouquan.png"), "通讯录授权", '未授权','授权完毕，可获500-1000额度',{})
                    }
                    {
                      this._renderItem(require("assets/credit-icons/yunyinshangrenzheng.png"), "运营商认证", '未认证' ,'认证完毕，可获1000-3000',{})
                    }
                </View>

            </View>

           </View>
          </Modal>
        )
    }



    _renderItem(icon, title, confirm,tips,navProps) {
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
}


const styles = StyleSheet.create({
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
        paddingVertical: 15,
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