import React, { PropTypes, Component } from 'react';
import {
  View
} from 'react-native';

var AsynCpGenerator = function(FetchingCp, ElementCp) {
  return class AsynCp extends Component {
    static propTypes = {
      fetching: PropTypes.func.isRequired
    };

    constructor(props) {
      super(props);

      this.state = {
        isFetching: this.props.isFetching
      }
    }

    componentDidMount() {
      if(!this.props.fetched || this.props.fetchingParams != this.props.fetchedParams) {
        typeof this.props.fetching == "function" && this.props.fetching(this.props.fetchingParams);
      }
    }

    renderFetchingCp() {
      return FetchingCp ? <FetchingCp /> : null;
    }

    renderElementCp() {
      return React.createElement(ElementCp, this.props);
    }

    render() {
      if(this.props.isFetching && !this.props.fetched) return this.renderFetchingCp();

      return this.renderElementCp();
    }
  }
}

module.exports = AsynCpGenerator;
