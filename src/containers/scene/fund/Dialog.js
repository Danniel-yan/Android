import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,Text,Image
} from 'react-native';

import { get } from 'utils/fetch';
import { border, colors } from 'styles';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config:[]
    }
  }

  componentDidMount() {

    let { location } = this.props;

    get('/bill/gjj-login-elements').then(response => {

      response.data
        .filter(config => config.area_name == location )
        .forEach((config) => {
          this.setState({config: config.login_config})
        })
    })


  }
  render(){
    return(
      <Modal
        visible={this.props.visible}
        onShow={() => this.setState({ visible: true})}
        transparent={true}
        >
        <View style={styles.dialogBg}>
          <View style={styles.dialogBody}>
            {this.state.config.map( (config, idx) =>
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
    ...border('bottom'),
  }
})