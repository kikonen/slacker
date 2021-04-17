"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = parseInt(process.env.SERVER_PORT || '3200', 10);
app.get('/login', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname + "/../view/index.html"));
});
app.get('/callback', function (req, res) {
    var code = req.query.code;
    var scope = req.query.scope;
    var authuser = req.query.authuser;
    var prompt = req.query.prompt;
    res.send("Authenticated...\n<br>code = " + code + "\n<br>scope = " + scope + "\n<br>authuser = " + authuser + "\n<br>prompt = " + prompt + "\n");
});
app.listen(port, 'auth', function () {
    console.log("Listening at http://localhost:" + port);
});
