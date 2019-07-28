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
exports.taskSchema = new mongoose_1.default.Schema({
    "Task number": {
        type: String
    },
    "Incident Number": {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'incidentDetails',
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
});
exports.taskModel = mongoose_1.default.model('taskDetails', exports.taskSchema);
