import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  PickerIOS,
  Image,
  Platform,
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
      selectedValue: props.value,
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

        <Modal
          animationType="slide"
          visible={this.state.openModal}
          transparent={true}
          onRequestClose={() => this.setState({openModal: false})}
          >

          <TouchableOpacity style={defaultStyles.container} activeOpacity={1} onPress={this._onHide.bind(this)}>
          </TouchableOpacity>
          {Platform.OS == 'ios' ? this._renderIOSPicker() : this._renderAndroidPicker()}
        </Modal>
      </TouchableOpacity>
    );
  }

  _label() {
    if(!this.state.selectedValue) {
      return '';
    }

    var selectedItem = this.props.items.find(item => item.value == this.state.selectedValue);

    return selectedItem ? selectedItem.label : "";
  }

  _renderAndroidPicker() {
    const style = this.props.items.length > 4 ? { height: 168} : undefined;

    return (
      <View style={[styles.container, style]}>
        <ScrollView>
          { this.props.items.map(item => {
            return (
              <TouchableNativeFeedback
                key={`key${item.value}`}
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={this._onSelectedItem.bind(this, item.value)}>
                <View style={[styles.androidItem, defaultStyles.centering]}>
                  <Text>{item.label}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          }) }
        </ScrollView>
      </View>
    );
  }

  _onSelectedItem(value) {
    this.props.onChange(value);

    this.setState({
      openModal: false,
      selectedValue: value
    });
  }

  _onHide() {
    this.setState({
      openModal: false,
      selectedValue: this.props.selectedValue
    });
  }

  _renderIOSPicker() {
    return (
      <View style={[styles.container, styles.containerIOS]}>
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
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },

  containerIOS: {
    height: 200
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
  },

  androidItem: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  }
});
