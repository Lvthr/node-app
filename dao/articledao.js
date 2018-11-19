const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {

    getWithPriCat(priority_id, category_id, callback){
        if(priority_id == undefined && category_id != undefined){
            super.query("select * from Articles where article_category=? order by Articles.article_priority ASC, Articles.date_time DESC",
            [category_id], 
            callback);
        } else if (priority_id != undefined && category_id == undefined){
            super.query("select * from Articles where article_priority=? order by Articles.article_priority ASC, Articles.date_time DESC",
            [priority_id], 
            callback);
        } else {
            super.query("select * from Articles order by Articles.article_priority ASC, Articles.date_time DESC",
            [priority_id, 
            category_id], 
            callback);
        }
    }

    getNewest(callback){
        super.query("select * from Articles order by Articles.date_time DESC limit 5", [], callback);
    }
  
    getAllOfficial(callback) {
        super.query("select * from Articles order by Articles.article_priority ASC, Articles.date_time DESC", [], callback);
    }

    getAllCommunity(callback){
        super.query("select * from Articles where article_priority=2 order by Articles.date_time DESC", [], callback);
    }

    getAllInCategory(id, callback){
        console.log(id);
        super.query("select * from Articles where article_category=? order by Articles.date_time DESC", [id], callback);
    }

    getOne(id, callback) {
        super.query(
            "select * from Articles where article_id=?",
            [id],
            callback
        );
    }

    createOne(json, callback) {
        console.log(JSON.stringify(json));
        var val = [2, json.category, json.title, json.content, json.thumbnail_url];
        super.query(
            "insert into Articles (article_priority, article_category, title, content, thumbnail_url) values (?,?,?,?,?)",
            val,
            callback
        );
    }

    deleteOne(id, callback){
        super.query(
            "delete from Articles where article_id=?",
            [id],
            callback
        );
    }

    updateOne(json, callback){
        super.query(
            "update Articles set article_category=?, title=?, content=?, thumbnail_url=? where article_id=?",
            [json.article_category, json.title, json.content, json.thumbnail_url, json.article_id],
            callback
        );   
    }
};
























