const { Schema, model } = require("mongoose");

// Create Schema

const imgSchema = new Schema({
  images: {
    data: Buffer,
    contentType: String,
  },

  text: String,

  ingridient: String,

  prescribe: String,
});

const Img = model("Image", imgSchema);

module.exports = {
  Img,
};
