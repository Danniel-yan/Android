import React, { Component } from 'react';
import ProcessingButton from 'components/shared/ProcessingButton';

export default class LoanButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var btnText = this.props.isIOSVerifying ? "立即查看" : "去贷款";
    return (
      <ProcessingButton {...this.props} text={btnText} />
    );
  }
}
