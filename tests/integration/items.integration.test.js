const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Item = require('../../models/Item');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("can create and find item in test DB", async () => {
  const item = await Item.create({ name: "Chair", price: 500, inStock: true });
  const found = await Item.findById(item._id);
  expect(found.name).toBe("Chair");
});
