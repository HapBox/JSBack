const {Router} = require('express');
const ToDo = require('../dataBase/models/ToDo.model');

const router = new Router();

function initRoutes() {
    router.get('/', getAll);
    router.get('/:id', getById);
    router.post('/', createTodo);
    router.patch('/:id', patchTodo);
    router.delete('/', deleteAll);
    router.delete('/:id', deleteById);
}

async function getAll(req, res, next) {
    let todos = await ToDo.findAll();
    res.status(200).json(todos);
}

async function getById(req, res, next) {
    let todo = await ToDo.findByPk(req.params.id);
    if (!todo) res.status(200).json({message: "Not found"});
    else res.status(200).json(todo);
}

async function createTodo(req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    ToDo.create({ title: title, description: description});
    res.status(200).json({Info: "Created"});
}

async function patchTodo(req, res, next) {
    let doc = {};
    title = req.body.title;
    description = req.body.description;

    if (title) doc.title = title;
    if (description) doc.description = description;

    await ToDo.update(doc, {
        where: {
            id: req.params.id
        }
    })
    let updated = await ToDo.findByPk(req.params.id);
    res.status(200).json({message: "Updated", updated: updated});
}

async function deleteAll(req, res, next) {
    await ToDo.destroy({
        truncate: true,
        restartIdentity: true});
    res.status(200).json({message: "Deleted all todos"});
}

async function deleteById(req, res, next) {
    await ToDo.destroy({
        where:{
            id: req.params.id
        }
    });
    res.status(200).json({message: "deleted"});
}

initRoutes();

module.exports = router;