import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'Empty cart!' });
            return;
        } else {
            const formattedOrderItems = orderItems.map((item) => ({
                ...item,
                product: item._id, 
                _id: undefined, 
            }));

            const order = new Order({
                orderItems: formattedOrderItems,
                user: req.user._id, 
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not save the order', error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Could not find order' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Could not load the orders', error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Could not load the orders', error: error.message });
    }
};

export const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            if (order.paymentMethod === 'Cash on Delivery') {
                order.isPaid = true;
                order.paidAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order did not find' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not update the order', error: error.message });
    }
};

export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Could not find the order' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not update the payment', error: error.message });
    }
};

export const expireOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        if (order.user.toString() !== req.user._id.toString()) {
            res.status(403).json({ message: 'Not authorized to modify this order' });
            return;
        }

        if (order.isPaid) {
            res.status(400).json({ message: 'Paid orders cannot be expired' });
            return;
        }

        if (order.paymentMethod === 'Cash on Delivery') {
            res.status(400).json({ message: 'Cash on Delivery orders cannot be expired' });
            return;
        }

        const updatedItems = [];
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                updatedItems.push({
                    _id: product._id.toString(),
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    countInStock: product.countInStock,
                    qty: item.qty,
                });
            } else {
                updatedItems.push({
                    _id: item.product.toString(),
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    countInStock: 0,
                    qty: item.qty,
                });
            }
        }

        await Order.deleteOne({ _id: order._id });

        res.status(200).json({
            message: 'Order expired successfully',
            items: updatedItems,
        });
    } catch (error) {
        res.status(500).json({ message: 'Could not expire the order', error: error.message });
    }
};
