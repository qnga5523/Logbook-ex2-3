const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');

router.get('/', TaskController.getTasks);
router.post('/',TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask)

module.exports = router;