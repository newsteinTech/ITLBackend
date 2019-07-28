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
                Actiontype.updateIncident
            ] 
    },
    
    "ITILAdmin":{
            "Permissions":[
                Actiontype.getAllUsers,
                Actiontype.createIncident,
                Actiontype.getAllIncidents,
                Actiontype.updateIncident
            ]
    },
    
    "Manager":{
            "Permissions":[
                Actiontype.getAllUsers,
                Actiontype.createIncident,
                Actiontype.getAllIncidents
            ]

    },

    "CSReps":{
            "Permissions":[
                Actiontype.createIncident,
                Actiontype.getAllIncidents
            ]
    }

}     