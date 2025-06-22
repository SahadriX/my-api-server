const mongoose = require('mongoose');
const Item = require('../../models/Item');

describe("Item Model Unit Test", () => {
  it("should create a new item", () => {
    const item = new Item({
      name: "Test Item",
      price: 100,
      inStock: true
    });

    expect(item.name).toBe("Test Item");
    expect(item.price).toBe(100);
    expect(item.inStock).toBe(true);
  });
});
