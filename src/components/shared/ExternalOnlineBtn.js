import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import MenuItem from 'components/shared/MenuItem';
import * as defaultStyles from 'styles';
import styles from 'styles/loan';

import GetGeoLocation from 'utils/geoLocation.js'

function ExternalOnlineTransfer(ExternalComponent) {
  return class ExternalOnlineComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        checkingGPS: false,
      }
    }

    render() {
      let detail = this.props.detail, btnTxt = this.props.btnTxt ? this.props.btnTxt : '立即申请';

      return (
        <ExternalComponent
          {...this.props}
          processing={this.state.checkingGPS}
          {...this._chaoshidaiRouteProps()}
          style={this.props.style}
          textStyle={this.props.textStyle}
          text={btnTxt}
          tracking={Object.assign({}, {key: 'loan', topic: 'product_detail', entity: 'apply_all'}, this.props.tracking)}
          ></ExternalComponent>
      );
    }

    _chaoshidaiRouteProps() {
      let detail = this.props.detail;
      let logined = this.props.loginUser.info;
      let { onlineStatus } = this.props;
      let { status, time_expire_status } = onlineStatus;

      if(!logined) {
        return {
          loginSuccess: () => {
            this.props.fetchOnlineStatus && this.props.fetchOnlineStatus();
            this.props.externalPop && this.props.externalPop();
            //this.props.dispatch(externalPop());
          },
          toKey: 'Login',
          title: '登录'
        };
      }

      console.log("贷款状态： " + status);

       // 贷款失败
      if(status == 7) {
        return this.mergeProps({ toKey: 'OnlineUserInfo', title: '完善个人信息', prePress: this.checkGPS.bind(this)});
      }

      // 预授信失败
      if(status == 4) {
        return this.mergeProps({ toKey: 'OnlinePreloanFailure', title: '预授信申请结果' });
      }

      if(status == 5 && time_expire_status == 1) {
        return this.mergeProps({toKey: 'OnlinePreloanExpire', title: '预授信申请结果'});
      }

      if(status == 5) {
        return this.mergeProps({toKey: 'OnlinePreloanSuccess', title: '预授信申请结果'});
      }

      //6=提交贷款申请中，7=提交失败，8=提交成功，9=贷款申请失败，10=贷款申请成功
      if([6, 8, 9, 10].includes(status)) {
        return this.mergeProps({toKey: 'OnlineApproveStatus', title: '审批状态'});
      }

      if([11, 12, 13, 14].includes(status)) {
        return this.mergeProps({toKey: 'OnlineSignSuccess', title: '签约'});
      }

      if([15].includes(status)) {
        return this.mergeProps({toKey: 'OnlineLoanDetail', title: '借款详情'});
      }

      // 1,2
      return this.mergeProps({ toKey: 'OnlineUserInfo', title: '完善个人信息', prePress: this.checkGPS.bind(this)});
    }

    mergeProps(props) {
      return Object.assign({
        componentProps: { loan_type: this.props.detail.loan_type } },
        props, {
          prePress: () => {
            if(this.props.prePress) this.props.prePress();
            if(props.prePress) return props.prePress();
          }
        }
      );
    }

    checkGPS() {
      this.setState({ checkingGPS: true })

      return new Promise((resolve, reject) => {
        GetGeoLocation({timeout: 5000}).then(position => {
          console.log("position");
          console.log(position);
          this.setState({ checkingGPS: false });
          resolve('');
        }).catch(error => {
          alert("请打开定位");
          this.setState({ checkingGPS: false });
          reject('');
        });
      })

      // return new Promise((resolve, reject) => {
      //   navigator.geolocation.getCurrentPosition(position => {
      //     this.setState({ checkingGPS: false })
      //     resolve('');
      //   }, (error) => {
      //     alert("请打开定位");
      //     this.setState({ checkingGPS: false })
      //     reject('');
      //   }, {timeout: 5000});
      // })
    }
  }
}

export const ExternalOnlineBtn = ExternalOnlineTransfer(ExternalPushLink);

class SuiXinJieExternalOnlineComponent extends Component {
  render() {
    // var statusTxt =
    return (
      <ExternalPushLink {...this.props} style={Object.assign({height: 70}, this.props.style)}>
        <MenuItem iconStyle={{width: 40, height: 40}} title={this.props.detail.title} icon={this.props.detail.logo_list}>
          <Text></Text>
        </MenuItem>
      </ExternalPushLink>
    );
  }

}
export const SuiXinJieExternalOnline = ExternalOnlineTransfer(SuiXinJieExternalOnlineComponent);
