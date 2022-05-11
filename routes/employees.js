const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var {getEmployees, insertEmployee, updateEmployee, deleteEmployee, getEmployeeCustomers} = require('../database/EmployeesDB')

// var config = require('./config');

// var connection = mysql.createConnection(config);

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected to mysql...')
// })

const employeesRouter = express.Router();

employeesRouter.use(bodyParser.json());



employeesRouter.route('/')
.get((req,res,next) => {
    getEmployees()
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {

    insertEmployee(req.body)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})

employeesRouter.route('/:empid')
.get((req,res,next) => {

    getEmployees(parseInt(req.params.empid))
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {

    res.end('Not supported');
})
.put((req,res,next) => {

    updateEmployee(req.body, req.params.empid)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {

    deleteEmployee(req.params.empid)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})


employeesRouter.route('/:empid/customers')
.get((req,res,next) => {

    getEmployeeCustomers(parseInt(req.params.empid))
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = employeesRouter;
