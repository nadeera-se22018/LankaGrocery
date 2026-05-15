import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: 'i' } }
            : {};

        const products = await Product.find({ ...keyword });
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Could not read the server error', error: error.message });
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

export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.image = image; 
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Could not find the product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not update the product', error: error.message });
    }
};