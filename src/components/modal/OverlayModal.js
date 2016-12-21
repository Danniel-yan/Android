import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

export default class ShareModal extends Component {
  static defaultProps = {
    animationType: 'fade',
    transparent: true,
    onCancel: () => {}
  };

  render() {
    let { onCancel, children, ...props } = this.props;

    return (
      <Modal {...props} onRequestClose={onCancel}>

        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onCancel}/>

        {children}

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.6)'
  }
});
