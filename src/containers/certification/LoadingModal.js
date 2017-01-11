import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';


import Button from 'components/shared/ButtonBase';
import OverlayModal from 'components/modal/OverlayModal'
import Loading from 'components/shared/Loading';
import { rowContainer, border, colors, fontSize, container, centering } from 'styles';

export default class LoadingModal extends Component {
  render() {

    return (
      <OverlayModal onHide={() => {}} {...this.props} >
        <View style={[container, centering]}>
          <View style={[styles.container, centering]}>
            <Loading/>
            <Text style={styles.text}>正在等待...</Text>
          </View>
        </View>
      </OverlayModal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    height: 192,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  text: {
    marginTop: 50,
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});
