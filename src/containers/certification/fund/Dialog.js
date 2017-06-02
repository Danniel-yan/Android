import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,Text,Image
} from 'react-native';

import { get } from 'utils/fetch';
import { border, colors } from 'styles';

class LoanTypeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: this.props.loginConfig
    }
  }

  // componentDidMount() {
  //
  //   let { location } = this.props;
  //
  //   var elements = new Promise((resolve) => { resolve({data: this.props.elements})})
  //
  //   elements.then(response => {
  //     response.data
  //       .filter(config => config.area_name == location )
  //       .forEach((config) => {
  //         console.log(config)
  //         this.setState({config: config.login_config})
  //       })
  //   })
  //
  //   //this.props.loginConfig.forEach(config => this.setState({config, co}))
  // }
  _setModalVisible(visible) {
    this.setState({visible: visible});
  }
  render(){
    var configList = this.props.loginConfig;

    return(
      <Modal
        visible={this.props.visible}
        onShow={() => this.setState({ visible: true})}
        transparent={true}
          //关闭时调用
        onRequestClose={() => {this._setModalVisible(false)}}
        >
        <View style={styles.dialogBg}>
          <View style={styles.dialogBody}>
            {configList.map( (config, idx) =>
              <TouchableOpacity key={'key' + idx} style={styles.dialogList}>
                <Text onPress={() => this.props.onChange(config)} >{config.login_type_name}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  dialogBg:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.2)'
  },
  dialogBody:{
    width:200,
    backgroundColor:'#fff'
  },
  dialogList:{
    flexDirection: 'row',
    paddingHorizontal:20,
    justifyContent:'center',
    paddingVertical:10,
    ...border('bottom', 1),
  }
});

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return state.online.gjjLoginElements
}

export default connect(mapStateToProps, null)(LoanTypeDialog)
