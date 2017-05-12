import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet ,Modal,Dimensions} from 'react-native';
import Button from 'components/shared/ButtonBase';
import ModalDialog from 'components/scene/creditLoan/modal'

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import onlineActions from 'actions/online';
import TrackingPoint  from 'components/shared/TrackingPoint';
import tracker from 'utils/tracker.js';
import { externalPop, externalPush} from 'actions/navigation';

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
    const logined = this.props.loginUser.info;
    if(logined){
      this.setState({openModal : true});
      tracker.trackAction({key: 'credit_loan', topic: 'verification', entity: '', event: 'pop'});
    } else {
      this.props.externalPush({key:'Login',title:'登录'})
    }
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
        <TrackingPoint style = {{flexDirection : 'row', justifyContent : 'center'}}
          tracking={{ key: 'credit_loan', topic: 'LOC_percentage', entity: '', event: 'clk'}}>
          <Text style={CLPStyles.valueTxt}>{this.props.creditScore || 0}</Text><Text style={[CLPStyles.valueTxt,{fontSize:40,marginTop : 25}]}>%</Text>
        </TrackingPoint>
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
    creditScore: state.online.userCreditDetail.score,
    loginUser: state.loginUser,

  }
}
function mapDispatchToProps(dispatch){
  return {
      externalPush: route => dispatch(externalPush(route)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditLimitPanel)
