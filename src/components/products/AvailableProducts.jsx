import { request, gql } from 'graphql-request';
import { useParams } from "react-router-dom";
import { Component, React } from "react";

import style from "./AvailableProducts.module.css";
import Card from "../UI/Card";
import Spinner from "../UI/spinner";

import ProductItem from "./productItem/ProductItem";

class AvailableProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: true,
    };
  }

  queryCAT = gql`query GET_CATEGORY($title:String!){category(input: {title:$title}){name products{
     id
     name
     inStock
     gallery
     description
     category
     attributes{
       id
       name
       type
       items{
         displayValue
         value
         id
       }
     }
     prices{
       amount
     }
     brand
   }}}
  `

 currTitle="all";
fetchData=()=>{
  this.loadingHandler();
    this.currTitle=this.props.params.title?this.currTitle=this.props.params.title:"all";
  request("http://localhost:4000",this.queryCAT,{
    title: this.currTitle,
  }).then((data)=>{
    setTimeout(() => {
      this.setState({
        isLoading: false,
        products: data.category.products
      });
    }, 100)
  })
}

componentDidMount() {
  this.fetchData();
}


componentDidUpdate(prevProps, prevState) {
  if (prevProps.params.title !== this.props.params.title) {
    this.currTitle=this.props.params.title
    this.fetchData();
  }
}

  // eslint-disable-next-line no-unreachable
loadingHandler=()=>{
    this.setState((prev)=>{
      return{
        ...prev,
        isLoading:true,
      }
    })
  }


  render() {

    return (<> {this.state.isLoading&&<Spinner/>}<h1 style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  color: "#444",
                  fontWeight:"bold",
                  marginTop:"100px",
                  marginLeft:"25px",
                  textTransform:"uppercase"
                }}>{this.currTitle} products</h1>
              <section className={style.meals}>
                <Card>
                  <ul>
                    {this.state.products.map((p) => {
                      return (
                        <ProductItem
                          id={p.id}
                          key={p.id}
                          product={p}
                          attributes={p.attributes}
                          name={p.name}
                          description={p.description}
                          price={p.prices[0].amount}
                          images={p.gallery}
                          inStock={p.inStock}
                          returnPriceFun={this.props.returnPriceFun}
                          showAlertHandler={this.props.showAlertHandler}
                          alert={this.props.alert}
                          currCategory={this.props.params.title}
                        />
                      );
                    })}
                  </ul>
                </Card>
              </section>
    </>)
  }
}

//exporting the component as a function params as a prop that contains useParams() Hook to manage to get the param of url in class componenet).
export default function ProductsHan(props) {
  return <AvailableProducts {...props} params={useParams()} />;
}
