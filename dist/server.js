"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./startup/routes");
const db_1 = require("./startup/db");
const body_parser_1 = __importDefault(require("body-parser"));
class Incident {
    constructor() {
        this.app = express_1.default();
        this.app.listen(3000, 'localhost', function () {
            console.log("server is running");
        });
        this.configBodyParser();
        routes_1.Routes.configRoutes(this.app);
        db_1.DB.connectMongoDB();
    }
    configBodyParser() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
}
const incident = new Incident();
