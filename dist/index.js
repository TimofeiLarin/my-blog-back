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
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://Admin:WmwTJ9XXUEkuUKGP@cluster0.a0jguwj.mongodb.net/?retryWrites=true&w=majority');
        console.log('Mongo DB OK!');
    }
    catch (error) {
        console.log('Mongo DB Error==>', error);
    }
});
connectDB();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hi tim');
});
app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
    });
    // res.send('hi tim');
});
app.listen(4444, () => {
    try {
        console.log('Server OK');
    }
    catch (error) {
        console.log('error =>', error);
    }
});
