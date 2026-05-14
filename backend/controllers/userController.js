import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id); 

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar
            });
        } else {
            res.status(401).json({ message: 'Email or Password is not valid' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'An account has been created with this email before' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password, 
        });

        if (user) {
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password; 
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                avatar: updatedUser.avatar,
            });
        } else {
            res.status(404).json({ message: 'Could not find user.' });
        }
    } catch (error) {
        console.error("PROFILE UPDATE ERROR:", error); 
        
        res.status(500).json({ message: 'Could not update the profile.', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Could not load the user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.isAdmin) {
                res.status(400).json({ message: 'Can not delete an Admin!' });
                return;
            }
            await User.deleteOne({ _id: user._id });
            res.status(200).json({ message: 'Delete the user' });
        } else {
            res.status(404).json({ message: 'Could not find the user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Could not delete', error: error.message });
    }
};