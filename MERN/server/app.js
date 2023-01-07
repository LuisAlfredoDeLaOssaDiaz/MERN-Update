const bodyParser = require("body-parser");
const express = require("express");
const {API_VERSION} = require("./constants.js");
const cors = require("cors");

const app = express();

// Import routings
const authRoutes = require('./router/auth.js');
const userRoutes = require('./router/user.js');
const menuRoutes = require('./router/menu.js');
const courseRoutes = require('./router/course.js');
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

// Configure Body parser --- ########### --- sirve para resivir o enviar JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// ó solamente: app.use(express.json());

// Configure static folders --- ########### --- sirve para configurar las carpetas estaticas para poder cargarlas en el server EJEMPLO: http://localhost:3977/apple.svg
app.use(express.static("./uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,courseRoutes);
app.use(`/api/${API_VERSION}`,postRoutes);
app.use(`/api/${API_VERSION}`,newsletterRoutes);

module.exports = app;