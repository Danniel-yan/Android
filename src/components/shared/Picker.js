import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  PickerIOS,
  Image,
  Button
} from 'react-native';

import { colors } from 'styles/varibles';
import Text from './Text';
import * as defaultStyles from 'styles';

export default class PickerComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue,
      openModal: false
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={1}
        onPress={() => this.setState({openModal: true})}
        >
      
        <Text style={this.props.textStyle}>{this._label()}</Text>
        <Image source={require('assets/icons/arrow-down.png')}/>
      
        {this._renderModal()}
      </TouchableOpacity>
    );
  }

  _label() {
    if(!this.state.selectedValue) {
      return '';
    }

    return this.props.items.find(item => item.value == this.state.selectedValue).label;
  }

  _renderModal() {

    return (
      <Modal
        animationType="slide"
        visible={this.state.openModal}
        transparent={true}
        >
        <View style={styles.container}>
          <View style={styles.header}>
            <Button style={styles.btn} onPress={this._onChange.bind(this)} title="确定"/>
          </View>

          <PickerIOS
            style={styles.picker}
            selectedValue={this.state.selectedValue}
            onValueChange={selectedValue => this.setState({selectedValue})}>

            { this.props.items.map(item => {
              return (
                <PickerIOS.Item
                  key={`item${item.value}`}
                  value={item.value}
                  label={item.label}
                />
              );
            }) }
          </PickerIOS>
        </View>
      </Modal>
    );
  }

  _onChange() {
    this.props.onChange(this.state.selectedValue);
    this.setState({ openModal: false });
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },

  header: {
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  },

  picker: {
  },

  pickerItem: {
    fontSize: 16,
  },

  btn: {
    fontSize: 12
  }
});
