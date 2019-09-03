"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actiontype;
(function (Actiontype) {
    Actiontype[Actiontype["createUser"] = 0] = "createUser";
    Actiontype[Actiontype["updateUser"] = 1] = "updateUser";
    Actiontype[Actiontype["deleteUser"] = 2] = "deleteUser";
    Actiontype[Actiontype["getAllUsers"] = 3] = "getAllUsers";
    Actiontype[Actiontype["createIncident"] = 4] = "createIncident";
    Actiontype[Actiontype["getAllIncidents"] = 5] = "getAllIncidents";
    Actiontype[Actiontype["getIncidentCountByGroup"] = 6] = "getIncidentCountByGroup";
    Actiontype[Actiontype["getIncidentByAssignedTo"] = 7] = "getIncidentByAssignedTo";
    Actiontype[Actiontype["updateIncident"] = 8] = "updateIncident";
})(Actiontype = exports.Actiontype || (exports.Actiontype = {}));
