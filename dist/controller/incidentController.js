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
const incidentService_1 = require("../services/incidentService");
class IncidentController {
    createIncident(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.createIncident(req);
            res.send(result);
        });
    }
    updateIncident(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.updateIncident(req);
            res.send(result);
        });
    }
    getAllIncidents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllIncidents);
    
            if(permission==true){ */
            let result = yield incidentService_1.IncidentService.getAllIncidents(req);
            res.send(result);
            /*  }
             else{
                 res.send("You don't have the right permissions")
             } */
        });
    }
    getLastIncident(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.getLastIncident(req);
            res.send(result);
        });
    }
    getIncidentCountByGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.getIncidentCountByGroup(req);
            res.send(result);
        });
    }
    getIncidentByAssignedTo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.getIncidentByAssignedTo(req);
            res.send(result);
        });
    }
    pagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield incidentService_1.IncidentService.pagination(req);
            res.send(result);
        });
    }
}
exports.IncidentController = IncidentController;
