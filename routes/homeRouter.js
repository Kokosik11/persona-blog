const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get('/contacts', homeController.contacts);
homeRouter.get('/', homeController.main);
    
module.exports = homeRouter;