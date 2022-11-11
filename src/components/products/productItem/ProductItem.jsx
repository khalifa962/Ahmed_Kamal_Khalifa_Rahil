import React from "react";
import {Link} from "react-router-dom";

import style from "./ProductItem.module.css";
import CartContext from "../../../store/cart-context";

import ProductDetails from '../ProductDetails';
import Alert from '../../UI/alert';

class ProductItem extends React.Component {
  static contextType = CartContext;

  onAddToCartHandler = () => {
    if(this.props.attributes.length===0){
      this.context.addItem({
      id: this.props.id,
      name: this.props.name,
      amount: 1,
      price: this.props.price,
      images:this.props.images,
      brand:this.props.brand,
      product:this.props.product
    });
  }else{
    if(this.context.items.length>0){
      let  checker=this.context.items.find(e=>e.id===this.props.id)||{id:"non"}
      return this.context.items.map((i) => {
        if(this.props.id!==checker.id){
          return this.props.showAlertHandler()
        } else {
        this.context.addItem({
          id: this.props.id,
          name: this.props.name,
          amount: 1,
          price: this.props.price,
          images:this.props.images,
          brand:this.props.brand,
          product:this.props.product
        });
      }
      })
    }else{
      return this.props.showAlertHandler();
    }
  }
  }


  priceHandler=()=>this.props.returnPriceFun(this.props.price);

  render(){
    const price = this.priceHandler();
    return <>{this.props.alert? (<Alert showAlertHandler={this.props.showAlertHandler}>
            <p>Please Click On the product Card To Determine The specification You Want and then Add The Item To Your Cart!</p>
              <button onClick={this.props.showAlertHandler}>OK</button>
          </Alert>):(
      <li
        className={style.product}>
        <Link style={{color:"#000"}} to={`/${this.props.currCategory}/${this.props.id}`} >
          <div className={style.image}>
              <img src={this.props.images[0]}/>
          </div>
        </Link>
        <h3>{this.props.brand} {this.props.name}</h3>
          <div className={style.price}>{price}</div>
        {this.props.inStock&&(
        <div onClick={this.onAddToCartHandler} className={style.basket}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#77dd77"
          stroke="white" strokeWidth="1"
          height="30"
          width="30"
          display="inline-block"
          margin="auto"
          >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>)}
        {!this.props.inStock&&<div className={style.outOfStock}>Out Of The Stock</div>}
    </li>)}</>
      }
};

export default ProductItem;
