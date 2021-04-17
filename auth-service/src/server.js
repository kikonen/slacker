"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = parseInt(process.env.SERVER_PORT || '3200', 10);
app.get('/', function (req, res) {
    res.send('OAuth or such...');
});
app.listen(port, 'auth', function () {
    console.log("Listening at http://localhost:" + port);
});
