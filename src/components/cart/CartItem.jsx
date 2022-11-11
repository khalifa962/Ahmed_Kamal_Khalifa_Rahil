import { Component } from "react";
import classes from "./CartItem.module.css";

import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

class CartItem extends Component {
constructor(props){
  super(props);
  this.state={
    selectedImage:0,
  }
}
  priceHandler=()=>this.props.returnPriceFun(+this.props.price);
  lenghtImages=this.props.images.length;
  previousHandler = () => {
    return this.state.selectedImage === 0 ? this.setState({selectedImage:0}):this.setState((prev)=>{
        return {selectedImage:prev.selectedImage-1}
      })
  };
  nextHandler = () => {
    return this.state.selectedImage === this.lengthImages-1 ? this.setState({selectedImage:this.lengthImages-1}):this.setState((prev)=>{
        return {selectedImage:prev.selectedImage+1}
      })
  };



  classColorHanlder = (value) => {
      let color = {};
      let classesC = `${classes.colorCont}`;
      // eslint-disable-next-line array-callback-return
      this.props.selectedAttr.map((e) => {
        if (Object.keys(e).toString() === "Color") {
          color = e;
          return color.Color === value
            ? (classesC = `${classes.colorCont} ${classes.colorSelected}`)
            : (classesC = `${classes.colorCont}`);
        }
      });
      return classesC;
    };

  itemClasses = function (value,id) {
      let classesI = `${classes.itemClass}`;
      // eslint-disable-next-line array-callback-return
    this.props.selectedAttr.map((e)=>{
      if( [e[Object.keys(e)]].toString()=== value&&Object.keys(e).toString()===id){
        return classesI = `${classes.itemClass} ${classes.active}`
      }
    })
    return classesI;
    };



render(){


  const price = this.priceHandler();
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.summary}>
      <h2>{this.props.brand}</h2>
        <h3>{this.props.name}</h3>
        <div className={classes.price}>{price}</div>
        <div className={classes.attributes}>
          {this.props.product.attributes.map((attr) => {
            return (
              <div key={attr.id}>
                <h4> {attr.name}: </h4>
                {attr.items.map((i) => {
                  return attr.name === "Color" ? (
                    <div
                      key={i.id}
                      className={this.classColorHanlder(i.value)}
                      style={{backgroundColor: `${i.value}`}}></div>
                ):(
                    <div
                      key={i.id}
                      className={this.itemClasses(i.value,attr.id)}
                      >
                      {i.value}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

      </div>

      <div className={classes.actions}>
        <button onClick={this.props.onAdd}>+</button>
        <div className={classes.amount}>{this.props.amount}</div>
        <button onClick={this.props.onRemove}>−</button>
      </div>

      <div className={classes.image}>
          <img src={this.props.images[this.state.selectedImage]} alt="selectedImage"/>
      </div>
      <div className={classes.arrows}>
        <img onClick={this.previousHandler} src={leftArrow} alt="leftArrow" />
        <img onClick={this.nextHandler} src={rightArrow} alt="rightArrow" />
      </div>

    </li>
    );
  }
};

export default CartItem;
