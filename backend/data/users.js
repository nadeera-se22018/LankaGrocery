import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Kasun Nadeera', 
        email: 'admin@lankagrocery.com',
        password: bcrypt.hashSync('123456', 10), 
        isAdmin: true,
    },
    {
        name: 'Normal Customer',
        email: 'customer@lankagrocery.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;