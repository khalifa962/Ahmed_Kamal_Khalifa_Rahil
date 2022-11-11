import ReactDOM from "react-dom";
import React, { Component, Fragment } from "react";
import classes from './alert.module.css';

class AlertBackdrop extends Component {
  render() {
   return (
     <div
       onClick={this.props.showAlertHandler}
       className={classes.alertBackdrop}
     ></div>
   );
 }
}

class AlertOverlay extends Component {

 render() {
   return (
       <div className={classes.alertModal}>{this.props.children}</div>
   );
 }
}

const alertElement = document.getElementById("dropAlert");


class Alert extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {ReactDOM.createPortal(
          <AlertBackdrop showAlertHandler={this.props.showAlertHandler} />,
          alertElement
        )}
        {ReactDOM.createPortal(
          <AlertOverlay>{this.props.children}</AlertOverlay>,
          alertElement
        )}
      </div>
    );
  }
}
export default Alert;
