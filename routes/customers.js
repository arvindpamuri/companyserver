const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var {getCustomer, insertCustomer, updateCustomer, deleteCustomer, getCustomerEmployee} = require('../database/CustomerDB')

const CustomerRouter = express.Router();

CustomerRouter.use(bodyParser.json());



CustomerRouter.route('/')
.get((req,res,next) => {
    getCustomer()
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {

    insertCustomer(req.body)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})

CustomerRouter.route('/:custid')
.get((req,res,next) => {

    getCustomer(parseInt(req.params.custid))
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

    updateCustomer(req.body, req.params.custid)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {

    deleteCustomer(req.params.custid)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})

CustomerRouter.route('/:id/employees')
.get((req,res,next) => {

    getCustomerEmployee(parseInt(req.params.id))
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log("rows in get:",result)
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = CustomerRouter;
