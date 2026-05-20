import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const pageSize = 4; 
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        } : {};

        const category = req.query.category ? {
            category: req.query.category
        } : {};

        const filter = { ...keyword, ...category };

        const count = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Could not load the products', error: error.message });
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

export const createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400).json({ message: 'Already you reviewed this product' });
                return;
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Successfully added your review' });
        } else {
            res.status(404).json({ message: 'Could not find product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not save the review', error: error.message });
    }
};


export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Could not load top products ', error: error.message });
    }
};


export const getProductCategories = async (req, res) => {
    try {
        const categories = await Product.find().distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Could not load the categories', error: error.message });
    }
};