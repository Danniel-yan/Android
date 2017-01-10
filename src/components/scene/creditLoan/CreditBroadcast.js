import React, { PropTypes, Component } from 'react';
import {
  View, TouchableWithoutFeedback, Text, Image
} from 'react-native';

import CarouselGenerator from 'high-order/CarouselGenerator';

import { fontSize } from 'styles';

const configs = {
  horizontal: false,
  pagingEnabled: true,
  intervalTime: 4000,
  height: 32,
  itemHeight: 16,
  scrollEnabled: false
}

export default class CreditBroadcast extends Component {
  constructor(props) {
    super(props);
  }

  renderCarousel() {
    var props = this.props, messageList = props.msgList ? props.msgList.concat([]) : [],
      Carousel;

    this.msgItems = [];
    messageList.map((message, idx) => {
      this.msgItems.push(
        <TouchableWithoutFeedback key={idx}>
          <View style={[{flexDirection: "row", alignItems: "center", height:configs.itemHeight, padding:0}]}>
            <Text style={{fontSize: fontSize.small}}>{message}</Text>
          </View>
        </TouchableWithoutFeedback>
        );
    });

    Carousel = CarouselGenerator(configs)(this.msgItems);
    return (<Carousel height={configs.height} />);
  }

  render() {
    return (
      <View style={{flexDirection: "row", alignItems: "center", padding: 8}}>
        <Image style={{marginRight: 10, width: 31, height: 31}} source={require('assets/credit-icons/chaoshikuaibao.png')}></Image>
        <View style={{flex: 1, height: configs.height}}>
        {
          this.renderCarousel()
        }
        </View>
      </View>
    )
  }
}
