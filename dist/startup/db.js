"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DB {
    static connectMongoDB() {
        let connectionString = "mongodb://localhost:27017/ITILDB";
        mongoose_1.default.connect(connectionString, { useNewUrlParser: true })
            .then(() => { console.log("DB connected"); })
            .catch((err) => { console.log("DB connection failure"); });
    }
}
exports.DB = DB;
