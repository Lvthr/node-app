const Dao = require("./dao.js");

module.exports = class UserDao extends Dao {

    register(json, callback) {
        console.log(JSON.stringify(json));
        super.query(
            "insert into Users (username, hashed_password) values (?,?)",
            [json.username, json.hashed_password],
            callback
        );
    }

    authenticate(json, callback){
        super.query("select * from Users where Users.username=?", [json.username], callback);
    }
};
























