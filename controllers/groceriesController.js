const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name, quantity, inCart: true });
  const saved = await newItem.save();

  const io = req.app.get('io');
  io.emit('item-added', saved);

  res.status(201).json(saved);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });

  const io = req.app.get('io');
  io.emit('item-updated', updatedItem);

  res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);

  const io = req.app.get('io');
  io.emit('item-deleted', deletedItem);

  res.json({ success: true });
};
