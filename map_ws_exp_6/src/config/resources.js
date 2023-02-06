const express = require('express');

let configResources = (app) => {
    app.use(express.static('./public'));
};

module.exports = configResources;
