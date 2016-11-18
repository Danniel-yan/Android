// Props-> isFetching:bool, images:array[{uri: ImageUri}], *height:number
// Example-> <CarouselBanner isFetching={this.state.isFetching} images={this.state.images} />

import React, { PropTypes, Component } from 'react';
import {
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    View,
    Image
} from 'react-native';

import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

class CarouselBanner extends Component {
    constructor(props) {
        super(props);

        this._scrollView = null;
        this._timer = null;
        this._revert = false;
        this.state = {
            selectedImageIndex: 0
        }
    }

    generateInfos() {
        var props = this.props, bannerInfos = props ? props.bannerInfos : {};
        this.height = props.height || 130;
        this.state = Object.assign({}, this.state, {
            isFetching: this.props.isFetching
        });
        this.images = this.props.images || [];

        this._index = 0;
        this._max = this.images.length;
    }

    renderFetchingState() {
        if(!this.state.isFetching) return null;
        return (
            <View style={{width: screenWidth, height: this.height, backgroundColor: "gray"}}></View>
        );
    }

    renderScroll() {
        if(this.state.isFetching) return null;
        let images = this.images.map((value, idx) => {
            return (
                <TouchableWithoutFeedback key={idx}>
                    <View style={{width:screenWidth, height:130}}>
                        <Image source={value} style={{width:screenWidth, height:130}}></Image>
                    </View>
                </TouchableWithoutFeedback>
            );
        });

        let circles = this.images.map((value, idx)=>{
            return (<View key={idx} style={(idx==this.state.selectedImageIndex)?[styles.circle, styles.circleSelected]:styles.circle}></View>)
        });

        let imageLength = this.images.length;
        let circleLength = 6 * imageLength + 5 * 2 * imageLength;
        let center = (screenWidth-circleLength) / 2;
        return (
            <View>
                <ScrollView
                    horizontal={true}
                    ref={(scrollView)=>{ this._scrollView = scrollView; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onTouchStart={ ()=>{this._onTouchStart()} }
                    onTouchEnd={ ()=>{this._onTouchEnd()} }
                    onScroll={(ev)=>{ this._onScroll(ev); }}
                    scrollEventThrottle={0}
                    pagingEnabled={true}>
                    <Animated.View style={{flexDirection: 'row'}}>{images}</Animated.View>
                </ScrollView>
                <View style={{flexDirection:'row',position:'absolute',top:110,left:center}}>{circles}</View>
            </View>
        );
    }

    render() {
        this.generateInfos();
        this._runCarouselBanner();
        return (
            <View style={[styles.container, { height: this.height }]}>
                {this.renderFetchingState()}
                {this.renderScroll()}
            </View>
        );
    }

    _onTouchStart() {
        clearInterval(this._timer);
    }

    _onTouchEnd() {
        this._runCarouselBanner();
    }

    _onScroll(ev) {
        var contentOffsetX = ev.nativeEvent.contentOffset.x;
        this._index = Math.round(contentOffsetX/screenWidth);
        this._refreshFocusIndicator();
    }

    _stopCarouselBanner() {
        clearInterval(this._timer);
    }

    _refreshFocusIndicator() {
        this.setState({selectedImageIndex: this._index});
    }

    _runCarouselBanner() {
        this._stopCarouselBanner();
        if(this._max <= 1 || this.state.isFetching) return;
        this._timer = setInterval(function() {
            if(this._index == this._max-1) this.revert = true;
            if(this._index == 0) this.revert = false;
            this._index = this.revert ? this._index-1 : this._index+1;
            this._scrollView.scrollTo({x:this._index*screenWidth}, true);
        }.bind(this), 3000);
    }

    componentDidMount() {
        this._runCarouselBanner();
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }
}

const styles = {
    container: {
        flexDirection:'row',
    },
    circleContainer: {
        position:'absolute',
        left:0,
        bottom:10,
    },
    circle: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#FE271E',
        marginHorizontal:5,
    },
    circleSelected: {
        backgroundColor:'#ffffff'
    }
};

module.exports = CarouselBanner;
