import express, { json } from "express";
import morgan from "morgan";
import connectToDB from "./config/db.js";
import fetch from "node-fetch";

// express app
const app = express();

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

//connecting to db
connectToDB();

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

const url = `https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01`;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "https://fakerapi.it/api/v1/",
  },
};  



app.get("/", async (req, res) => {

  try {
    const responce = await fetch(url, options);
    const json = await responce.json();
    const data = JSON.stringify(json.data);

    console.log(data)
    res.status(200).render("index", {data}); 
  } catch (err) {
    console.log(err);
  }
 
});


// 404 page
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(4000, () => {
  console.log(`app is running at http://localhost:${process.env.PORT}`);
});
