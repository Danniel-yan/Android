import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet ,Modal,Dimensions} from 'react-native';
import Button from 'components/shared/ButtonBase';
import ModalDialog from './modal'

const {height, width} = Dimensions.get('window');

export default class CreditLimitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openModal : false
    }
  }

  _openCreditPanel() {
    this.setState({openModal : true})
  }
  _closeCreditPanel (){
    this.setState({openModal : false})
  }



  render() {
    const flags = {
        modalFlag : this.state.openModal,
        closeModal : this._closeCreditPanel.bind(this),
    }
    return (
      <View style={CLPStyles.container}>
        <View><Text style={CLPStyles.headerTxt}>授信额度-最高可贷</Text></View>
        <View><Text style={CLPStyles.headerTxt}>(元)</Text></View>
        <View><Text style={CLPStyles.valueTxt}>100,000</Text></View>
        <View>
          <Button
            style={CLPStyles.btn}
            tracking={{}}
            onPress={this._openCreditPanel.bind(this)}
          ><Text style={CLPStyles.btnTxt}>立即授信</Text></Button>
        </View>
        <ModalDialog flags={flags} closeModal={() => this._closeCreditPanel()}/>
      </View>
    );
  }
}

const txtCenter = {
  textAlign: "center"
};

const CLPStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal:  20
  },
  headerTxt: {
    textAlign: "center", fontSize: 16
  },
  valueTxt: {
    textAlign: "center", fontSize: 65,
    color: "rgba(255,196,70,100)",
    paddingBottom: 10
  },
  btn: {
    borderRadius: 20, height: 30, padding: 5,
    backgroundColor: "rgba(255,196,70,100)"
  },
  btnTxt: {
    fontSize: 20, color: "white"
  }
});
