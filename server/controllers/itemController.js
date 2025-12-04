const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Private
const getItems = async (req, res) => {
    try {
        const items = await Item.find({ user: req.user._id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please add a title' });
    }

    try {
        const item = await Item.create({
            title,
            description,
            user: req.user._id,
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the item user
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the item user
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await item.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getItems,
    createItem,
    updateItem,
    deleteItem,
};
