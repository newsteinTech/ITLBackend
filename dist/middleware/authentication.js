"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const permissions_1 = require("../datamodel/permissions");
class Authenticate {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (token == null) {
                return res.status(401).send("Access denied");
            }
            try {
                let decodedToken = yield jwt.verify(token, "secret"); // verifies if access token is valid
                console.log(decodedToken); //decodedtoken is storing the payload sent during authentication
                req.user = decodedToken;
                next();
            }
            catch (error) {
                console.log(error);
                res.status(401).send("Bad Request, access denied");
            }
        });
    }
    static authorize(req, res, next, action) {
        switch (req.user.Role) {
            case "Admin":
                let result = permissions_1.rolePermissions.Admin.Permissions.indexOf(action);
                if (result >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "ITIL Admin":
                let result2 = permissions_1.rolePermissions.ITILAdmin.Permissions.indexOf(action);
                if (result2 >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "CS Reps":
                let result3 = permissions_1.rolePermissions.CSReps.Permissions.indexOf(action);
                if (result3 >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "Manager":
                let result4 = permissions_1.rolePermissions.Manager.Permissions.indexOf(action);
                if (result4 >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            default:
                return res.status(401).send("You don't have permissions to perform this action");
        }
    }
}
exports.Authenticate = Authenticate;
