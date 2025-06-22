const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Item = require('../../models/Item');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Item.deleteMany(); // Clean DB after each test
});

describe('API: /api/items', () => {
  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Notebook', price: 150, inStock: true });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Notebook');
  });

  it('should fetch all items', async () => {
    await Item.create({ name: 'Pen', price: 20, inStock: true });

    const res = await request(app).get('/api/items');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe('Pen');
  });

  it('should get item by ID', async () => {
    const item = await Item.create({ name: 'Eraser', price: 10, inStock: true });

    const res = await request(app).get(`/api/items/${item._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Eraser');
  });

  it('should update item by ID', async () => {
    const item = await Item.create({ name: 'Marker', price: 25, inStock: true });

    const res = await request(app)
      .put(`/api/items/${item._id}`)
      .send({ price: 30 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(30);
  });

  it('should delete item by ID', async () => {
    const item = await Item.create({ name: 'Scale', price: 15, inStock: true });

    const res = await request(app).delete(`/api/items/${item._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
