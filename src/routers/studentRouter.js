'use strict';

const express = require('express');
const path = require('path');
const studentController = require(path.join(__dirname, '../controllers/studentController.js'));

const studentRouter = express.Router();

studentRouter.get('/list', studentController.getStudentListPage);
studentRouter.get('/add', studentController.getAddStudentPage);
studentRouter.post('/add', studentController.AddStudent);
studentRouter.get('/edit/:studentId', studentController.getEditStudentPage);
studentRouter.post('/edit/:studentId', studentController.editStudent);
studentRouter.get('/del/:studentId', studentController.delStudent);

module.exports = studentRouter;