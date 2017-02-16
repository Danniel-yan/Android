import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import ProcessingButton from 'components/shared/ProcessingButton';
import { textVerticalCenter, centering, responsive, border, container, rowContainer, colors, fontSize } from 'styles';
import { post, responseStatus } from 'utils/fetch';

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

class CameraInput extends Component {

  state = {
    status: '',
    submitting: false,
    value: null,
    error: '1'
  };

  render() {
    // console.log(this.props);

    let status = this.state.status;

    let statusText = '';

    if(status == 'success') {
      statusText = '识别成功';
    } else if(status == 'failure') {
      statusText = this.state.error
    }

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
      res.value = (res.value && res.value.replace(/\s/g, '')) || true;
      this.setState({ value: res }, this._upload.bind(this));
    }).catch(err => {
      this.setState({ error: err})
    });
  }

  _upload() {
    this.setState({ submitting: true });

    let body = {
      img: this.state.value.images[0],
      ext: 'png',
      type: typeValue[this.props.type],
      loan_type: parseInt(this.props.loanType)
    }

    if(this.props.type == 'bankCard') {
      body.credit_card_no_auto = this.state.value.value || '';
    }

    console.log(body);
    post('/loanctcf/add-image', body)
    .then(this._uploandAvatar.bind(this))
    .then(response => {
      if(response.res == responseStatus.failure) { throw response.msg }

      this.setState({ status: 'success'})
      this.props.onChange(this.state.value.value || true);
    })
    .catch(err => {
      this.props.onChange(undefined);
      this.setState({ status: 'failure', error: err})
      console.log(err);
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
      type: typeValue.idAvatar,
      loan_type: parseInt(this.props.loanType)
    })
  }
}

class _FaceMegInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      status: "none",
      processing: false
    }
  }

  render() {
    var s = this.state, txt = "未认证", colorStyle = {};
    if(s.status == "success") { txt = "认证成功"; colorStyle = {color: colors.success}; }
    if(s.status == "failure") { txt = "认证失败"; colorStyle = {color: colors.error}; }
    // if(s.status == "failure") { txt = s.error; colorStyle = {color: colors.error}; }

    return (
      <TouchableOpacity onPress={() => this._faceMegStart()}>
        <View style={{flex: 1, paddingHorizontal:10, height: 80, flexDirection: "row", alignItems: "center", backgroundColor: "#fff"}}>
          <Image source={require('assets/online/face-meg.png')}></Image>
          <View style={{flex: 1, paddingHorizontal: 16}}>
            <Text style={{fontSize: fontSize.large}}>人脸识别</Text>
            <Text>进行您本人的人脸识别</Text>
          </View>
          {
            s.processing ? (
              <ActivityIndicator
                animating={true}
                style={[centering, {marginRight: 4, height: 14}]}
                color={"#333"}
                size="small"/>
            ) : (<Text style={[{marginRight: 4}, colorStyle]}>{txt}</Text>)
          }
          <Text>></Text>
        </View>
      </TouchableOpacity>
    );
  }

  _faceMegStart() {
    NativeModules.FaceMegModule.megLiveVerify().then(res => {
      console.log(res);
      this.setState({ processing: true }, this._upload.bind(this, res));
    }).catch(error => this.setState({ error: error }));
  }

  _upload(faceImages) {
    let images = faceImages.images;
    let body = {
      img: images.join(","),
      ext: 'png',
      type: 5, // 活体检查
      loan_type: parseInt(this.props.loanType),
      // score: faceImages.score
    };

    console.log(body);

    // setTimeout(() => {
    //   this.setState({ status: 'success', processing: false })
    //   this.props.onChange && this.props.onChange("success");
    // }, 2000);

    post('/loanctcf/add-image', body).then(response => {
      if(response.res == responseStatus.failure) { throw response.msg }
      this.setState({ status: 'success' })
      this.props.onChange && this.props.onChange("success");
    })
    .catch(err => {
      this.setState({ status: 'failure', error: JSON.stringify(err) })
      this.props.onChange && this.props.onChange("failure");
      console.log("*********FaceMeg Err*********");
      console.log(err);
    })
    .finally(() => {
      this.setState({ processing: false })
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

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { loanType: state.online.loanType.type };
}

export const FaceMegInput = connect(mapStateToProps, null)(_FaceMegInput);
export default connect(mapStateToProps, null)(CameraInput);
