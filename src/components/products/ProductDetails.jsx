import React from "react";
import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";

import CartContext from "../../store/cart-context";
import Alert from '../UI/alert';

import classes from "./ProductDetails.module.css";
class ProductDetails extends React.Component {
  static contextType = CartContext;
  constructor() {
    super();
    this.state = {
      product: {},
      images: [],
      price: "",
      attributes: [],
      selectedAttr: [],
      currentItem: "",
      alert:false,
      in_stock:false
    };
  }

  query = gql`
    query GET_PRODUCT($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
        }
        brand
      }
    }`;

  componentDidMount() {
    const myID = this.props.params.id;
    this.props.isLoadingHandler();
    request("http://localhost:4000", this.query, {
      id: myID,
    }).then((data) => {
      return this.setState({
        product: data.product,
        images: data.product.gallery,
        price: data.product.prices[0].amount,
        attributes: data.product.attributes,
        colorClass: `${classes.colorCont}`,
        inStock:data.product.inStock,
        description:data.product.description
      });
    });
  }

  newArr = [];

  priceHandler = () => this.props.returnPriceFun(+this.state.price);

  addAttr = (name, value) => {

    if (this.newArr.length > 0) {
      // eslint-disable-next-line array-callback-return
      this.newArr.map((e) => {
        if (Object.keys(e).toString() === name) {
          e[Object.keys(e)] = value;
          return [
            ...this.newArr,
            {
              [e[Object.keys(e)]]: value,
            },
          ];
        }
      });
      this.setState((prev) => {
        return {
          ...prev,
          selectedAttr: this.newArr,
        };
      });
    } else {
      let arrayOfAttr = this.state.attributes.map((a) => {
        return {
          [a.name]: "",
        };
      });
      this.newArr = [...arrayOfAttr];
      // eslint-disable-next-line array-callback-return
      this.newArr.map((e) => {
        if (Object.keys(e).toString() === name) {
          e[Object.keys(e)] = value;
          return [
            ...this.newArr,
            {
              [e[Object.keys(e)]]: value,
            },
          ];
        }
      });
      this.setState((prev) => {
        return {
          ...prev,
          selectedAttr: this.newArr,
        };
      });
    }
  };

onAddToCartHandler = () => {
  if (this.state.inStock) {
    if (this.state.attributes.length>0) {
      if (this.state.selectedAttr.length>0){
        let yy=this.state.selectedAttr.filter((e)=>[e[Object.keys(e)]].join().length===0)
        if(yy.join().length===0){
          this.context.addItem({
            id: this.state.product.id,
            name: this.state.product.name,
            amount: 1,
            price: this.state.price,
            images: this.state.images,
            brand: this.state.product.brand,
            product: this.state.product,
            selectedAttr: this.state.selectedAttr,
          });

        }else{
          this.props.showAlertHandler();
        }

      }else{
        this.props.showAlertHandler();
      }
    }else{
      this.context.addItem({
        id: this.state.product.id,
        name: this.state.product.name,
        amount: 1,
        price: this.state.price,
        images: this.state.images,
        brand: this.state.product.brand,
        product: this.state.product,
        attributes:this.state.attributes,
        selectedAttr: this.state.selectedAttr,
        color:this.color,
        classColorHanlder:this.classColorHanlder,
        itemClasses:this.itemClasses,
      });
    }
  }else {
  this.inStockHandler();
  }
};

inStockHandler=()=>{
  return this.setState((prev)=>{
    return{
      ...prev,
      in_stock:!this.state.in_stock
    }
  })
}


classColorHanlder = (value) => {
    let color = {};
    let classesC = `${classes.colorCont}`;
    // eslint-disable-next-line array-callback-return
    this.state.selectedAttr.map((e) => {
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
  this.state.selectedAttr.map((e)=>{
    if( [e[Object.keys(e)]].toString()=== value&&Object.keys(e).toString()===id){
      return classesI = `${classes.itemClass} ${classes.active}`
    }
  })
  return classesI;
  };

render() {
  // console.log(this.state.description);
// console.log(this.state.attributes);
// console.log(this.state.selectedAttr);
const price = this.priceHandler();

  return <>{this.props.alert? (<Alert showAlertHandler={this.props.showAlertHandler}>
        <p>Please Determine the product specification and then Add The Item To Your Cart!</p>
          <button onClick={this.props.showAlertHandler}>OK</button>
      </Alert>):this.state.in_stock?(<Alert>
              <p>Sorry This Product Is Out Of Stock!</p>
                <button onClick={this.inStockHandler}>OK</button>
            </Alert>):(<div className={classes.container}>
    <div className={classes.imagesCont}>
      <div className={classes.images}>

        {this.state.images.map((i, idx) => {
          return <img key={idx} src={i} alt="" />;
        })}
      </div>
      <div className={classes.image}>
        <img src={this.state.images[0]} alt="" />
      </div>
    </div>

    <div className={classes.details}>
      <h3> {this.state.product.brand} </h3>
      <h4 className={classes.pName}> {this.state.product.name} </h4>
      {this.state.attributes.map((attr) => {
        return (
          <div key={attr.id}>
            <h4> {attr.name} </h4>
            {attr.items.map((i) => {
              return attr.name === "Color" ? (
                <div
                  key={i.id}
                  className={this.classColorHanlder(i.value)}
                  style={{
                    backgroundColor: `${i.value}`,
                  }}
                  onClick={() => {
                    this.addAttr(attr.name, i.value);
                  }}
                ></div>
            ):(
                <div
                  key={i.id}
                  className={this.itemClasses(i.value,attr.id)}
                  onClick={(e) => {
                    this.addAttr(attr.name, i.value);
                    setTimeout(() => {
                      return this.setState((prev) => {
                        return {
                          ...prev,
                          currentItem: i,
                        };
                      });
                    }, 200);
                  }}>
                  {i.value}
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        <h4> price: </h4> <p className={classes.price}> {price} </p>
      </div>

      <button
        onClick={this.onAddToCartHandler}
        className={classes.addToCartBtn}
      >
        add to cart
      </button>
      <p className={classes.description} dangerouslySetInnerHTML={{"__html":this.state.description}}></p>
    </div>
  </div>)}</>
  }
}

//exporting the component as a function params as a prop that contains useParams() Hook to manage to get the param of url in class componenet).
export default function ProductDetailsHan(props) {
  return <ProductDetails {...props} params={useParams()} />;
}
