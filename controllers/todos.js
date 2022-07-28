const express = require('express')
const mongoose = require('mongoose')
const Todo = require('../models/todos')
// const router = new express.Router()

exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            ...req.body,
            owner: req.user._id
        })
        res.status(201).send({
            error: false,
            statusCode: 201,
            message: 'Todo created successfully',
            data: todo
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: e.message,
            data: []
        })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user._id })
        if (todos.length === 0) {
            return res.status(404).send({
                error: true,
                statusCode: 404,
                message: 'No Todos found',
                data: []
            })
        }
        res.status(200).send({
            error: false,
            statusCode: 200,
            message: 'successfully retrieved todos',
            data: todos
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: e.message,
            data: []
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const id = req.query.id
        const owner = req.user._id

        const todo = await Todo.findOne({ id, owner })
        if (!todo) {
            return res.status(404).send({
                error: true,
                statusCode: 404,
                message: 'No Todo found',
                data: []
            })
        }
        res.status(200).send({
            error: false,
            statusCode: 200,
            message: 'successfully retrieved todo',
            data: todo
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: e.message,
            data: []
        })
    }
}


exports.updateTodo = async(req, res) => {
    const {title,description,completed} = req.body

    try {
        let todo = await Todo.findOne({ _id: req.query.id, owner: req.user._id })

        if (!todo) {
            return res.status(404).send({
                error: true,
                statusCode: 404,
                message: 'No data found',
                data: []
            })
        }
        if(title){
            todo.title = title
        }
        if(description){
            todo.description = description
        }
        if(completed){
            todo.completed = completed
        }
        todo = await todo.save()
        console.log(todo.completed)
        res.status(200).send({
            error: false,
            statusCode: 200,
            message: 'Todo updated successfully',
            data: todo
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: e.message,
            data: []
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.query.id, owner: req.user._id })

        if (!todo) {
            return res.status(404).send({
                error: true,
                statusCode: 404,
                message: 'No data found',
                data: []
            })
        }

        res.status(200).send({
            error: false,
            statusCode: 200,
            message: 'Todo deleted successfully',
            data: []
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            statusCode: 500,
            message: e.message,
            data: []
        })
    }
}
