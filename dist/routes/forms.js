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
const form_1 = __importDefault(require("../model/form"));
const router = express_1.default.Router();
// POST method to create a new form
router.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, addresses } = req.body;
        // Check if there are more than 5 addresses
        if (addresses.length > 5) {
            return res.status(400).json({ error: "Maximum 5 addresses allowed" });
        }
        // Check if there is more than one address marked as default
        const defaultAddresses = addresses.filter((address) => address.isDefault);
        if (defaultAddresses.length > 1) {
            return res.status(400).json({ error: "Only one address can be marked as default" });
        }
        // Create new form instance
        const newForm = new form_1.default({
            name,
            age,
            addresses
        });
        // Save the form to the database
        yield newForm.save();
        res.status(201).json(newForm);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}));
// GET method to retrieve forms
router.get("/forms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield form_1.default.find();
        res.status(200).json(forms);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}));
exports.default = router;
