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
const responseModel_1 = require("../helper/responseModel");
const Model_1 = require("../models/Model");
class GroupService {
    static createGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newGroup = new Model_1.groupModel(req.body);
                yield newGroup.save();
                return responseModel_1.ResponseModel.getValidResponse(newGroup);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static updateGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let group = yield Model_1.groupModel.findByIdAndUpdate(req.params.Id, req.body).exec();
                return responseModel_1.ResponseModel.getValidResponse(group);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getAllGroups(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allgroups = yield Model_1.groupModel.find().exec();
                return responseModel_1.ResponseModel.getValidResponse(allgroups);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
}
exports.GroupService = GroupService;
