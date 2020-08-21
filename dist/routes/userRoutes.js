"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
exports.userRoutes = express_1.Router();
exports.userControllerObj = new userController_1.UserController();
exports.userRoutes.post('/createUser', exports.userControllerObj.createUser);
exports.userRoutes.post('/login', exports.userControllerObj.userLogin);
exports.userRoutes.put('/updateUser', exports.userControllerObj.updateUser); //normal user can update only his own details through his dashboard
exports.userRoutes.put('/deleteUser', exports.userControllerObj.deleteUser);
exports.userRoutes.get('/getAllUsers', exports.userControllerObj.getAllUsers);
exports.userRoutes.post('/getUserByUserId', exports.userControllerObj.getUserByUserId);
exports.userRoutes.get('/getLastUser', exports.userControllerObj.getLastUser);
exports.userRoutes.post('/paginate', exports.userControllerObj.pagination);
