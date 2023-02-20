import path from 'path';
import morgan from "morgan";
import express from "express";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import { Router } from "./routers/router.js";
import expressLayouts from 'express-ejs-layouts';
import { connect } from "./connections/mongo.connection.js";
import dotenv from "dotenv";

//Config Dotenv
dotenv.config();

//Define Landing Port
const PORT = process.env.PORT || 3000;

//Start Server
const app = express();

//Config static and views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(expressLayouts);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
console.log(path.join(__dirname, '../uploads'));
app.use('/uploads', express.static('../uploads'));

//Set Morgan
app.use(morgan('combined'));

//Define BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define CORS

//Define Landing Router
app.use("/", Router);

//Connect To Mongo
connect

// catch 404 and forward to error handler
app.use((req, res) => {
  return res.status(404).render('pages/404');
});

//Listen Server On Port
app.listen(PORT,() => {
  console.log(`Server listening on :- http://localhost:${PORT}`);
});
