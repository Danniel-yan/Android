import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  NativeModules,
  StyleSheet,
  ScrollView
} from 'react-native';

import { border, container, responsive, rowContainer, colors, fontSize } from 'styles';
import GroupTitle from 'components/GroupTitle';
import Button from 'containers/online/SubmitButton';
import { post, responseStatus } from 'utils/fetch';
import { InputGroup } from 'components/form';
import { ExternalPushLink } from 'containers/shared/Link';

const inputStatus = {
  checking: 1,
  success: 2,
  failure: 3
};

export default class FacemegModuleTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idFront: '',
      idBack: '',
      bankCard: '',
      live: ''
    }
  }

  render() {

    return (
      <ScrollView>
        <Button
          text="活体识别"
          onPress={this.onPress.bind(this, 'live')}/>
        <Images imgs={this.state.live}/>
      </ScrollView>
    );
  }

  onPress(name) {
    NativeModules.FaceMegModule.megLiveVerify().then(res => {
      this.setState({ [name]: res });
    });
  }
}

function Images(props) {
  if(!props.imgs) { return null; }

  let images = props.imgs.images.map((img, index) => {
    return (
      <Image key={"a"+index} source={{uri: 'data:image/png;base64,'+img}} style={styles.img}/>
    );
  })

  return (
    <View>
      {images}
    </View>
  )
}


const styles = StyleSheet.create({
  img: {
    width: responsive.width(408),
    height: responsive.height(286)
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  cardNum: {
    color: colors.primary
  },
  groupTitle: {
    backgroundColor: colors.bg
  },
  tipText: {
    marginTop: 10,
    marginBottom: 24,
    fontSize: fontSize.normal,
    color: colors.gray
  },
  input: {
    paddingHorizontal: 0,
    borderBottomWidth: 0,
    ...border('top')
  }
});

