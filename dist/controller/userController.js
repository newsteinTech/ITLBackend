"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
class UserController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //let permission= await Authenticate.authorize(req, res, next, Actiontype.createUser);
            let result = yield userService_1.UserService.createUser(req);
            res.send(result);
            //once user is created, admin should send userid and password details to the coressponding user via email
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let permission= await Authenticate.authorize(req, res, next, Actiontype.updateUser);
            let result = yield userService_1.UserService.updateUser(req);
            res.send(result);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //  let permission= await Authenticate.authorize(req, res, next, Actiontype.deleteUser);
            let result = yield userService_1.UserService.deleteUser(req);
            res.send(result);
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllUsers);
            let result = yield userService_1.UserService.getAllUsers(req);
            res.send(result);
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield userService_1.UserService.userLogin(req);
            res.send(result);
        });
    }
}
exports.UserController = UserController;
