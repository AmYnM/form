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
const forms_1 = __importDefault(require("./routes/forms"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbconfig = require("./config/database");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/forms", forms_1.default);
// const PORT: number = process.env.PORT || 8000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(8000, () => {
            console.log(`Server is running on http://localhost:${8000}`);
        });
    }
    catch (error) {
        console.error("Error connecting or using MongoDB:", error);
        process.exit(1);
    }
}))();
