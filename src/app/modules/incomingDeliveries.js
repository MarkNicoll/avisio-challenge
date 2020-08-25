import React from "react";
import Table from "../components/table";
import {
  getSuppliers,
  getOrdersForSupplier,
  getDeliveryDatesForSupplier,
} from "../utils/orderUtils";
import SelectionForm from "../components/selectionForm";

class IncomingDeliveries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suppliers: [],
      deliveries: [],
      tableData: [],
      selectedSupplier: "",
      selectedDeliveryDate: "",
    };

    this.getTableHeaders = this.getTableHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {
    const { orderData } = this.props;
    const suppliers = getSuppliers(orderData);

    this.setState({
      suppliers,
    });
  }

  getTableHeaders() {
    const headers = [
      "Supplier",
      "Product ID",
      "Product Name",
      "Category",
      "Sub-category",
      "Order Date",
      "Price",
      "Quantity",
      "Delivery Date",
    ];
    return headers;
  }

  // We want the row data to be an array of arrays so it can be easily mapped in the table component without needing to know the object property keys
  getTableRows() {
    const { tableData } = this.state;
    const rows = tableData.map((order) => {
      return Object.values(order);
    });
    return rows;
  }

  getTableContents(selectedDeliveryDate) {
    const { selectedSupplier } = this.state;
    const { orderData } = this.props;
    const orders = getOrdersForSupplier(selectedSupplier, orderData);
    const tableData = orders.filter(
      (order) => order.deliveryDate === selectedDeliveryDate
    );
    return tableData;
  }

  handleSelectionChange(event, type) {
    const { orderData } = this.props;
    const selectedValue = event.target.value;
    if (type === "supplier") {
      const deliveries = getDeliveryDatesForSupplier(selectedValue, orderData);
      this.setState({
        selectedSupplier: selectedValue,
        deliveries,
        selectedDeliveryDate: ""
      });
    } else if (type === "delivery date") {
      const tableData = this.getTableContents(selectedValue);
      this.setState({
        tableData,
        selectedDeliveryDate: selectedValue,
      });
    }
  }

  render() {
    const {
      suppliers,
      selectedSupplier,
      deliveries,
      selectedDeliveryDate,
    } = this.state;

    return (
      <div className="moduleContainer">
        <h2>Incoming Deliveries</h2>
        <div className="options" id="incomingDeliveries">
          <SelectionForm
            data={suppliers}
            value={selectedSupplier}
            handleChange={this.handleSelectionChange}
            type="supplier"
            label="Supplier: "
            shouldShowDefaultOption={true}
          />
          <SelectionForm
            data={deliveries}
            value={selectedDeliveryDate}
            handleChange={this.handleSelectionChange}
            type="delivery date"
            label="Delivery Date: "
            shouldShowDefaultOption={true}
          />
        </div>
        {selectedSupplier && selectedDeliveryDate ? (
          <Table rows={this.getTableRows()} headers={this.getTableHeaders()} />
        ) : (
          <div className="deliveryMessage">Please select a supplier and date to view upcoming deliveries.</div>
        )}
      </div>
    );
  }
}

export default IncomingDeliveries;
