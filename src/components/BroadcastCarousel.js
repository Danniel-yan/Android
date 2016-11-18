import React, { PropTypes, Component } from 'react';
import {
  View,TouchableWithoutFeedback,Text
} from 'react-native';

import CarouselGenerator from './shared/Carousel';

import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

var configs = {
  horizontal: false,
  pagingEnabled: true,
  intervalTime: 2000,
  height: 16
};

class BroadcastCarousel extends Component {
    constructor(props) {
      super(props);
    }

    generateInfos() {
      var props = this.props, messageList = props ? props.msgList : [];

      this.msgItems = [];
      messageList.map((message, idx) => {
        this.msgItems.push(
          <TouchableWithoutFeedback key={idx}>
            <View style={{width:screenWidth-16, height:16}}>
              <Text style={{width:screenWidth, height:16}}>{message}</Text>
            </View>
          </TouchableWithoutFeedback>
          );
      });
    }

    render() {
      this.generateInfos();
      var Carousel = CarouselGenerator(configs)(this.msgItems);

      // return <Carousel height={130} />
      return (
        <View style={{height:22, paddingTop:3}}>
          <Carousel height={16} />
        </View>
      );
    }
}

module.exports = BroadcastCarousel;
