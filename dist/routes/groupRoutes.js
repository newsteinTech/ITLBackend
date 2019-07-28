"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupController_1 = require("../controller/groupController");
exports.groupRoutes = express_1.Router();
exports.groupControllerObj = new groupController_1.GroupController();
exports.groupRoutes.post('/create', exports.groupControllerObj.createGroup);
exports.groupRoutes.put('/update/:Id', exports.groupControllerObj.updateGroup);
exports.groupRoutes.get('/getAllGroups', exports.groupControllerObj.getAllGroups);
