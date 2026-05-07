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