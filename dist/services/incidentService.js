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
                req.body.UpdateDate = Date.now();
                let incident = yield Model_1.incidentModel.findOneAndUpdate({ 'IncidentNumber': req.body.IncidentNumber }, req.body).exec();
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
                let allIncidents = yield Model_1.incidentModel.find().populate("AssignmentGroup").populate("AssignedTo").exec();
                return responseModel_1.ResponseModel.getValidResponse(allIncidents);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getIncidentCountByGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let incidents = yield Model_1.incidentModel.find({}).populate("AssignmentGroup").exec();
                let countAssigned = [0, 0, 0, 0, 0];
                let countResolved = [0, 0, 0, 0, 0];
                for (let i = 0; i < incidents.length; i++) {
                    if (incidents[i].AssignmentGroup.GroupId == "GroupId1") {
                        countAssigned[0]++;
                        if (incidents[i].State == 'Resolved')
                            countResolved[0]++;
                    }
                    if (incidents[i].AssignmentGroup.GroupId == "GroupId2") {
                        countAssigned[1]++;
                        if (incidents[i].State == 'Resolved')
                            countResolved[1]++;
                    }
                    if (incidents[i].AssignmentGroup.GroupId == "GroupId3") {
                        countAssigned[2]++;
                        if (incidents[i].State == 'Resolved')
                            countResolved[2]++;
                    }
                    if (incidents[i].AssignmentGroup.GroupId == "GroupId4") {
                        countAssigned[3]++;
                        if (incidents[i].State == 'Resolved')
                            countResolved[3]++;
                    }
                    if (incidents[i].AssignmentGroup.GroupId == "GroupId5") {
                        countAssigned[4]++;
                        if (incidents[i].State == 'Resolved')
                            countResolved[4]++;
                    }
                }
                return responseModel_1.ResponseModel.getValidResponse([{ "data": countAssigned }, { "data": countResolved }]);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getIncidentByAssignedTo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let incidents = yield Model_1.incidentModel.find({ 'AssignedTo': req.user._id }).populate('AssignmentGroup').populate('AssignedTo').exec();
                return responseModel_1.ResponseModel.getValidResponse(incidents);
            }
            catch (e) {
                console.log(e);
                return responseModel_1.ResponseModel.getInvalidResponse(e);
            }
        });
    }
    static getLastIncident(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get last incident by sorting according to created date in descending order
                let incident = yield Model_1.incidentModel.findOne({}).sort({ CreatedDate: -1 }).limit(1);
                console.log(incident);
                return responseModel_1.ResponseModel.getValidResponse(incident);
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
                let pageSize = parseInt(req.body.PageSize); // using parseInt to avoid mongoerror -"limit must be a number"
                //console.log(pageSize)
                let recordsSent = yield Model_1.incidentModel.find().populate("AssignmentGroup").populate("AssignedTo").skip((pageNumber - 1) * pageSize).limit(pageSize);
                return responseModel_1.ResponseModel.getValidResponse(recordsSent);
            }
            catch (err) {
                return responseModel_1.ResponseModel.getInvalidResponse(err);
            }
        });
    }
}
exports.IncidentService = IncidentService;
