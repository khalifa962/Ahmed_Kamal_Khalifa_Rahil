import { Backdrop } from "./Modal";
import ReactDOM from "react-dom";
import React, { Component } from "react";
const spinnerElement = document.getElementById("spinner");


class SpinnerLoader extends Component {
  render(){
    return (
    <section className="talign-center">
      <div
        className="spinner spinner--steps2 icon-spinner-7"
        aria-hidden="true"
      ></div>
    </section>
  )}
};
class Spinner extends Component{
  render(){
    return (
        <>
          {ReactDOM.createPortal(<Backdrop />, spinnerElement)}
          {ReactDOM.createPortal(<SpinnerLoader />, spinnerElement)}
        </>
    )
  }
};
export default Spinner;
