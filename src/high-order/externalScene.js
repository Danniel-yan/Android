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
      const Header = this.props.backButton === false ? SceneHeader : BackHeader;
  
      return (
        <View style={defaultStyles.container}>
          <Header {...this.props} title={title} right={RightComponent} />
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass {...this.props} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }
}

const BackHeader = connect(null, dispatch => {
  return { onBack: () => dispatch(externalPop()) }
})(SceneHeader);

