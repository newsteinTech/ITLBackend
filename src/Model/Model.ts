import mongoose, { Schema } from "mongoose";

export const incidentSchema = new mongoose.Schema({
    
    "IncidentNumber" : {
        type: Number,
        required: true,
        unique:true
    },
    "Caller" : {
        type: Schema.Types.ObjectId,
        ref: 'userDetail',
        required: true
    },
    // "OnBehalfOf" : {// Contains the name of customer or employee who have no access to ITIL Tool.
    //     type: Schema.Types.ObjectId,
    //     ref: 'userDetail'
    // },
    // "Category" : {
    //     type: String,
    //     enum: ["Software", "Hardware", "Database", "Network", "Inquiry"],
    // },
    // "SubCategory" : {
    //     type: String
    //     // based on enum category (ex- if category is software, subcategories will be email, OS)
    // },
    "ConfigurationItem" : {
        type: Schema.Types.ObjectId,
        ref: 'ConfigItemDetail'
    },
    "State" : {
        type: String,
        enum:["New", "In Progress", "On Hold", "Resolved", "Cancelled"]
    },
    "Impact" : {
        type: String,
        enum:["High", "Medium", "Low"]
    },
    "Urgency" : {
        type: String,
        enum:["High", "Medium", "Low"]
    },
    "Priority" : {
        type: String
    },
    "AssignmentGroup" : {
        type: Schema.Types.ObjectId,
        ref: 'groupDetail',
        required:true
    },
    "AssignedTo" : {
        type: Schema.Types.ObjectId,
        ref: 'userDetail'
    },
    "ShortDescription" : {
        type: String,
        required: true
    },
    "Description" : {
        type: String
    },
    "CreatedDate" : {
        type:Date,
        default:Date.now()
    },
    "UpdateDate" : {
        type:Date
    },
    "sla":{
        type:Date,
        required:true
    }

    // "IncidentResolvedDetails" : {
    //     "WorkNotes" :[{
    //         comment:String,
    //         commentedBy:{
    //             Type: Schema.Types.ObjectId,
    //             // ref: 'userDetail',(Showing error for some reason)
    //         },
    //         Date:Date
    //     }],
    //     "ResolutionCode" : {
    //         type: String,
    //         enum: ["Solved by workaround", "Solved Permanently", "Not Solved", "Closed"]
    //     },
    //     "ResolvedBy" : {
    //         type: Schema.Types.ObjectId,
    //         ref: 'userDetail'
    //     },
    //     "ResolvedDate" : {
    //         type: Date
    //     }
    // }
});

export const taskSchema= new mongoose.Schema({
    "Tasknumber" : {
        type: String
    },
    "IncidentNumber" : {
        type: Schema.Types.ObjectId,
        ref: 'incidentDetail',
        required: true
    },
    "State" : {
        type: String,
        enum:["New", "In Progress", "Closed", "Resolved", "Cancelled"]
    },
    "Priority" : {
        type: String,
        enum: ["Critical", "High", "Moderate", "Low"]
    },
    "AssignedTo" : {
        type: Schema.Types.ObjectId,
        ref: 'userDetail'
    },
    "ShortDescription" : {
        type: String,
        required: true
    },
    "Description" : {
        type: String
    },
    "CreatedDate" : {
        type:Date,
        default:Date.now()
    },
    "UpdateDate" : {
        type:Date
    }
})

export const userSchema = new mongoose.Schema({

    "Name" : {
        type: String,
        required: true,
    },
    "Email" : {
        type: String,
        required: true,
        unique: true
    },
    "PhoneNo" : {
        type:String
    },
    "UserId":{
        type: String,
        required:true,
        unique:true
    },
    "Active" : {
        type: Boolean,
        default:true
    },
    "Group" : [{
        type: Schema.Types.ObjectId,
        ref: "groupDetail"
    }],
    "Password" : {
        type: String
    },
    "Role" : {
        type: String,
        enum:["Admin", "ITIL Admin", "Manager", "CS Reps","Employee","Customer"]
    },
    "CreatedDate" : {
        type:Date,
        default:Date.now()
    },
    "UpdateDate" : {
        type:Date
    }

});

export const groupSchema = new mongoose.Schema({
    "Name" : {
        type: String
    },
    "Email" : {
        type: String,
        required: true
    },
    "GroupId":{
        type: String,
        required:true,
        unique:true
    },
    "Manager" : {
        type: Schema.Types.ObjectId,
        ref: 'userDetail',
        required: true
    },
    "GroupMembers" : [{
        type: Schema.Types.ObjectId,
        ref: 'userDetail'
    }],
    "CreatedDate" : {
        type:Date,
        default:Date.now()
    },
    "UpdateDate" : {
        type:Date
    }
});
//CI the product/services/assets facing issue.
export const CISchema = new mongoose.Schema ({

    "Name" : {
        type: String,
        required: true,
        unique: true
    },
    "Class" : {
        type: String,
        enum: ["Computer", "Software", "Server","Services"]
    },
    "CiId" : {
        type: String,
        required:true,
        unique:true
    },
    "CreatedDate" : {
        type:Date,
        default:Date.now()
    },
    "UpdateDate" : {
        type:Date
    }
});


export let incidentModel = mongoose.model('incidentDetail', incidentSchema);
export let taskModel = mongoose.model('taskDetail', taskSchema);
export let userModel = mongoose.model('userDetail',userSchema);
export let groupModel = mongoose.model('groupDetail', groupSchema);
export let CIModl = mongoose.model('CIDetail', CISchema);