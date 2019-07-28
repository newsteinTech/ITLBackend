"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.Schema({
    "Name": {
        type: String,
        required: true,
    },
    "Email": {
        type: String,
        required: true,
        unique: true
    },
    "Active": {
        type: Boolean
    },
    "Department": {
        type: String,
        enum: ["Customer Support", "Product Management", "IT", "Sales"]
    },
    "Password": {
        type: String
    },
    "passwordNeedsReset": {
        type: Boolean
    },
    "Role": {
        type: String,
        enum: ["Admin", "ITIL Admin", "Manager", "User"]
    }
});
exports.userModel = mongoose_2.default.model('userDetails', exports.userSchema);
