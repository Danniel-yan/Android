

import React, { PropTypes, Component } from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  View,
  Image
} from 'react-native';

import CarouselGenerator from './high-order/CarouselGenerator';

import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

var configs = {
  horizontal: true,
  pagingEnabled: true,
  _intervalTime: 4000,
  height: 123
}

class BannerCarousel extends Component {
    constructor(props) {
      super(props);
    }

    generateInfos() {
      var props = this.props, imgs = props ? props.imgList : [];

      this.imageItems = [];
      imgs.map((imgInfo, idx) => {
        this.imageItems.push(
            <TouchableWithoutFeedback key={idx}>
                <View style={{width:screenWidth}}>
                    <Image source={imgInfo} style={{width:screenWidth, height:configs.height}}></Image>
                </View>
            </TouchableWithoutFeedback>
          );
      });
    }

    render() {
      this.generateInfos();
      var Carousel = CarouselGenerator(configs)(this.imageItems);

      // return <Carousel height={130} />
      return React.createElement(Carousel, { height:configs.height });
    }
}

module.exports = BannerCarousel;
