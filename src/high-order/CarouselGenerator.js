import React, { PropTypes, Component } from 'react';
import {
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    View,
    Image,
} from 'react-native';

import Dimensions from 'Dimensions';

CarouselGenerator = function(configs) {
    return function(items) {
        return class Carousel extends Component {
            constructor(props) {
                super(props);

                this._scrollView = null;
                this._timer = null;
                this._index = 0;

                this.state = {
                    currentIndex: 0
                }

                this.generateInfos();
            }

            generateInfos() {
                var props = this.props;
                this._height = props.height || configs.height || 22;

                this._itemHeight = props.itemHeight || configs.itemHeight || this._height;

                this._scrollEnabled = configs.scrollEnabled !== false;
                this._horizontal = configs.horizontal || false;
                this._pagingEnabled = configs.pagingEnabled || false;
                this._intervalTime = configs.intervalTime || 4000;

                this._pageCount = items ? Math.ceil(items.length / (this._height / this._itemHeight)) : 0;

                this._scrollStep = this._horizontal ? Dimensions.get('window').width : this._height;
            }

            renderScroller() {
                if(!this._pageCount > 0) return null;
                // let count = this._pageCount;
                // let circleLength = 6 * count + 5 * 2 * count;
                // let center = (screenWidth-circleLength) / 2;
                // let circles = items.map((value, idx)=>{
                //     return (<View key={idx} style={(idx==this.state.currentIndex)?[styles.circle, styles.circleSelected]:styles.circle}></View>)
                // });
                // let circlesWrap = <View style={{flexDirection:'row',position:'absolute',top:110,left:center}}>{circles}</View>
                return (
                    <View>
                        <ScrollView
                            scrollEnabled={this._scrollEnabled}
                            horizontal={this._horizontal}
                            ref={(scrollView)=>{ this._scrollView = scrollView; }}
                            showsHorizontalScrollIndicator={false}
                            keyboardShouldPersistTaps={true}
                            showsVerticalScrollIndicator={false}
                            onTouchStart={ ()=>{this._onTouchStart()} }
                            onTouchEnd={ ()=>{this._onTouchEnd()} }
                            onScroll={(ev)=>{ this._onScroll(ev); }}
                            scrollEventThrottle={0}
                            pagingEnabled={true}>
                            <Animated.View style={{flexDirection:this._horizontal?'row':'column'}}>{items}</Animated.View>
                        </ScrollView>
                    </View>
                );
            }

            render() {

                this._runCarouselBanner();
                return (
                    <View style={[styles.container, { height: this._height }]}>
                        {this.renderScroller()}
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
                var contentOffsetLength = this._horizontal ? ev.nativeEvent.contentOffset.x : ev.nativeEvent.contentOffset.y;
                this._index = Math.round(contentOffsetLength/this._scrollStep);
                this._refreshFocusIndicator();
            }

            _stopCarouselBanner() {
                clearInterval(this._timer);
            }

            _refreshFocusIndicator() {
                this.setState({currentIndex: this._index});
            }

            _runCarouselBanner() {
                this._stopCarouselBanner();
                if(this._pageCount <= 1 || this.state.isFetching) return;
                this._timer = setInterval(function() {
                    if(this._index == this._pageCount-1) this.revert = true;
                    if(this._index == 0) this.revert = false;
                    this._index = this.revert ? this._index-1 : this._index+1;
                    var scrollStep = this._horizontal ? {x:this._index*this._scrollStep} : {y:this._index*this._scrollStep}
                    this._scrollView.scrollTo(scrollStep, true);
                }.bind(this), this._intervalTime);
            }

            componentDidMount() {
                this._runCarouselBanner();
            }

            componentWillUnmount() {
                clearInterval(this._timer);
            }

        }
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

module.exports = CarouselGenerator;
