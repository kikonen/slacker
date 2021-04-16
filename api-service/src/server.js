"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = parseInt(process.env.SERVER_PORT || '3100', 10);
app.get('/', function (req, res) {
    res.send('Hello World! Via typescript');
});
app.get('/bar', function (req, res) {
    res.send('Bar! Via typescript');
});
app.listen(port, 'api', function () {
    console.log("Listening at http://localhost:" + port);
});
