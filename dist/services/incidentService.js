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
class IncidentService {
    static createIncident(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newIncident = new Model_1.incidentModel(req.body);
                yield newIncident.save();
                return responseModel_1.ResponseModel.getValidResponse(newIncident);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static updateIncident(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let incident = yield Model_1.incidentModel.findByIdAndUpdate(req.params.Id, req.body).exec();
                return responseModel_1.ResponseModel.getValidResponse(incident);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getAllIncidents(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allIncidents = yield Model_1.incidentModel.find().exec();
                return responseModel_1.ResponseModel.getValidResponse(allIncidents);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getIncidentByGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let incidents = yield Model_1.incidentModel.find({ 'Assignment Group': req.body.group }).exec();
                return responseModel_1.ResponseModel.getValidResponse(incidents);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
}
exports.IncidentService = IncidentService;
