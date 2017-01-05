import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import Button from 'components/shared/ButtonBase';
import ShareModal from 'components/modal/Share';
import { IOSComponentSwitcher } from 'high-order/ComponentSwitcher';

class ShareButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render() {
    if(this.props.isIOSVerifying) { return null }

    return (
      <Button style={styles.btn} onPress={() => this.setState({showModal: true})}>
        <Image source={require('assets/share-icons/share.png')}/>

        <ShareModal visible={this.state.showModal} config={this.props.config} onHide={() => this.setState({showModal: false})}/>
      </Button>
    );
  }
}

export default IOSComponentSwitcher(ShareButton, null);

const styles = StyleSheet.create({
  btn: {
    padding: 10
  }
});
