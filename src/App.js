import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import CartProvider from "./store/CartProvider";

import "./styles.css";
import Cart from "./components/cart/Cart";

import Header from "./components/layout/Header";
import AvailableProducts from "./components/products/AvailableProducts";
import CartPage from "./components/cart/CartPage";
import ProductDetails from './components/products/ProductDetails';


export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      cartIsShown:false,
      alertIsShown:false,
      curr:"",
      active:"",
    };

  }


//setting isLoading false
isLoadingHandler=()=>{
  this.setState((prev)=>{
    return{
      ...prev,
      isLoading:false
    }
  })
}

 showCartHandler = () => {
    this.setState((prev)=>{
      return {cartIsShown:!prev.cartIsShown}
    });
  };

showAlertHandler = () => {
     this.setState((prev)=>{
       return {alertIsShown:!prev.alertIsShown}
     });
   };

  returnCurrnFun=(x)=>{
    return this.setState(prev=>{
      return{
        ...prev,
        curr:x
      }
    });
  }
 returnPriceFun=(y)=>{
    if(this.state.curr==="¥")return `¥ ${(y*148.6690).toFixed(2)}`
    else if(this.state.curr==="£") return `£ ${(y*0.87).toFixed(2)}`
    else if(this.state.curr==="₽") return `₽ ${(y*61.70).toFixed(2)}`
    else if(this.state.curr==="A$") return `A$ ${(y*1.58).toFixed(2)}`
    else return `$ ${y.toFixed(2)}`
  }


render(){
    return (
      <CartProvider>
      {this.state.cartIsShown && <Cart returnPriceFun={this.returnPriceFun} showCartHandler={this.showCartHandler} />}

        <Header categoryHandler={this.categoryHandler}
                categoryName={this.state.active}
                returnCurrnFun={this.returnCurrnFun}
                showCartHandler={this.showCartHandler}
                />
          <main>
          <Routes>

              {['home',"/",'/:title'].map(path => <Route key={path} path={path} element={<AvailableProducts
                isLoading={this.state.isLoading}
                products={this.state.products}
                fetchData={this.fetchData}
                showAlertHandler={this.showAlertHandler}
                alert={this.state.alertIsShown}
                returnPriceFun={this.returnPriceFun}
                categoryName={this.state.active}/>} />)}

            <Route path="/:title/:id" element={<ProductDetails
              returnPriceFun={this.returnPriceFun}
              isLoadingHandler={this.isLoadingHandler}
              showAlertHandler={this.showAlertHandler}
              alert={this.state.alertIsShown}
              />}/>

            <Route path="/CartPage" element={<CartPage
            returnPriceFun={this.returnPriceFun}
            isLoadingHandler={this.isLoadingHandler}
            />}/>

            <Route
              path="*"
              element={
                <main className="notFound">
                  <p>Not Found 404, <Link to="/">Return To Homepage</Link></p>
                </main>
              }
            />
          </Routes>
          </main>
      </CartProvider>
      );
    }
    }
