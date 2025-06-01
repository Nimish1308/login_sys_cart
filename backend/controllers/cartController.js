const User = require('../models/User');

const addProduct = async (req, res) => {
    const { productId, image, title, price } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const existingItem = user.cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if product already exists in cart
             user.markModified('cart'); // Add this line
        } else {
            user.cart.push({ productId, title, image, price, quantity: 1 });
        }

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
}

// get user cart
const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

//Delete Product from cart
const deleteProduct = async (req, res) => {
    const productId = req.params.id; // <-- get from params     
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.productId !== productId);
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}


// Increase product quantity in cart
const increaseProductQuantity = async (req, res) => {
    const productId = req.params.id; // <-- get from params
    try {
        const user = await User.findById(req.user.id);
        const item = user.cart.find(item => item.productId === productId);
        if (item) {
            item.quantity += 1;
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

// Decrease product quantity in cart
const decreaseProductQuantity = async (req, res) => {
    const productId = req.params.id; // <-- get from params
    try {
        const user = await User.findById(req.user.id);
        const item = user.cart.find(item => item.productId === productId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                user.cart = user.cart.filter(item => item.productId !== productId); // Remove item if quantity is 0
            }
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}
module.exports = { addProduct, getUserCart, deleteProduct, increaseProductQuantity, decreaseProductQuantity };