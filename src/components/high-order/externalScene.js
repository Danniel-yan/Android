import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass, title) {

  return class ExternalPageComponent extends Component {
    state = { title: undefined };

    render() {
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader title={this.state.title || title || ComponentClass.title || this.props.title} onBack={this.props.onBack}/>
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass {...this.props} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }

}

