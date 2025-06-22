const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
});

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);
