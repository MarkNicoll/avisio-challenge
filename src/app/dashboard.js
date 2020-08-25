import React from "react";
import Header from "./components/header";
import orderData from "../data/orderData";
import TopThreeProducts from "./modules/topThreeProducts";
import OrderVolume from "./modules/orderVolume";
import SupplierRanking from "./modules/suppliersRanking";
import IncomingDeliveries from "./modules/incomingDeliveries";
import SelectionForm from "./components/selectionForm";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalModuleOrder: [],
      modules: [
        {
          module: TopThreeProducts,
          title: "Top Three Products",
        },
        {
          module: OrderVolume,
          title: "Order Volume",
        },
        {
          module: SupplierRanking,
          title: "Supplier Ranking",
        },
        {
          module: IncomingDeliveries,
          title: "Incoming Deliveries",
        },
      ],
      selectionOptions: [],
    };

    this.displayModules = this.displayModules.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {
    const { modules } = this.state;

    // Get the available dropdown selection options from the list of modules
    const selectionOptions = modules.map((module) => {
      return module.title;
    });

    // We set originalModuleOrder because the user could change the displayed module list to contain 4 of the same component
    // Maintaining a list with the original order means that we always an unchanging list to pull the new module from when a dropdown selection changes
    this.setState({
      originalModuleOrder: [...modules],
      selectionOptions,
    });
  }

  handleSelectionChange(event, index) {
    const { modules, originalModuleOrder } = this.state;
    const moduleName = event.target.value;
    const updatedModules = [...modules];

    // Use the unchanged originalModuleOrder to find the new module by title
    const newModule = originalModuleOrder.find(
      (module) => module.title === moduleName
    );

    // Update the displayed modules list with the new module
    updatedModules[index] = newModule;

    this.setState({
      modules: updatedModules,
    });
  }

  displayModules() {
    const { modules, selectionOptions } = this.state;

    return modules.map((item, i) => {
      const Component = item.module;
      return (
        <div key={"wrapper_" + i} className="moduleWrapper">
          <SelectionForm
            data={selectionOptions}
            value={item.title}
            handleChange={this.handleSelectionChange}
            type={i}
            label="Data to display: "
            shouldShowDefaultOption={false}
          />
          <Component orderData={orderData} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="dashboard">{this.displayModules()}</div>
      </div>
    );
  }
}

export default Dashboard;
