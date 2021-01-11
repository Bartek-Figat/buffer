const { Schema, model } = require("mongoose");

// Create Schema

const imgSchema = new Schema({
  images: Buffer,

  text: String,

  ingridient: String,

  prescribe: String,
});

const Img = model("Image", imgSchema);

module.exports = {
  Img,
};
