import React from "react";
import CartContext from "../../store/cart-context";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../cart/cartIcon";
import Currencies from './Currencies';
class HeaderCartButton extends React.Component {
  static contextType = CartContext;
  render(){
    const numberOfCartItems = this.context.items.reduce((curr, item) => curr + item.amount, 0)
  return (
    <div className={style.rightCont}>
    <Currencies returnCurrnFun={this.props.returnCurrnFun}/>
    <button className={style.button} onClick={this.props.showCartHandler}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      {numberOfCartItems>0&&<span className={style.badge}>{numberOfCartItems}</span>}
    </button></div>
);
}
};
export default HeaderCartButton;
