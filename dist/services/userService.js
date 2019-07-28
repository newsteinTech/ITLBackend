"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseModel_1 = require("../helper/responseModel");
const Model_1 = require("../models/Model");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class UserService {
    static createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hashPassword = yield bcrypt.hash(req.body.Password, 12);
                req.body.Password = hashPassword;
                //to map the groupId from front end to the objectId of the group before creating the user in the db
                //so that the objectId of groups get added into the User's Group field instead of GroupId
                if (req.body.Group) {
                    for (let i = 0; i < req.body.Group.length; i++) {
                        let group = yield Model_1.groupModel.findOne({ 'GroupId': req.body.Group[i] }).exec();
                        req.body.Group[i] = group._id;
                        console.log(req.body.Group[i]);
                    }
                }
                let newUser = new Model_1.userModel(req.body);
                yield newUser.save();
                if (newUser.Group) {
                    for (let i = 0; i < newUser.Group.length; i++) {
                        let group = yield Model_1.groupModel.findOne({ '_id': newUser.Group[i] }).exec();
                        yield group.GroupMembers.push(newUser._id);
                        yield group.save();
                    }
                }
                return responseModel_1.ResponseModel.getValidResponse(newUser);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static userLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if user exists or not
                let user = yield Model_1.userModel.findOne({ 'Email': req.body.Email }).exec();
                if (user) {
                    //check for pwd match
                    let IspasswordMatch = yield bcrypt.compare(req.body.Password, user.Password);
                    // user.password is the encrypted pwd stored in db, req.body.password is the text password in post call
                    if (IspasswordMatch) {
                        //login success, then generate access token
                        let signingOption = { expiresIn: "12h" }; //12 hours
                        let secret = "secret"; // secret is the key used for encrypting the payload
                        let payload = { 'Email': user.email, 'Name': user.Name, 'Role': user.Role, 'UserId': user.UserId }; // user data to be sent in the token
                        let accessToken = yield jwt.sign(payload, secret, signingOption);
                        return ({ 'accessToken': accessToken });
                    }
                    else {
                        return ("Wrong Password");
                    }
                }
                else {
                    return ("user does not exist");
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //to map the groupId from front end to the objectId of the group before updating the user in the db
                //so that the objectId of groups get added into the User's Group field instead of GroupId
                for (let i = 0; i < req.body.Group.length; i++) {
                    let group = yield Model_1.groupModel.findOne({ 'GroupId': req.body.Group[i] }).exec();
                    req.body.Group[i] = group._id;
                    console.log(req.body.Group[i]);
                }
                let a = yield Model_1.userModel.findOneAndUpdate({ 'UserId': req.body.UserId }, req.body).exec();
                return responseModel_1.ResponseModel.getValidResponse(a);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let a = yield Model_1.userModel.findOneAndUpdate({ 'UserId': req.body.UserId }, { 'Active': false }).exec();
                return responseModel_1.ResponseModel.getValidResponse(a);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getAllUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allusers = yield Model_1.userModel.find({ 'Active': true }).exec();
                return responseModel_1.ResponseModel.getValidResponse(allusers);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
}
exports.UserService = UserService;
