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
                let newUser = new Model_1.userModel(req.body);
                yield newUser.save();
                //add objectid of the new user to GroupMembers field of groupdetail table
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
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if user exists or not
                console.log(req.body.UserId);
                let user = yield Model_1.userModel.findOne({ 'UserId': req.body.UserId }).exec();
                if (user) {
                    //check for pwd match
                    let IspasswordMatch = yield bcrypt.compare(req.body.Password, user.Password);
                    // user.password is the encrypted pwd stored in db, req.body.password is the text password in post call
                    if (IspasswordMatch) {
                        //login success, then generate access token
                        let signingOption = { expiresIn: "12h" }; //12 hours
                        let secret = "secret"; // secret is the key used for encrypting the payload
                        let payload = { 'Email': user.Email, 'Name': user.Name, 'Role': user.Role, 'UserId': user.UserId }; // user data to be sent in the token
                        let accessToken = yield jwt.sign(payload, secret, signingOption);
                        console.log(accessToken);
                        return responseModel_1.ResponseModel.getValidResponse({ "accessToken": accessToken });
                    }
                    else {
                        return res.status(401).send("Wrong Password");
                    }
                }
                else {
                    return res.status(401).send("user does not exist");
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
                req.body.UpdateDate = Date.now();
                console.log(req.body);
                let updatedUser = yield Model_1.userModel.findOneAndUpdate({ 'UserId': req.body.UserId }, req.body).exec();
                //await updatedUser.save();
                console.log(updatedUser); // showing previous data of user, not the updated one
                //add user's objectid to groupdetail table in all relevant groups
                for (let i = 0; i < req.body.Group.length; i++) {
                    console.log(req.body.Group[i]);
                    let group = yield Model_1.groupModel.findOne({ '_id': req.body.Group[i] }).exec();
                    //check if user already exists in group
                    for (var j = 0; j < group.GroupMembers.length; j++) {
                        if (req.body._id == group.GroupMembers[j]) {
                            console.log("user already exists in this group");
                            break;
                        }
                    }
                    console.log(j);
                    //if user is not already added in that group, it will reach the end of above for loop
                    if (j == group.GroupMembers.length) {
                        console.log("adding to group");
                        yield group.GroupMembers.push(req.body._id);
                        yield group.save();
                    }
                }
                //add code to remove user from old group if it's not in the user's updated group
                return responseModel_1.ResponseModel.getValidResponse(updatedUser);
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
                let allusers = yield Model_1.userModel.find({ 'Active': true }).populate("Group").exec();
                return responseModel_1.ResponseModel.getValidResponse(allusers);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getUserByUserId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield Model_1.userModel.find({ 'UserId': req.body.UserId }).populate("Group").exec();
                return responseModel_1.ResponseModel.getValidResponse(user);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getLastUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get last incident by sorting according to created date in descending order
                let user = yield Model_1.userModel.findOne({}).sort({ CreatedDate: -1 }).limit(1);
                console.log(user);
                return responseModel_1.ResponseModel.getValidResponse(user);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static pagination(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pageNumber = req.body.Page;
                let pageSize = req.body.PageSize;
                let recordsSent = yield Model_1.userModel.find({ "Active": true }).skip((pageNumber - 1) * pageSize).limit(pageSize);
                return responseModel_1.ResponseModel.getValidResponse(recordsSent);
            }
            catch (err) {
                return responseModel_1.ResponseModel.getInvalidResponse(err);
            }
        });
    }
}
exports.UserService = UserService;
