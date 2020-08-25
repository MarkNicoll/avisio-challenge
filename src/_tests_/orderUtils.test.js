import {
  getSuppliers,
  getOrdersForSupplier,
  getDeliveryDatesForSupplier,
  getProductTotalsFromOrders,
  sortByValue,
} from "../app/utils/orderUtils";

test("Returns an array of suppliers", () => {
  expect(
    getSuppliers([
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "50.1",
        quantity: "2",
        deliveryDate: "02/04/2020",
      },
      {
        supplier: "Allstuff supplies",
        productId: "781",
        productName: "soap",
        productCategory1: "supplies",
        productCategory2: "guest supplies",
        orderedOn: "02/02/2020",
        price: "0.33",
        quantity: "60",
        deliveryDate: "02/04/2020",
      },
    ])
  ).toEqual(["Booz drinks", "Allstuff supplies"]);
});

test("Returns an array orders for a specific supplier", () => {
  expect(
    getOrdersForSupplier("Booz drinks", [
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "50.1",
        quantity: "2",
        deliveryDate: "02/04/2020",
      },
      {
        supplier: "Allstuff supplies",
        productId: "781",
        productName: "soap",
        productCategory1: "supplies",
        productCategory2: "guest supplies",
        orderedOn: "02/02/2020",
        price: "0.33",
        quantity: "60",
        deliveryDate: "02/04/2020",
      },
    ])
  ).toEqual([
    {
      supplier: "Booz drinks",
      productId: "561",
      productName: "Champagne A",
      productCategory1: "beverages",
      productCategory2: "champagne",
      orderedOn: "02/02/2020",
      price: "50.1",
      quantity: "2",
      deliveryDate: "02/04/2020",
    },
  ]);
});

test("Returns aan array of delivery dates for the specified supplier", () => {
  expect(
    getDeliveryDatesForSupplier("Booz drinks", [
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "50.1",
        quantity: "2",
        deliveryDate: "02/04/2020",
      },
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "30.1",
        quantity: "6",
        deliveryDate: "03/04/2020",
      },
    ])
  ).toEqual(["02/04/2020", "03/04/2020"]);
});

test("Returns an array of products with their prices and quantities totalled", () => {
  expect(
    getProductTotalsFromOrders([
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "50.1",
        quantity: "2",
        deliveryDate: "02/04/2020",
      },
      {
        supplier: "Booz drinks",
        productId: "561",
        productName: "Champagne A",
        productCategory1: "beverages",
        productCategory2: "champagne",
        orderedOn: "02/02/2020",
        price: "30.1",
        quantity: "6",
        deliveryDate: "03/04/2020",
      },
      {
        supplier: "Allstuff supplies",
        productId: "781",
        productName: "soap",
        productCategory1: "supplies",
        productCategory2: "guest supplies",
        orderedOn: "02/02/2020",
        price: "0.33",
        quantity: "60",
        deliveryDate: "02/04/2020",
      },
    ])
  ).toEqual([
    {
      id: "561",
      name: "Champagne A",
      totalPrice: 80.2,
      totalQuantity: 8,
    },
    {
      id: "781",
      name: "soap",
      totalPrice: 0.33,
      totalQuantity: 60,
    },
  ]);
});

test("Returns an array sorted by the provided value", () => {
  expect(
    sortByValue(
      [
        {
          supplier: "Booz drinks",
          productId: "561",
          productName: "Champagne A",
          productCategory1: "beverages",
          productCategory2: "champagne",
          orderedOn: "02/02/2020",
          price: "50.1",
          quantity: "2",
          deliveryDate: "02/04/2020",
        },
        {
          supplier: "Allstuff supplies",
          productId: "781",
          productName: "soap",
          productCategory1: "supplies",
          productCategory2: "guest supplies",
          orderedOn: "02/02/2020",
          price: "0.33",
          quantity: "60",
          deliveryDate: "02/04/2020",
        },
        {
          supplier: "Booz drinks",
          productId: "561",
          productName: "Champagne A",
          productCategory1: "beverages",
          productCategory2: "champagne",
          orderedOn: "02/02/2020",
          price: "30.1",
          quantity: "6",
          deliveryDate: "03/04/2020",
        },
      ],
      "price"
    )
  ).toEqual([
    {
      supplier: "Booz drinks",
      productId: "561",
      productName: "Champagne A",
      productCategory1: "beverages",
      productCategory2: "champagne",
      orderedOn: "02/02/2020",
      price: "50.1",
      quantity: "2",
      deliveryDate: "02/04/2020",
    },
    {
      supplier: "Booz drinks",
      productId: "561",
      productName: "Champagne A",
      productCategory1: "beverages",
      productCategory2: "champagne",
      orderedOn: "02/02/2020",
      price: "30.1",
      quantity: "6",
      deliveryDate: "03/04/2020",
    },
    {
      supplier: "Allstuff supplies",
      productId: "781",
      productName: "soap",
      productCategory1: "supplies",
      productCategory2: "guest supplies",
      orderedOn: "02/02/2020",
      price: "0.33",
      quantity: "60",
      deliveryDate: "02/04/2020",
    },
  ]);
});
