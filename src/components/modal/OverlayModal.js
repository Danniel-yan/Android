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
    onHide: () => {}
  };

  render() {
    let { onHide, onRequestClose, children, overlayStyle, ...props } = this.props;

    return (
      <Modal {...props} onRequestClose={onRequestClose || onHide}>

        <TouchableOpacity style={[styles.overlay, overlayStyle]} activeOpacity={1} onPress={onHide}/>

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
