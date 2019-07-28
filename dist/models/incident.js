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
    "IncidentForm1": {
        "Incident Number": {
            type: String,
            required: true
        },
        "Caller": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetails',
            required: true
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
            ref: 'ConfigItemDetails'
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
        "Assignment Group": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'groupDetails'
        },
        "Assigned To": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetails'
        },
        "Short Description": {
            type: String,
            required: true
        },
        "Description": {
            type: String
        }
    },
    "IncidentForm2": {
        "Work Notes": {
            type: Array
        },
        "Resolution Code": {
            type: String,
            enum: ["Solved by workaround", "Solved Permanently", "Not Solved", "Closed"]
        },
        "Resolved By": {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetails'
        },
        "Resolved Date": {
            type: Date
        }
    }
});
exports.incidentModel = mongoose_1.default.model('incidentDetails', exports.incidentSchema);
