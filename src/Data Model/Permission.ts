import { ActionType } from "./Action";

export const RolePermission = {

    "Admin": {

        Permission:[

            ActionType.createInc,
            ActionType.getInc,
            ActionType.updateInc,
            ActionType.createUser,
            ActionType.getUser,
            ActionType.updateUser,
            ActionType.deleteUser

        ]

    },

    "ITIL Admin":{

        Permission:[

            ActionType.createInc,
            ActionType.getInc,
            ActionType.updateInc,
            ActionType.getUser

        ]

    },
    "Manager":{

        Permission:[

            ActionType.createInc,
            ActionType.getInc,
            ActionType.updateInc,
            ActionType.getUser

        ]

    },
    "CS Reps":{

        Permission:[

            ActionType.getInc

        ]

    },
    "Employee":{

        Permission:[

            ActionType.getInc

        ]

    }  

}