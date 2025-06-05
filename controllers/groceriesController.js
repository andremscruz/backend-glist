const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newItem = new Item({
      name,
      quantity: quantity ?? 1,
      inCart: false            
    });

    const saved = await newItem.save();

    const io = req.app.get('io');
    io.emit('item-added', saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error('Erro ao criar item:', err);
    res.status(500).json({ message: 'Erro ao criar item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, inCart } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, quantity, inCart },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    const io = req.app.get('io');
    io.emit('item-updated', updatedItem);

    res.json(updatedItem);
  } catch (err) {
    console.error('Erro ao atualizar item:', err);
    res.status(500).json({ message: 'Erro ao atualizar item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);

  const io = req.app.get('io');
  io.emit('item-deleted', deletedItem);

  res.json({ success: true });
};
