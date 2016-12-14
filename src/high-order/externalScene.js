import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass, config) {

  return class ExternalPageComponent extends Component {
    state = { title: undefined };

    render() {
      let title = this.state.title || config.title || ComponentClass.title || this.props.title;
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader title={title} onBack={this.props.onBack}/>
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass sceneTitle={title} {...this.props} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }

}

