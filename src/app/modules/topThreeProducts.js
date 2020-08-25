import React from "react";
import { Radio } from "@material-ui/core";
import { sortByValue, getProductTotalsFromOrders } from '../utils/orderUtils';

class TopThreeProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      sortValue: "price",
    };

    this.displayTopThreeProducts = this.displayTopThreeProducts.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
  }

  componentDidMount() {
    const { sortValue } = this.state;
    const { orderData } = this.props;

    const products = getProductTotalsFromOrders(orderData);
    const sortedProducts = sortByValue(products, sortValue);

    this.setState({
      products: sortedProducts,
    });
  }

  handleRadioButtonChange(event) {
    const { orderData } = this.props;
    const sortValue = event.target.value;
    const orderDataCopy = [...orderData];

    const products = sortByValue(orderDataCopy, sortValue);
    const sortedProducts = getProductTotalsFromOrders(products);

    this.setState({
      products: sortedProducts,
      sortValue,
    });
  }

  // Get the top three products and map them for rendering
  displayTopThreeProducts() {
    const { products, sortValue } = this.state;
    const topThreeProducts = products.slice(0, 3);

    const dataToDisplay = topThreeProducts.map((product) => {
      if (sortValue === "quantity") {
        return (
          <li key={product.name} className="listItem">
            <div><b>Product: </b>{product.name}</div>
            <div><b>Total Quantity: </b>{product.totalQuantity}</div>
          </li>
        );
      } else {
        return (
          <li key={product.name} className="listItem">
            <div><b>Product: </b>{product.name}</div>
            <div><b>Total Price: </b>{product.totalPrice}</div>
          </li>
        );
      }
    });

    return dataToDisplay;
  }

  render() {
    const { sortValue } = this.state;

    return (
      <div className="moduleContainer">
        <h2>Top 3 Products Ordered</h2>
        <div className="options">
          <p>By price:</p>
          <Radio
            checked={sortValue === "price"}
            onChange={this.handleRadioButtonChange}
            value="price"
            name="price"
          />
          <p>By quantity:</p>
          <Radio
            checked={sortValue === "quantity"}
            onChange={this.handleRadioButtonChange}
            value="quantity"
            name="quantity"
          />
        </div>
        {this.displayTopThreeProducts()}
      </div>
    );
  }
}

export default TopThreeProducts;
