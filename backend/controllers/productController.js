import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Could not read Server Error', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Can not find Product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error because ID format is wrong', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample Product Name',
            price: 0,
            user: req.user._id,
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
            brand: 'Sample Brand',
            category: 'Sample Category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description for the new product...',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Could not create the product', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.status(200).json({ message: 'Delete the product' });
        } else {
            res.status(404).json({ message: 'Could not find the product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error, Could not delete', error: error.message });
    }
};