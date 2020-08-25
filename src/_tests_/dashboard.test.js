import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Dashboard from "../app/dashboard";
import OrderVolume from "../app/modules/orderVolume";
import SupplierRanking from "../app/modules/suppliersRanking";
import IncomingDeliveries from "../app/modules/incomingDeliveries";

jest.mock("Chart.js", () => null);
jest.mock("react-chartkick", () => ({
  LineChart: () => null,
  ColumnChart: () => null,
}));

it("Renders without crashing", () => {
  const div = document.createElement("div");
  window.HTMLCanvasElement.prototype.getContext = () => {};
  ReactDOM.render(<Dashboard />, div);
});

describe("handleSelectionChange", () => {
  it("reorders the modules correctly", () => {
    const wrapper = mount(<Dashboard />);
    const instance = wrapper.instance();
    const orderVolumeEvent = {
      target: {
        value: "Order Volume",
      },
    };
    const supplierRankingEvent = {
      target: {
        value: "Supplier Ranking",
      },
    };
    const incomingDeliveriesEvent = {
      target: {
        value: "Incoming Deliveries",
      },
    };
    
    instance.handleSelectionChange(orderVolumeEvent, 0);
    instance.handleSelectionChange(supplierRankingEvent, 3);
    instance.handleSelectionChange(incomingDeliveriesEvent, 2);

    expect(wrapper.state("modules")).toEqual([
      {
        module: OrderVolume,
        title: "Order Volume",
      },
      {
        module: OrderVolume,
        title: "Order Volume",
      },
      {
        module: IncomingDeliveries,
        title: "Incoming Deliveries",
      },
      {
        module: SupplierRanking,
        title: "Supplier Ranking",
      },
    ]);
  });
});
