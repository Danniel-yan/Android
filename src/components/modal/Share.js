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

    return (
      <OverlayModal {...this.props} >

        <View style={styles.panel}>
          <View style={centering}><Text style={styles.title}>分享</Text></View>

          <View style={[rowContainer, styles.content]}>
            <WeixinItem
              onBackApp={this.props.onHide} 
              config={config}
              style={container}/>
            <PengyouquanItem
              onBackApp={this.props.onHide} 
              config={config}
              style={container}/>
            <SinaItem
              onBackApp={this.props.onHide} 
              config={config}
              style={container}/>
            <QzoneItem
              onBackApp={this.props.onHide} 
              config={config}
              style={container}/>
          </View>

          <Button onPress={this.props.onHide} style={styles.cancel} textStyle={styles.canceltext} text="取消"/>
        </View>

      </OverlayModal>
    );
  }
}

class WeixinItem extends Component {
  render() {
    return (
      <ShareItem
        {...this.props}
        share={ShareModuel.weixin}
        text="微信"
        image={require('assets/share-icons/weixin.png')}/>
    );
  }
}

class PengyouquanItem extends Component {
  render() {
    return (
      <ShareItem
        {...this.props}
        share={ShareModuel.circle}
        text="微信朋友圈"
        image={require('assets/share-icons/pengyouquan.png')}/>
    );
  }
}

class SinaItem extends Component {
  render() {
    return (
      <ShareItem
        {...this.props}
        share={ShareModuel.sina}
        text="新浪微博"
        image={require('assets/share-icons/sina.png')}/>
    );
  }
}

class QzoneItem extends Component {
  render() {
    return (
      <ShareItem
        {...this.props}
        share={ShareModuel.qzone}
        text="QQ空间"
        image={require('assets/share-icons/qzone.png')}/>
    );
  }
}

class ShareItem extends Component {
  static propTypes = {
    share: React.PropTypes.func.isRequired,
    config: React.PropTypes.object.isRequired,
  };

  render() {

    let { style, image, text } = this.props;

    return (
      <Button
        onPress={this._share.bind(this)} style={[container, styles.shareItem, centering, style]}>
        <Image source={image}/>
        <Text style={styles.shareItemText}>{text}</Text>
      </Button>
    );
  }

  _share() {
    let { config, share, onError, onCancel, onSuccess, onBackApp } = this.props;

    config.icon_url = config.icon || 'http://sys-php.oss-cn-shanghai.aliyuncs.com/chaoshi/res/logos/chaoshi-logo.png';

    share(config).then(res => {
      onBackApp && onBackApp(res)

      res.success && onSuccess && onSuccess(res);
      res.cancel && onCancel && onCancel(res);
      res.failure && onError && onError(res);
    });
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
    fontSize: fontSize.xlarge,
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
