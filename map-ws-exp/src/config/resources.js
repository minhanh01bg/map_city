const express = require('express');

let configResources = (app) => {
    app.use(express.static('./uploads'));
};

module.exports = configResources;
