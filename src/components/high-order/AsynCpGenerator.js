import React, { PropTypes, Component } from 'react';
import {
  View
} from 'react-native';

var AsynCpGenerator = function(FetchingCp, ElementCp) {
  return class AsynCp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: this.props.isFetching
      }
    }

    componentDidMount() {
      this._fetchingData()
    }

    renderFetchingCp() {
      return FetchingCp ? <FetchingCp /> : null;
    }

    renderElementCp() {
      return React.createElement(ElementCp, this.props);
    }

    render() {
      //
      if(this.props.isFetching) return this.renderFetchingCp();
      return this.renderElementCp();
    }

    _fetchingData() {
      this.props.fetching && this.props.fetching(this.props.fetchingParams);
    }

    propTypes: {
      fetching: propTypes.func.isRequired
    }
  }
}

module.exports = AsynCpGenerator;
