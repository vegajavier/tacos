const express = require("express");
const app = express();

let PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static( __dirname + "public" ));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/tacos_controllers");

// stack overflow app.use(function( req, res, next){
// next();
/// });
app.use(function( req, res, next){
    next();
    });

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
})