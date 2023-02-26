const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

let _db;
module.exports = {
  connectToServer: async function () {
      try {
        await mongoose.connect(Db);
      } catch (error) {
        console.log(error);
      }
        return (_db === undefined ? false : true);
  },
  getDb: function () {
    return _db;
  },
};