// Return an array of available suppliers from a list of orders
export const getSuppliers = (orderData) => {
  const suppliers = [];
  orderData.forEach((order) => {
    if (!suppliers.includes(order.supplier)) {
      suppliers.push(order.supplier);
    }
  });
  return suppliers;
};

// Return an array of orders for a specific supplier
export const getOrdersForSupplier = (selectedSupplier, orderData) => {
  const orders = [];
  orderData.forEach((order) => {
    if (order.supplier === selectedSupplier) {
      orders.push(order);
    }
  });
  return orders;
};

// Return an array of delivery dates based on the order data
export const getDeliveryDatesForSupplier = (selectedSupplier, orderData) => {
  const deliveryDates = [];
  orderData.forEach((order) => {
    if (
      !deliveryDates.includes(order.deliveryDate) &&
      order.supplier === selectedSupplier
    ) {
      deliveryDates.push(order.deliveryDate);
    }
  });
  return deliveryDates;
};

// Return a list of products with price and quantity values totalled for each unique product
export const getProductTotalsFromOrders = (orderData) => {
    const products = [];
    orderData.forEach((order) => {
      const existingProduct = products.find(
        (product) => product.id === order.productId
      );
      if (!existingProduct) {
        const newProduct = {
          id: order.productId,
          name: order.productName,
          totalPrice: parseFloat(order.price),
          totalQuantity: parseFloat(order.quantity),
        };
        products.push(newProduct);
      } else {
        existingProduct.totalPrice =
          existingProduct.totalPrice + parseFloat(order.price);
        existingProduct.totalQuantity =
          existingProduct.totalQuantity + parseFloat(order.quantity);
      }
    });
    return products;
  }

 // Sort orders by a given value
 export const sortByValue = (items, sortValue) => {
    const sortedProducts = items
      .sort(function (a, b) {
        return parseFloat(a[sortValue]) - parseFloat(b[sortValue]);
      })
      .reverse();

    return sortedProducts;
  }
