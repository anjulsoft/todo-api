const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users')

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({
                error: true,
                statusCode: 400,
                message: 'Email in use',
                data: []
            })
        }
        user = await User.create({
            name,
            email,
            password,
            role
        });
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
        res.status(201).send({
            error: false,
            statusCode: 201,
            message: 'User created successfully',
            data: user,
            token
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: error.message,
            data: []
        })
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                error: true,
                statusCode: 400,
                message: 'Please provide an email and password',
                data: []
            })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Invalid credentials',
                data: []
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Invalid credentials',
                data: []
            })
        }
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
        res.status(201).send({
            error: false,
            statusCode: 201,
            message: 'User logged in successfully',
            data: user,
            token
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: error.message,
            data: []
        })
    }
}