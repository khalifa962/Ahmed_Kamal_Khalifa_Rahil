import style from "./Modal.module.css";
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

export class Backdrop extends Component {
  backdropClasses = `${style.backdrop} ${this.props.className}`;
  render() {
    return (
      <div
        onClick={this.props.showCartHandler}
        className={this.backdropClasses}
      ></div>
    );
  }
}

 class ModalOverlay extends Component {
  modalOverlayClasses = `${style.modal} ${this.props.className}`;
  render() {
    return (
      <div className={this.modalOverlayClasses}>
        <div className={style.content}>{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById("overlays");

class Modal extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {ReactDOM.createPortal(
          <Backdrop showCartHandler={this.props.showCartHandler} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </div>
    );
  }
}
export default Modal;
