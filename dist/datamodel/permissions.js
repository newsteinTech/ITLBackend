"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionType_1 = require("./actionType");
exports.rolePermissions = {
    "Admin": {
        "Permissions": [
            actionType_1.Actiontype.createUser,
            actionType_1.Actiontype.updateUser,
            actionType_1.Actiontype.deleteUser,
            actionType_1.Actiontype.getAllUsers,
            actionType_1.Actiontype.createIncident,
            actionType_1.Actiontype.getAllIncidents,
            actionType_1.Actiontype.updateIncident,
            actionType_1.Actiontype.getIncidentByAssignedTo,
            actionType_1.Actiontype.getIncidentCountByGroup
        ]
    },
    "ITILAdmin": {
        "Permissions": [
            actionType_1.Actiontype.getAllUsers,
            actionType_1.Actiontype.createIncident,
            actionType_1.Actiontype.getAllIncidents,
            actionType_1.Actiontype.updateIncident,
            actionType_1.Actiontype.getIncidentByAssignedTo,
            actionType_1.Actiontype.getIncidentCountByGroup
        ]
    },
    "Manager": {
        "Permissions": [
            actionType_1.Actiontype.getAllUsers,
            actionType_1.Actiontype.createIncident,
            actionType_1.Actiontype.getAllIncidents,
            actionType_1.Actiontype.updateIncident,
            actionType_1.Actiontype.getIncidentByAssignedTo,
            actionType_1.Actiontype.getIncidentCountByGroup
        ]
    },
    "CSReps": {
        "Permissions": [
            actionType_1.Actiontype.createIncident,
            actionType_1.Actiontype.updateIncident,
            actionType_1.Actiontype.getAllIncidents,
            actionType_1.Actiontype.getIncidentByAssignedTo,
            actionType_1.Actiontype.getIncidentCountByGroup
        ]
    }
};
