import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet ,Modal,Dimensions} from 'react-native';
import Button from 'components/shared/ButtonBase';
import ModalDialog from 'components/scene/creditLoan/modal'

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import onlineActions from 'actions/online';

import { connect } from 'react-redux';

const {height, width} = Dimensions.get('window');

class CreditLimitPanel extends Component {
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

    // console.log("CREDITLIMITPANEL")
    const flags = {
        modalFlag : this.state.openModal,
        closeModal : this._closeCreditPanel.bind(this),
    }
    return (
      <View style={CLPStyles.container}>
        <View><Text style={CLPStyles.headerTxt}>信用完整度</Text></View>
        <View style = {{flexDirection : 'row', justifyContent : 'center'}}>
          <Text style={CLPStyles.valueTxt}>{this.props.creditScore}</Text><Text style={[CLPStyles.valueTxt,{fontSize:40,marginTop : 25}]}>%</Text>
        </View>
        <View>
          <Button
            style={CLPStyles.btn}
            tracking={{}}
            onPress={this._openCreditPanel.bind(this)}
          ><Text style={CLPStyles.btnTxt}>立即提升</Text></Button>
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
    textAlign: "center", fontSize: 16,color : '#333'
  },
  valueTxt: {
    textAlign: "center", fontSize: 70,
    color: "#FFC445",
    paddingBottom: 10
  },
  btn: {
    borderRadius: 20, height: 40, padding: 5,
    backgroundColor: "#FFC445"
  },
  btnTxt: {
    fontSize: 20, color: "white"
  }
});

function mapStateToProps(state) {
  return {
    creditScore: state.online.userInfo.creditScore
  }
}

export default connect(mapStateToProps, null)(CreditLimitPanel)
