console.log("📣 server.js from DESKTOP loaded");

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());

// ✅ Serve static frontend from 'public' folder
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

// Mongoose model
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
}));

// ROUTES

// ✅ Create item
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get('/ping', (req, res) => {
  console.log("✅ /ping route hit");
  res.send('pong');
});

// Optional debug route
app.get('/debug', (req, res) => {
  res.send('🧪 Debug route working');
});

// ❌ REMOVE duplicate root handler if using frontend
// Comment or delete these two:



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
