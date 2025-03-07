"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthenticationMiddleware = class AuthenticationMiddleware {
    use(req, res, next) {
        const secretKey = "wegfyefgyweg@&hcdbkdcnbjk";
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: "No Tooken is Provided" });
        }
        try {
            const jwtToken = token.startsWith("Bareer ") ? token.slice(7, token.length) : token;
            jsonwebtoken_1.default.verify(jwtToken, secretKey, (err, decode) => {
                if (err) {
                    return res.status(403).json({ message: "Token is Invalid" });
                }
                req.user = decode;
                next();
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Invalid AUthentication" });
        }
    }
};
AuthenticationMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before", priority: 5 })
], AuthenticationMiddleware);
//# sourceMappingURL=AuthenticationMiddleware.js.map