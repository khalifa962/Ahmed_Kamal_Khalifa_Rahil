import { request, gql } from 'graphql-request'
import React from 'react';
import styles from './Currencies.module.css';
class Currencies extends React.Component{
  constructor(){
    super();
    this.state={
      myData:[],
      currency:"$"
    }

  }
    // {category(input: {title: "tech"}){name products{id}}}
  componentDidMount(){
  const query = gql`
    {
      currencies{
        label
        symbol
      }
    }
    `
    request("http://localhost:4000", query).then((data) => {
      const currenciesArr=data.currencies
      this.setState({myData:currenciesArr});
    }
  )
  }
currenciesChangeHandler=(e)=>{
  this.setState((prev)=>{
    return {
      ...prev,
      currency:e.target.innerText.split(" ")[0]
    }
  })
  setTimeout(()=>{
    return this.props.returnCurrnFun(this.state.currency)
  },200)
}

  render(){
    return(
      <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{this.state.currency}</button>
      <div className={styles['dropdown-content']}>
        {this.state.myData.map((c,i)=><div
          key={c.label}
          value={c.label}
          id={c.label}
          onClick={this.currenciesChangeHandler}>
          {c.symbol} {c.label}
          </div>
        )}
      </div>
      </div>

    )
  }
}
export default Currencies;
