import React from "react";
import {Link}from "react-router-dom";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
class Cart extends React.Component {

  static contextType=CartContext;

  cartItemRemoveHandler = (id) => {
    this.context.removeItem(id);
    };
  cartItemAddHandler = (item) => {
    this.context.addItem({ ...item, amount: 1 });
    };

orderHandler=()=>{
  window.localStorage.removeItem("myItems");
  this.context.resetCart();
}
  //modal actions
  modalAction=()=>{
     return (
      <div className={style.actions}>
        <Link style={{color:"#222",textDecoration:"none",fontWeight:"bold",letterSpacing:"2px"}} to="/CartPage">
          <button
            onClick={this.props.showCartHandler}
            className={style["button--alt"]}>
            Veiw Bag
          </button>
        </Link>
        {this.context.items.length > 0 && (
          <button className={style.button} onClick={this.orderHandler}>Order</button>
        )}
      </div>
    )
   }


  ModalContent =()=>{
  return(
       <>
       <h1>My Bag: {this.context.items.reduce((curr, item) => curr + item.amount, 0)} Items</h1>
          <ul className={style["cart-items"]}>
            {this.context.items.map((i) => {
              return (
                <CartItem
                  key={i.id}
                  name={i.name}
                  amount={i.amount}
                  price={i.price}
                  images={i.images}
                  brand={i.brand}
                  product={i.product}
                  attributes={i.attributes}
                  selectedAttr={i.selectedAttr}
                  onAdd={this.cartItemAddHandler.bind(null, i)}
                  onRemove={this.cartItemRemoveHandler.bind(null, i.id)}
                  returnPriceFun={this.props.returnPriceFun}
                />
              )})
          }
          </ul>
         <div className={style.total}>
           <span>Total</span>
           <span>
           {this.props.returnPriceFun(this.context.totalAmount)}
           </span>
         </div>
       </>
      );
    }
  render(){
    const theContent=this.ModalContent();
    const theForm=this.modalAction();
    return <Modal showCartHandler={this.props.showCartHandler}>{theContent}{theForm}</Modal>;

  }
};
export default Cart;
