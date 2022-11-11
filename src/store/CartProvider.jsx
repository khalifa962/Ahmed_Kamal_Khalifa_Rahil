import React from "react";
import CartContext from "./cart-context";


class CartProvider extends React.Component {

  constructor(props){
    super(props);
    this.state={items:[], totalAmount: 0}
  }

 resetCart = () => {
   window.localStorage.removeItem("myItems");
    this.setState({items:[], totalAmount: 0})
  };
componentDidMount(){
  if(JSON.parse(window.localStorage.getItem('myItems'))){
    this.setState(JSON.parse(window.localStorage.getItem('myItems')))
  }
}
addItemHandler = (item) => {
    const updatedTotalAmount =
    this.state.totalAmount + item.price * item.amount;
    const existingCartItemIndex = this.state.items.findIndex(
      (i) => i.id === item.id
    );
    const existingCartItem = this.state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount
      };
      updatedItems = [...this.state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = this.state.items.concat(item);
    }
     this.setState({ items: updatedItems, totalAmount: updatedTotalAmount });
     setTimeout(()=>window.localStorage.setItem('myItems', JSON.stringify(this.state)),1000)
  };

 removeItemHandler = (id) => {
    const existingCartItemIndex = this.state.items.findIndex(
      (i) => i.id === id
    );
    const existingCartItem = this.state.items[existingCartItemIndex];
    const updatedTotalAmount = this.state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = this.state.items.filter((i) => {
        return i.id !== id;
      });
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...this.state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
   this.setState({
      items: updatedItems,
      totalAmount: updatedTotalAmount
    })
    setTimeout(()=>window.localStorage.setItem('myItems', JSON.stringify(this.state)),1000)

  };

  render(){
    const cartContext = {
      items: this.state.items,
      totalAmount: this.state.totalAmount,
      addItem: this.addItemHandler,
      removeItem: this.removeItemHandler,
      resetCart:this.resetCart,
      itemsStored:this.itemsStored
    };
    return (
    <CartContext.Provider value={cartContext}>
      {this.props.children}
    </CartContext.Provider>
  );
}
};

export default CartProvider;
