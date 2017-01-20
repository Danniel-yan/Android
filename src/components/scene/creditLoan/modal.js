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
import { colors } from 'styles';



export default class ModalDialog extends Component {
    constructor (props){
        super(props);
    }

    closeModal() {
      var close = this.props && this.props.closeModal;
      close && close();
    }

    render (){
        return (
            <Modal
               animationType={"slide"}
               transparent={true}
               visible = {this.props.flags.modalFlag}
               onRequestClose={() => {}}>
               <View style = {{flex : 1}}>
                    <TouchableOpacity style={{flex : 1,backgroundColor : 'rgba(0,0,0,.5)'}} onPress={() => this.closeModal()}></TouchableOpacity>
                    <View style = {styles.container}>
                        <CertifPanel closeModal={() => this.closeModal()}/>
                    </View>
                </View>
            </Modal>
        )
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

    }
})
