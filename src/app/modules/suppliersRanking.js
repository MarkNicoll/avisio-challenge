import React from "react";
import "chart.js";
import { Radio } from "@material-ui/core";
import { ColumnChart } from "react-chartkick";

class SupplierRanking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suppliers: [],
      comparisonValue: "price",
      yAxisTitle: "Total (‎€)",
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getSuppliersWithSpecifiedValue = this.getSuppliersWithSpecifiedValue.bind(this);
    this.getYAxisTitle = this.getYAxisTitle.bind(this);
  }

  componentDidMount() {
    const { comparisonValue } = this.state;
    const suppliers = this.getSuppliersWithSpecifiedValue(comparisonValue);
    this.setState({
      suppliers
    })
  }

  getSuppliersWithSpecifiedValue(comparisonValue) {
    const { orderData } = this.props;
    const suppliers = [];

    // Create a key value array containing the supplier name and the singled-out value that we want
    orderData.forEach((item) => {
      const existingSupplier = suppliers.findIndex(
        (supplier) => supplier.name === item.supplier
      );
      if (existingSupplier < 0) {
        suppliers.push([item.supplier, parseFloat(item[comparisonValue])]);
      } else {
        suppliers[existingSupplier][0] += parseFloat(item[comparisonValue]);
      }
    });
    return suppliers;
  }

  getYAxisTitle(comparisonValue) {
    let yAxisTitle;
    if (comparisonValue === "price") {
      yAxisTitle = "Total (‎€)";
    } else {
      yAxisTitle = "Quantity";
    }
    return yAxisTitle;
  }

  handleRadioButtonChange(event) {
    const comparisonValue = event.target.value;
    const suppliers = this.getSuppliersWithSpecifiedValue(comparisonValue);
    const yAxisTitle = this.getYAxisTitle(comparisonValue);

    this.setState({
      comparisonValue,
      suppliers,
      yAxisTitle,
    });
  }

  render() {
    const { comparisonValue, suppliers, yAxisTitle } = this.state;

    return (
      <div className="moduleContainer">
        <h2>Supplier Ranking</h2>

        <div className="options">
          <p> Rank by price:</p>
          <Radio
            checked={comparisonValue === "price"}
            onChange={this.handleRadioButtonChange}
            value="price"
            name="price"
          />
          <p>Rank by quantity:</p>
          <Radio
            checked={comparisonValue === "quantity"}
            onChange={this.handleRadioButtonChange}
            value="quantity"
            name="quantity"
          />
        </div>
        <div className="moduleBody">
        <ColumnChart
          xtitle="Supplier"
          ytitle={yAxisTitle}
          width="450px"
          height="300px"
          data={suppliers}
        />
        </div>
      </div>
    );
  }
}

export default SupplierRanking;
