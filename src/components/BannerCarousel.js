

import React, { PropTypes, Component } from 'react';
import {
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    View,
    Image
} from 'react-native';

import CarouselGenerator from './shared/Carousel';

import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

var configs = {
    horizontal: true,
    pagingEnabled: true,
    _intervalTime: 4000,
    height: 130
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
                    <View style={{width:screenWidth, height:130}}>
                        <Image source={imgInfo} style={{width:screenWidth, height:130}}></Image>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
    }

    render() {
        this.generateInfos();
        var Carousel = CarouselGenerator(configs)(this.imageItems);

        // return <Carousel height={130} />
        return React.createElement(Carousel, { height: 130 });
    }
}

module.exports = BannerCarousel;
