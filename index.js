const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { dbConnection } = require("./db");
const { upload } = require("./multer");
const { Img } = require("./models/index");

const Port = process.env.PORT || 8080;

const server = express();

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "./public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("tiny"));

server.get("/", async (req, res) => {
  try {
    const files = await Img.find();
    const images = files.map((item) => {
      let buff = Buffer.from(item.images);
      return JSON.parse(buff.toString()).path;
    });

    res.render("index", { files, images });
  } catch (error) {
    console.log(error);
  }
});

server.post("/", upload.any("images"), async (req, res) => {
  try {
    const imgFile = req.files[0];
    const { text, ingridient, prescribe } = req.body;

    const imageToString = JSON.stringify(imgFile);
    let buff = Buffer.from(imageToString);

    const newPost = {
      text,
      ingridient,
      prescribe,
      images: buff,
    };
    await Img.create(newPost);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

server.listen(Port, () => {
  dbConnection();
  console.log(`Server is listening on port: ${Port}`);
});
