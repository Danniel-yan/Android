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

const {height, width} = Dimensions.get('window');

export default class ModalDialog extends Component {

  closeModal() {
    var closeFunc = this.props.flags ? this.props.flags.closeModal : null;
    closeFunc && closeFunc();
  }

    render (){
        return (
          <Modal
           animationType={"slide"}
           transparent={true}
           visible = {this.props.flags.modalFlag}
           onRequestClose={() => {}}>
           <View style = {{backgroundColor : 'rgba(0,0,0,.5)',width:width,height:height,flex:1}}>
            <TouchableOpacity style = {{flex : 1}} onPress={this.closeModal.bind(this)}></TouchableOpacity>
            <CertifPanel closeModal={this.props.flags ? this.props.flags.closeModal : null} />

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
