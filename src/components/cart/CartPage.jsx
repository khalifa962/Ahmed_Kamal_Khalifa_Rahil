import React from 'react';
import classes from './CartPage.module.css';
import CartContext from "../../store/cart-context";

import CartPageItem from './CartPageItem';

class CartPage extends React.Component {
  static contextType=CartContext;

  orderHandler=()=>{
    window.localStorage.removeItem("myItems");
    this.context.resetCart();
  }
  cartItemRemoveHandler = (id) => {
    this.context.removeItem(id);
  };
  cartItemAddHandler = (item) => {
    this.context.addItem({ ...item, amount: 1 });
  };


  render(){
    return <>
    <h1 style={{borderBottom:"1px solid #ccc",marginTop:"150px",marginLeft:"20px",padding:"30px"}}>CART: {this.context.items.reduce((curr, item) => curr + item.amount, 0)} Items</h1>

    <ul className={classes["cart-items"]}>
    {this.context.items.map((i) => {
      return (<CartPageItem
                key={i.id}
                name={i.name}
                brand={i.brand}
                amount={i.amount}
                price={i.price}
                images={i.images}
                product={i.product}
                attributes={i.attributes}
                selectedAttr={i.selectedAttr}
                onAdd={this.cartItemAddHandler.bind(null, i)}
                onRemove={this.cartItemRemoveHandler.bind(null, i.id)}
                returnPriceFun={this.props.returnPriceFun}
            />)
          })}
        </ul>
        <div className={classes.quantity}>
          <span>Quantity:  </span>
          <span>
          {this.context.items.reduce((curr, item) => curr + item.amount, 0)}
          </span>
        </div>
        <div className={classes.total}>
          <span>Total:  </span>
          <span>
          {this.props.returnPriceFun(this.context.totalAmount)}
          </span>
        </div>
        <div>
            <button className={classes.button} onClick={this.orderHandler}>
              Order
            </button>
        </div>
    </>



};
}

export default CartPage;
