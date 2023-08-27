"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { ApolloServer } from "@apollo/server";
const express4_1 = require("@apollo/server/express4");
// import { prismaClient } from "./lib/db";
const index_1 = __importDefault(require("./graphQl/index"));
const user_1 = __importDefault(require("./Services/user"));
const cors_1 = __importDefault(require("cors"));
//creating server
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 8000;
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.get("/", (req, res) => {
            res.status(200).json({
                success: true,
                message: "Backend is Up",
            });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, index_1.default)(), {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore 
                const token = req.headers["token"];
                console.log(token);
                try {
                    console.log("going to decode");
                    const user = yield user_1.default.decodeJwtToken(token);
                    console.log("passed from app.js");
                    return { user };
                }
                catch (error) {
                    return {};
                }
            })
        }));
        app.listen(PORT, () => {
            console.log(`Server has Started at ${PORT}`);
        });
    });
}
init();
