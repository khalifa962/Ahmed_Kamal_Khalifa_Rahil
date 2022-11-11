import { Component } from "react";
import style from "./Card.module.css";
class Card extends Component {
  render() {
    return <div className={style.card}>{this.props.children}</div>;
  }
}
export default Card;
