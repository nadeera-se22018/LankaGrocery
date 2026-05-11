import Order from '../models/orderModel.js';

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
