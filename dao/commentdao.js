const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {

    getAll(id, callback){
        super.query("select * from Comments where article_id=? order by Comments.date_time DESC", [id], callback);
    }

    createOne(json, callback) {
        console.log(JSON.stringify(json));
        var val = [json.article_id, json.comment_nick, json.comment_text];
        super.query(
            "insert into Comments (article_id, comment_nick, comment_text) values (?,?,?)",
            val,
            callback
        );
    }
    
    deleteAll(article_id, callback){
        super.query(
            "delete from Comments where article_id=?",[article_id], callback
        );
    }
};
























