const express = require('express');

const driverRouter = require('./driverRouter');
const binRouter = require('./binRouter');
const vehicleRouter = require('./vehicleRouter');
const binStateLogRouter = require('./binStateLogRouter');
const vehicleStateLogRouter = require('./vehicleStateLogRouter');
const pathRouter = require('./pathRouter');
const taskRouter = require('./taskRouter');

let v1Router = express.Router();

v1Router.use('/drivers', driverRouter);
v1Router.use('/bins/states', binStateLogRouter);
v1Router.use('/bins', binRouter);
v1Router.use('/vehicles/states', vehicleStateLogRouter);
v1Router.use('/vehicles', vehicleRouter);
v1Router.use('/paths', pathRouter);
v1Router.use('/tasks', taskRouter);

module.exports = v1Router;
