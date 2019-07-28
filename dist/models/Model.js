"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
exports.incidentSchema = new mongoose_1.default.Schema({
    "IncidentDetails": {
        "Incident Number": {
            type: String,
            required: true
        },
        "Caller": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetail',
            required: true
        },
        "OnBehalfOf": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetail'
        },
        "Category": {
            type: String,
            enum: ["Software", "Hardware", "Database", "Network", "Inquiry"],
            required: true
        },
        "SubCategory": {
            type: String
            // based on enum category (ex- if category is software, subcategories will be email, OS)
        },
        "ConfigurationItem": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ConfigItemDetail'
        },
        "State": {
            type: String,
            enum: ["New", "In Progress", "Closed", "Resolved", "Cancelled"]
        },
        "Impact": {
            type: String,
            enum: ["High", "Medium", "Low"]
        },
        "Urgency": {
            type: String,
            enum: ["High", "Medium", "Low"]
        },
        "Priority": {
            type: String
        },
        "AssignmentGroup": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'groupDetail',
            required: true
        },
        "AssignedTo": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetail'
        },
        "ShortDescription": {
            type: String,
            required: true
        },
        "Description": {
            type: String
        },
        "CreatedDate": {
            type: Date,
            default: Date.now()
        },
        "UpdateDate": {
            type: Date
        }
    },
    "IncidentResolvedDetails": {
        "WorkNotes": [{
                comment: String,
                commentedBy: {
                    Type: mongoose_1.Schema.Types.ObjectId,
                },
                Date: Date
            }],
        "ResolutionCode": {
            type: String,
            enum: ["Solved by workaround", "Solved Permanently", "Not Solved", "Closed"]
        },
        "ResolvedBy": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetail'
        },
        "ResolvedDate": {
            type: Date
        }
    }
});
exports.taskSchema = new mongoose_1.default.Schema({
    "Tasknumber": {
        type: String
    },
    "IncidentNumber": {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'incidentDetail',
        required: true
    },
    "State": {
        type: String,
        enum: ["New", "In Progress", "Closed", "Resolved", "Cancelled"]
    },
    "Priority": {
        type: String,
        enum: ["Critical", "High", "Moderate", "Low"]
    },
    "AssignedTo": {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'userDetail'
    },
    "ShortDescription": {
        type: String,
        required: true
    },
    "Description": {
        type: String
    },
    "CreatedDate": {
        type: Date,
        default: Date.now()
    },
    "UpdateDate": {
        type: Date
    }
});
exports.userSchema = new mongoose_1.default.Schema({
    "Name": {
        type: String,
        required: true,
    },
    "Email": {
        type: String,
        required: true,
        unique: true
    },
    "PhoneNo": {
        type: String
    },
    "UserId": {
        type: String,
        required: true,
        unique: true
    },
    "Active": {
        type: Boolean,
        default: true
    },
    "Group": [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "groupDetail"
        }],
    "Password": {
        type: String
    },
    "Role": {
        type: String,
        enum: ["Admin", "ITIL Admin", "Manager", "CS Reps", "Employee", "Customer"],
        required: true
    },
    "CreatedDate": {
        type: Date,
        default: Date.now()
    },
    "UpdateDate": {
        type: Date
    }
});
exports.groupSchema = new mongoose_1.default.Schema({
    "Name": {
        type: String
    },
    "Email": {
        type: String,
        required: true
    },
    "GroupId": {
        type: String,
        required: true,
        unique: true
    },
    "Manager": {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'userDetail',
        required: true
    },
    "GroupMembers": [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetail'
        }],
    "CreatedDate": {
        type: Date,
        default: Date.now()
    },
    "UpdateDate": {
        type: Date
    }
});
//CI the product/services/assets facing issue.
exports.CISchema = new mongoose_1.default.Schema({
    "Name": {
        type: String,
        required: true,
        unique: true
    },
    "Manufacturer": {
        type: String,
        enum: ["Lenovo", "IBM", "Microsoft", "Adobe", "HP", "Dell", "Apple", "Asus", "Others"]
    },
    "Class": {
        type: String,
        enum: ["Computer", "Software", "Server", "Services"]
    },
    "CiId": {
        type: String,
        required: true,
        unique: true
    },
    "Location": {
        type: String
    },
    "CreatedDate": {
        type: Date,
        default: Date.now()
    },
    "UpdateDate": {
        type: Date
    }
});
exports.incidentModel = mongoose_1.default.model('incidentDetail', exports.incidentSchema);
exports.taskModel = mongoose_1.default.model('taskDetail', exports.taskSchema);
exports.userModel = mongoose_1.default.model('userDetail', exports.userSchema);
exports.groupModel = mongoose_1.default.model('groupDetail', exports.groupSchema);
exports.CIModel = mongoose_1.default.model('configItemDetail', exports.CISchema);
