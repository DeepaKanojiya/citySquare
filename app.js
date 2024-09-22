require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

const User = require("./model/user");
const db = require("./db");

app.use(express.urlencoded({ extended: true })); // to decode the post data
app.use(express.static("public"));

//set template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const {
    name,
    number,
    email,
    location,
    property_type,
    value,
    ready_to_get_leads,
  } = req.body;

  try {
    const duplicateUser = await User.findOne({
      number,
      email,
    });

    if (duplicateUser) {
       res.redirect({
        message: "Duplicate user found",
      },"register");
      
    }

    const result = await User.create({
      name,
      number,
      email,
      location,
      property_type,
      value,
      ready_to_get_leads,
    });



    res.render("landing");
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log("server is runing on port 7070");
});
