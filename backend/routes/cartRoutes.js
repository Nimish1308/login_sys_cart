const express = require('express');

const cartController=require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Add product to user's cart
router.route('/add').post(auth,cartController.addProduct);

// Get user's cart
router.route(`/getall`).get(auth,cartController.getUserCart);

// Delete product from user's cart
router.route('/delete/:id').delete(auth,cartController.deleteProduct);

//increase product quantity
router.route('/increase/:id').put(auth, cartController.increaseProductQuantity);

// Decrease product quantity
router.route('/decrease/:id').put(auth, cartController.decreaseProductQuantity);

module.exports = router;
