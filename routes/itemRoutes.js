const Item = require('./models/Item');

// CREATE
app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.json(saved);
});

// READ ALL
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// UPDATE
app.put('/api/items/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
