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
const authentication_1 = require("../middleware/authentication");
const actionType_1 = require("../datamodel/actionType");
class UserController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* let permission= await Authenticate.authorize(req, res, next, Actiontype.createUser);
            
            if(permission==true){
             */ let result = yield userService_1.UserService.createUser(req);
            res.send(result);
            /* }
            else{
                res.send("You don't have the right permissions")
            } */
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
            let permission = yield authentication_1.Authenticate.authorize(req, res, next, actionType_1.Actiontype.deleteUser);
            if (permission == true) {
                let result = yield userService_1.UserService.deleteUser(req);
                res.send(result);
            }
            else {
                res.send("You don't have the right permissions");
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                    let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllUsers);
                   
                    if(permission==true){  */
            let result = yield userService_1.UserService.getAllUsers(req);
            res.send(result);
            /*   }
              else{
                  res.send("You don't have the right permissions")
              } */
        });
    }
    getUserByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield userService_1.UserService.getUserByUserId(req);
            res.send(result);
        });
    }
    getLastUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield userService_1.UserService.getLastUser(req);
            res.send(result);
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield userService_1.UserService.userLogin(req, res);
            res.send(result);
        });
    }
    pagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield userService_1.UserService.pagination(req);
            res.send(result);
        });
    }
}
exports.UserController = UserController;
