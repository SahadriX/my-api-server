// tests/unit/itemController.mock.test.js
const Item = require('../../models/Item');

// ✅ Auto-mock the entire Item model
jest.mock('../../models/Item');

describe('Item Controller Logic with Mocks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a fake list of items', async () => {
    const mockItems = [
      { name: 'Mouse', price: 300, inStock: true },
      { name: 'Monitor', price: 15000, inStock: false }
    ];

    Item.find.mockResolvedValue(mockItems);

    const result = await Item.find();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Mouse');
    expect(result[1].price).toBe(15000);
  });

  it('should simulate a findById call', async () => {
    const mockItem = { name: 'Laptop', price: 50000, inStock: true };

    Item.findById.mockResolvedValue(mockItem);

    const result = await Item.findById('fake-id');

    expect(result.name).toBe('Laptop');
    expect(result.inStock).toBe(true);
  });

  it('should simulate an error thrown by find()', async () => {
    Item.find.mockRejectedValue(new Error("DB error"));

    await expect(Item.find()).rejects.toThrow("DB error");
  });
});
