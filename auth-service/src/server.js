"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var querystring_1 = __importDefault(require("querystring"));
var app = express_1.default();
var port = parseInt(process.env.SERVER_PORT || '3200', 10);
app.set('view engine', 'ejs');
app.get('/login', function (req, res) {
    var query = {
        client_id: process.env.AUTH_CLIENT_ID,
        scope: 'openid email',
        response_type: 'code',
        redirect_uri: process.env.AUTH_REDIRECT_URI,
    };
    var queryStr = querystring_1.default.stringify(query);
    var auth_url = process.env.AUTH_API + "?" + queryStr;
    res.render(__dirname + "/../view/index", { auth_url: auth_url });
});
app.get('/callback', function (req, res) {
    var code = req.query.code;
    var scope = req.query.scope;
    var authuser = req.query.authuser;
    var prompt = req.query.prompt;
    res.send("Authenticated...\n<br>xxcode = " + code + "\n<br>scope = " + scope + "\n<br>authuser = " + authuser + "\n<br>prompt = " + prompt + "\n");
});
app.listen(port, 'auth', function () {
    console.log("Listening at http://localhost:" + port);
});
