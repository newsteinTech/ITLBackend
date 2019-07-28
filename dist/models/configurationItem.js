"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.CISchema = new mongoose_1.default.Schema({
    "Name": {
        type: String,
        required: true,
        unique: true
    },
    "Manufacturer": {
        type: String,
        enum: ["Lenovo", "IBM", "Microsoft", "Adobe", "HP", "Dell", "Apple", "Asus"]
    },
    "Class": {
        type: String,
        enum: ["Computer", "Software", "Server"]
    },
    "ModelId": {
        type: String
    },
    "Location": {
        type: String
    }
});
exports.CIModel = mongoose_1.default.model('configItemDetails', exports.CISchema);
