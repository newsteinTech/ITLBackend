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
exports.groupSchema = new mongoose_1.default.Schema({
    "GroupName": {
        type: String
    },
    "Email": {
        type: String,
        required: true
    },
    "Manager": {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'userDetails',
        required: true
    },
    "Description": {
        type: String
    },
    "Group Members": [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'userDetails'
        }]
});
exports.groupModel = mongoose_1.default.model('groupDetails', exports.groupSchema);
