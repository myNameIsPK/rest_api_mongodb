const express = require("express");
const router = express.Router();
const Todo = require('../models/todo');

//GET
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({}); // find all, no condition.
        res.render("todos/index", { todos });
    } catch (error) {
        res.send(error);
    }
});

router.get("/active", async (req, res) => {
    try {
        const todos = await Todo.find({ completed: false }); // find all, no condition.
        res.render("todos/index", { todos });
    } catch (error) {
        res.send(error);
    }
});

router.get("/completed", async (req, res) => {
    try {
        const todos = await Todo.find({ completed: true }); // find all, no condition.
        res.render("todos/index", { todos });
    } catch (error) {
        res.send(error);
    }
});

//POST
router.post("/", async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    try {
        const newtodo = await todo.save();
        res.redirect('todos');
    } catch (error) {
        res.send(error);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndRemove(req.params.id).exec();
        res.redirect('../todos');
    } catch (error) {
        res.send(error);
    }
});

//PUT
router.put("/:id", async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        todo.completed = !todo.completed;
        todo.save();
        res.redirect('../todos');
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;