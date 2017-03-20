import React, { PureComponent } from 'react';

import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';

import Text from './shared/Text';
import { post } from 'utils/fetch';
import LocationPicker from 'components/modal/LocationPicker';
import tracker from 'utils/tracker.js';
import Button from 'components/shared/ButtonBase';

const startOpacity = 0.3;
const endOpacity = 1;

export default class GeoCity extends PureComponent {
    constructor(props) {
        super(props);
        this.mounted = true
        this.state = {
            showPicker: false,
            bounceValue: new Animated.Value(startOpacity),
        };
    }

    componentDidMount() {
        this._animate(endOpacity);

        AsyncStorage.getItem('geoLocation').then(location => {
            if (location) {
                if (this.mounted) {
                    this.setState({location});
                }
            } else {
                this._setLocation();
            }
        })
    }
    componentWillUnmount(){
        this.mounted = false
    }

    _setLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            let coords = position.coords;

            post('/tool/get-location', {lati: coords.latitude, long: Math.abs(coords.longitude)})
                .then(response => {
                    this.setState({location: response.data.location});
                    AsyncStorage.setItem('geoLocation', response.data.location);
                })
                .catch(err => this.setState({err: true}))
                .finally(this._stop.bind(this))
        }, err => {
            this.setState({err: true});
            this._stop();
        });
    }

    _stop() {
        this.curAnimate.stop();
        this.stopAnimate = true;
    }

    _animate(toValue) {
        if (this.stopAnimate) {
            return;
        }

        this.curAnimate = Animated.timing(this.state.bounceValue, {toValue});

        this.curAnimate.start(this._animate.bind(this, toValue == endOpacity ? startOpacity : endOpacity));
    }

    _onPress() {
        this.setState({showPicker: true})
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <Button
                    tracking={{key: 'homepage', topic: 'top', entity: 'city'}}
                    style={styles.showLabel}
                    onPress={this._onPress.bind(this)}>
                    <Animated.Image style={{ opacity: this.state.location ? 1 : this.state.bounceValue}}
                                    source={require('assets/icons/pin2.png')}/>
                    <Text ellipsizeMode="middle" numberOfLines={1} style={styles.locTxt}>
                        {this.state.err && !this.state.location ? '手动定位' : this.state.location}
                    </Text>
                </Button>

                <LocationPicker mark='city' visible={this.state.showPicker} onChange={this.onChange.bind(this)}
                                onHide={() => this.setState({showPicker: false})}/>
            </View>
        );
    }

    onChange(location) {
        this.setState({
            location,
            showPicker: false
        });

        AsyncStorage.setItem('geoLocation', location);
    }
}

const styles = StyleSheet.create({
    showLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    locTxt: {
        fontSize: 15,
        marginLeft: 3,
        color: '#fff'
    },

});
