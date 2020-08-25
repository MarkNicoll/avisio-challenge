import React from "react";
import "chart.js";
import { LineChart } from "react-chartkick";
import { countBy } from "underscore";
import SelectionForm from "../components/selectionForm";
import { getSuppliers } from "../utils/orderUtils";

class OrderVolume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: [],
      categoryList: [],
      subCategoryList: [],
      supplierList: [],
      filters: {
        categoryFilter: "",
        subCategoryFilter: "",
        supplierFilter: "",
      },
    };

    this.getFilteredCategories = this.getFilteredCategories.bind(this);
    this.getFilteredSubCategories = this.getFilteredSubCategories.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.createNewFilters = this.createNewFilters.bind(this);
  }

  componentDidMount() {
    const { orderData } = this.props;
    const orderDataCopy = [...orderData];
    const suppliers = getSuppliers(orderData);

    this.setState({
      orderData: countBy(orderDataCopy, "orderedOn"),
      supplierList: suppliers,
    });
  }

  // Check which filters have been selected and apply them if there are any, otherwise return a copy of the original unfiltered data
  applyFilters(filters) {
    const { orderData } = this.props;

    if (filters.subCategoryFilter) {
      return orderData.filter(
        (order) =>
          order.supplier === filters.supplierFilter &&
          order.productCategory1 === filters.categoryFilter &&
          order.productCategory2 === filters.subCategoryFilter
      );
    } else if (filters.categoryFilter) {
      return orderData.filter(
        (order) =>
          order.supplier === filters.supplierFilter &&
          order.productCategory1 === filters.categoryFilter
      );
    } else if (filters.supplierFilter) {
      return orderData.filter(
        (order) => order.supplier === filters.supplierFilter
      );
    } else {
      return [...orderData];
    }
  }

  getFilteredCategories(filters) {
    const { orderData } = this.props;
    const categories = [];
    if (filters.supplierFilter)
      orderData.forEach((order) => {
        if (
          !categories.includes(order.productCategory1) &&
          order.supplier === filters.supplierFilter
        ) {
          categories.push(order.productCategory1);
        }
      });

    return categories;
  }

  getFilteredSubCategories(filters) {
    const { orderData } = this.props;
    const subCategories = [];
    if (filters.categoryFilter) {
      orderData.forEach((order) => {
        if (
          !subCategories.includes(order.productCategory2) &&
          filters.categoryFilter === order.productCategory1
        ) {
          subCategories.push(order.productCategory2);
        }
      });
    }
    return subCategories;
  }

  // Update the filters object and stop invalid dropdown options for showing in the category and subcategory dropdowns by setting them to an empty string
  createNewFilters(filterType, changedFilter) {
    const { filters } = this.state;
    const updatedFilters = { ...filters };
    if (filterType === "supplier") {
      updatedFilters.supplierFilter = changedFilter;
      updatedFilters.categoryFilter = "";
      updatedFilters.subCategoryFilter = "";
    }
    if (filterType === "category") {
      updatedFilters.categoryFilter = changedFilter;
      updatedFilters.subCategoryFilter = "";
    }
    if (filterType === "subcategory") {
      updatedFilters.subCategoryFilter = changedFilter;
    }
    return updatedFilters;
  }

  handleSelectionChange(event, filterType) {
    const changedFilter = event.target.value;
    const newFilters = this.createNewFilters(filterType, changedFilter);
    const filteredOrderData = this.applyFilters(newFilters);
    this.setState({
      orderData: countBy(filteredOrderData, "orderedOn"),
      filters: newFilters,
      categoryList: this.getFilteredCategories(newFilters), // Populate category dropdown
      subCategoryList: this.getFilteredSubCategories(newFilters), // Populate subcategory dropdown
    });
  }

  render() {
    const {
      orderData,
      categoryList,
      supplierList,
      subCategoryList,
      filters,
    } = this.state;
    return (
      <div className="moduleContainer">
        <h2>Order Volume</h2>
        <div className="options">
          <SelectionForm
            data={supplierList}
            value={filters.supplierFilter}
            handleChange={this.handleSelectionChange}
            type="supplier"
            label="Filter by supplier: "
            shouldShowDefaultOption={true}
          />
          <SelectionForm
            data={categoryList}
            value={filters.categoryFilter}
            handleChange={this.handleSelectionChange}
            type="category"
            label="Filter by category: "
            shouldShowDefaultOption={true}
          />
          <SelectionForm
            data={subCategoryList}
            value={filters.subCategoryFilter}
            handleChange={this.handleSelectionChange}
            type="subcategory"
            label="Filter by subcategory: "
            shouldShowDefaultOption={true}
          />
        </div>
        <div className="moduleBody">
          <LineChart
            xtitle="Date"
            ytitle="Order Volume"
            data={orderData}
            width="450px"
            height="300px"
          />
        </div>
      </div>
    );
  }
}

export default OrderVolume;
