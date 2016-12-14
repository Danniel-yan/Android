

import React, { PropTypes, Component } from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  View,
  Image
} from 'react-native';

import CarouselGenerator from 'high-order/CarouselGenerator';
import { MajorTabLink, ExternalPushLink } from 'containers/shared/Link';
import Loading from 'components/shared/Loading'

import { window } from 'styles';

var screenWidth = window.width;

var configs = {
  horizontal: true,
  pagingEnabled: true,
  _intervalTime: 4000,
  height: screenWidth * (212/750)
}

class BannerCarousel extends Component {
    constructor(props) {
      super(props);
    }

    generateInfos() {
      var props = this.props, imgs = props.imgList ? props.imgList : [];

      this.imageItems = [];
      imgs.map((imgInfo, idx) => {
        this.imageItems.push(
            <ExternalPushLink
              web={imgInfo.url}
              tracking={{key: 'homepage', topic: 'carousel', entity: idx, URL: imgInfo.url}}
              key={idx}>

              <View style={{width:screenWidth}}>
                <Image source={{ uri: imgInfo.pic }} style={{width:screenWidth, height:configs.height}}></Image>
              </View>
            </ExternalPushLink>
          );
      });
    }

    render() {
      this.generateInfos();
      var Carousel =  CarouselGenerator(configs)(this.imageItems);

      return !this.props.iosFetched ? (<Loading />) : (this.props.isIOSVerifying ? (
        <View style={{height:configs.height}}>
          <Image source={ require('assets/ChaoshiBanner.jpeg') } style={{width:screenWidth, height:configs.height}}></Image>
        </View>
      ) : React.createElement(Carousel, { height:configs.height }));
    }
}

module.exports = BannerCarousel;
