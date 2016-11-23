import React, { PureComponent } from 'react';

import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image
} from 'react-native';

import Text from './shared/Text';
import { post } from 'utils/fetch';

const startOpacity = 0.3; 
const endOpacity = 1;

export default class GeoCity extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(startOpacity),
    };
  }

  componentDidMount() {
    this._animate(endOpacity);

    navigator.geolocation.getCurrentPosition(position => {
      let coords = position.coords;

      post('/tool/get-location', { lati: coords.latitude, long: Math.abs(coords.longitude)})
        .then(response => {
          this.setState({ location: response.data.location });
        })
        .catch(err => this.setState({ err: true }))
        .finally(this._stop.bind(this))
    }, err => {
      this.setState({ err: true });
      this._stop();
    });
  }

  _stop() {
    this.curAnimate.stop();
    this.stopAnimate = true;
  }

  _animate(toValue) {
    if(this.stopAnimate) { return; }

    this.curAnimate = Animated.timing(this.state.bounceValue, { toValue });

    this.curAnimate.start(this._animate.bind(this, toValue == endOpacity ? startOpacity : endOpacity));
  }


  render() {
    return (
      <View style={[this.props.style]}>
        <TouchableOpacity style={styles.showLabel}>
          <Animated.Image style={{ opacity: this.state.location ? 1 : this.state.bounceValue}} source={require('assets/icons/pin2.png')}/>
          <Text ellipsizeMode="middle" numberOfLines={1} style={styles.locTxt}>
            {this.state.err == true ? '定位失败' : this.state.location}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locTxt: {
    fontSize: 15,
    height: 20,
    marginLeft: 3,
    color: '#fff'
  },

});
