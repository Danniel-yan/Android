import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

const ShareModuel = NativeModules.ShareUtilModule;

import Button from 'components/shared/ButtonBase';
import Text from 'components/shared/Text';
import OverlayModal from './OverlayModal'
import { rowContainer, border, colors, fontSize, container, centering } from 'styles';

export default class ShareModal extends Component {
  render() {
    let config = {title: '分享title', content: '分享content', url: 'https://www.madailicai.com' };

    return (
      <OverlayModal onCancel={this.props.onCancel}>

        <View style={styles.panel}>
          <View style={centering}><Text style={styles.title}>分享</Text></View>

          <View style={[rowContainer, styles.content]}>
            <WeixinItem
              config={config}
              style={container}/>
            <PengyouquanItem
              config={config}
              style={container}/>
            <SinaItem
              config={config}
              style={container}/>
            <QzoneItem
              config={config}
              style={container}/>
          </View>

          <Button style={styles.cancel} textStyle={styles.canceltext} text="取消"/>
        </View>

      </OverlayModal>
    );
  }
}

class WeixinItem extends Component {
  render() {
    return (
      <ShareItem
        onPress={this.share.bind(this)}
        text="微信"
        image={require('assets/share-icons/weixin.png')}/>
    );
  }

  share() {
    ShareModuel.weixin(this.props.config);
  }
}

class PengyouquanItem extends Component {
  render() {
    return (
      <ShareItem
        onPress={this.share.bind(this)}
        text="微信朋友圈"
        image={require('assets/share-icons/pengyouquan.png')}/>
    );
  }

  share() {
    ShareModuel.circle(this.props.config);
  }
}

class SinaItem extends Component {
  render() {
    return (
      <ShareItem
        onPress={this.share.bind(this)}
        text="新浪微博"
        image={require('assets/share-icons/sina.png')}/>
    );
  }

  share() {
    ShareModuel.sina(this.props.config);
  }
}

class QzoneItem extends Component {
  render() {
    return (
      <ShareItem
        onPress={this.share.bind(this)}
        text="QQ空间"
        image={require('assets/share-icons/qzone.png')}/>
    );
  }

  share() {
    ShareModuel.qzone(this.props.config);
  }
}

class ShareItem extends Component {
  render() {

    let { style, image, text, ...props } = this.props;

    return (
      <Button {...props} style={[container, styles.shareItem, centering, style]}>
        <Image source={image}/>
        <Text style={styles.shareItemText}>{text}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize.large,
    color: colors.fontColorSecondary
  },
  content: {
    paddingVertical: 20
  },
  cancel: {
    ...border('top'),
    height: 43,
    backgroundColor: '#fff',
  },
  canceltext: {
    color: colors.fontColorPrimary,
    fontSize: fontSize.normal
  },
  shareItem: {
  },
  shareItemText: {
    marginTop: 10,
    color: '#333',
    fontSize: fontSize.xsmall
  }
});
