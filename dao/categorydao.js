const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao {
  getAll(callback) {
    super.query("select * from Categories", [], callback);
  }
};
