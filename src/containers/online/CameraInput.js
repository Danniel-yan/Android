import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  NativeModules,
  StyleSheet,
} from 'react-native';

import ProcessingButton from 'components/shared/ProcessingButton';
import { textVerticalCenter, centering, responsive, border, container, rowContainer, colors, fontSize } from 'styles';
import { post, responseStatus } from 'utils/fetch';

const statusTexts = {
  success: '识别成功',
  failure: '识别失败',
};

const typeToFn = {
  idFront: 'idCardVerifyFromFront',
  idBack: 'idCardVerifyFromBack',
  bankCard: 'bankCardVerify'
};

const typeValue = {
  idFront: 1,
  idAvatar: 4,
  idBack: 2,
  bankCard: 3
}

export default class CameraInput extends Component {

  state = {
    status: '',
    submitting: false,
    value: null
  };

  render() {
    let status = this.state.status;
    let statusText = status ? `${this.props.label}${statusTexts[status]}` : '';

    return (
      <View>
        <Text style={[styles.statusText, styles[status]]}>{this.state.submitting ? '正在解析' : statusText}</Text>
        <View style={styles.container}>

          <ProcessingButton onPress={this._onPress.bind(this)} style={[styles.touchWrap, centering]}>
          { this.state.value ?

            <Image style={styles.img} source={{uri:'data:image/png;base64,'+this.state.value.images[0]}}/>

            :

            <View style={[container, centering]}>
              <Image style={styles.touchIcon} source={require('assets/online/plus.png')}/>
              <Text style={styles.touchLabel}>{this.props.label}</Text>
            </View>
          }
          </ProcessingButton>

          <View style={[styles.example]}>
            <Text style={styles.exampleText}>示例</Text>
            <Image style={styles.exampleImage} source={this.props.example}/>
          </View>
        </View>
      </View>
    );
  }

  _onPress() {
    NativeModules.FaceMegModule[typeToFn[this.props.type]]().then(res => {
      this.setState({ value: res }, this._upload.bind(this));
    }).catch(console.log);
  }

  _upload() {
    this.setState({ submitting: true });

    post('/loanctcf/add-image', {
      img: this.state.value.images[0],
      ext: 'png',
      type: typeValue[this.props.type]
    })
    .then(this._uploandAvatar.bind(this))
    .then(response => {
      if(response.res == responseStatus.failure) { throw response.msg }

      this.setState({ status: 'success'})
      this.props.onChange(this.state.value);
    })
    .catch(err => {
      this.setState({ status: 'failure'})
    })
    .finally(() => {
      this.setState({ submitting: false });
    })
  }

  _uploandAvatar(response) {
    if(this.props.type != 'idFront') {
      return response;
    }

    if(response.res == responseStatus.failure) {
      throw response.msg;
    }

    return post('/loanctcf/add-image', {
      img: this.state.value.images[1],
      ext: 'png',
      type: typeValue.idAvatar
    })
  }
}


const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: 'row',
  },
  success: {
    color: colors.success
  },
  failure: {
    color: colors.error
  },
  example: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  exampleText: {
    width: responsive.width(230),
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 25,
    color: colors.grayLight
  },
  exampleImage: {
    width: responsive.width(230),
    height: responsive.height(142)
  },
  statusText: {
    ...textVerticalCenter(34),
    height: 34,
    fontSize: fontSize.normal,
  },
  touchWrap: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#979797',
    width: responsive.width(410),
    height: responsive.height(288)
  },
  img: {
    width: responsive.width(408),
    height: responsive.height(286)
  },
  touchIcon: {
    marginBottom: responsive.height(40),
    width: responsive.width(70),
    height: responsive.height(70)
  },
  touchLabel: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    color: colors.grayLight
  }
});
