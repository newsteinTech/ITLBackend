import { ActionType } from "./Action";

export const RolePermission = {

    "Incident":{

        "Admin":{
            Permission:[
    
                ActionType.create,
                ActionType.get,
                ActionType.delete,
                ActionType.update
            
            ]
        },
        "ITIL Admin":{
    
            Permission:[
    
                ActionType.create,
                ActionType.get,
                ActionType.delete,
                ActionType.update
            
            ]
    
        },
        "CS Reps":{
    
            Permission:[
    
                ActionType.create
            
            ]
    
        },
        "Employee":{
    
            Permission:[
    
                ActionType.get
            
            ]
    
        }

    }
    

}