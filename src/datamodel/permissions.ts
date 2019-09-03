import { Actiontype } from "./actionType";

export const rolePermissions = {
    "Admin":{
            "Permissions":[
                Actiontype.createUser,
                Actiontype.updateUser,
                Actiontype.deleteUser,
                Actiontype.getAllUsers,
                Actiontype.createIncident,
                Actiontype.getAllIncidents,
                Actiontype.updateIncident,
                Actiontype.getIncidentByAssignedTo,
                Actiontype.getIncidentCountByGroup
            ] 
    },
    
    "ITILAdmin":{
            "Permissions":[
                Actiontype.getAllUsers,
                Actiontype.createIncident,
                Actiontype.getAllIncidents,
                Actiontype.updateIncident,
                Actiontype.getIncidentByAssignedTo,
                Actiontype.getIncidentCountByGroup
            ]
    },
    
    "Manager":{
            "Permissions":[
                Actiontype.getAllUsers,
                Actiontype.createIncident,
                Actiontype.getAllIncidents,
                Actiontype.updateIncident,
                Actiontype.getIncidentByAssignedTo,
                Actiontype.getIncidentCountByGroup
            ]

    },

    "CSReps":{
            "Permissions":[
                Actiontype.createIncident,
                Actiontype.updateIncident,
                Actiontype.getAllIncidents,
                Actiontype.getIncidentByAssignedTo,
                Actiontype.getIncidentCountByGroup
            ]
    }

}     