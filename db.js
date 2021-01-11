const { connect } = require("mongoose");
require("dotenv").config();

const { dbURI } = process.env;

const dbConnection = async () => {
  try {
    const db = await connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (db) {
      console.log("mongoDB connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
