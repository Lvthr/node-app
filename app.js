'use strict';

var express = require('express');
var cors = require('cors');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var apiRoutes = express.Router();


const ArticleDao = require("./dao/articledao.js");
const CategoryDao = require("./dao/categorydao.js");
const CommentDao = require("./dao/commentdao.js");
const UserDao = require("./dao/userdao.js");

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // for å tolke JSON
app.use(cors());

// Enable CORS for all resources on server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function(req, res){
    res.status(200).send('Hello world');
});

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "martimoa",
    password: "Wf4OPvyl",
    database: "martimoa",
    debug: false
});

let articleDao = new ArticleDao(pool);
let categoryDao = new CategoryDao(pool);
let commentDao = new CommentDao(pool);
let userDao = new UserDao(pool);

app.get("/newest", (req, res) => {
    console.log("Fikk request fra klient"); 
        articleDao.getNewest((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/articles", (req, res) => {
    console.log("Fikk request fra klient");
        articleDao.getAllOfficial((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/articles/incategory/:categoryId", (req, res) => {
    console.log("Fikk post request fra klient");
    articleDao.getAllInCategory(req.params.categoryId, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/articles/all", (req, res) => {
    console.log(req.body.priorityId);
    articleDao.getWithPriCat(req.body.priorityId, req.body.categoryId, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/communityfeed", (req, res) => {
    console.log("Fikk request fra klient");
        articleDao.getAllCommunity((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/add_article", (req, res) => {
    console.log("Fikk post request fra klient");
    articleDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});



app.get("/categories", (req, res) => {
    console.log("Fikk get request fra klient");
    categoryDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/articles/:article_id", (req, res) => {
    commentDao.deleteAll(req.params.article_id, (status1, data1) => {
        articleDao.deleteOne(req.params.article_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });
});

app.put("/articles", (req, res) => {
    console.log(req.body);
    articleDao.updateOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/articles/:article_id", (req, res) => {
    articleDao.getOne(req.params.article_id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/comments/:article_id", (req, res) => {
    commentDao.getAll(req.params.article_id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/comments", (req, res) => {
    commentDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


var server = app.listen(process.env.PORT || '8080', function(){
    console.log("App listening on port %s", server.address().port);
    console.log("Press Ctrl+C to quit");
});
































