const auth = require('../middlewares/auth')
const express = require('express');
const router = express.Router()
const { createTodo, getTodos, getTodo, deleteTodo,updateTodo } = require('../controllers/todos')

router.post('/createTodo', auth, createTodo)
router.get('/getTodos', auth, getTodos)
router.get('/getTodo', auth, getTodo)
router.delete("/deleteTodo", auth, deleteTodo)
router.patch('/updateTodo', auth, updateTodo)

module.exports = router;
