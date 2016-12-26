import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import { externalPop } from 'actions/navigation';
import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass, RightComponent) {


  return class ExternalPageComponent extends Component {
    static external = true;

    state = { title: undefined };

    render() {
      let title = this.state.title || this.props.sceneTitle || ComponentClass.title;
      let { backCount, ...props } = this.props;
      backCount = backCount === undefined ? 1 : backCount;
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader {...props} backCount={backCount} title={title} right={RightComponent} />
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass {...props} backCount={backCount} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }

}

