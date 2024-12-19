// Importing modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const isAuthenticated = require("./middlewares/is-authenticated");
const requestLogger = require("./middlewares/request-logger");
const setCurrentUser = require("./middlewares/set-current-user");
const loadCategories = require("./middlewares/load-categories");
const loadRequestQuery = require("./middlewares/load-request-query");
const reqBodyMethodOverride = require("./middlewares/req-body-method-override");

const dashboardRouter = require("./routes/dashboard-routes");
const transactionsRouter = require("./routes/transactions-routes");
const manageRouter = require("./routes/manage-routes");
const sessionsRouter = require("./routes/sessions-routes");
const usersRouter = require("./routes/users-routes");
const searchRouter = require("./routes/search-routes");

// Initialize app ====
const app = express();
const port = process.env.PORT || 3000;



// View Engine =========
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

// Middlewares =========
const path = require("path");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(reqBodyMethodOverride);
app.use(
  session({
    secret: "super secret for me",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(setCurrentUser);
app.use(loadCategories);
app.use(loadRequestQuery);
app.use(requestLogger);
app.use(expressLayouts);

// Routes ==============
app.use("/", dashboardRouter);
app.use("/transactions", isAuthenticated, transactionsRouter);
app.use("/manage", isAuthenticated, manageRouter);
app.use("/search", isAuthenticated, searchRouter);
app.use("/", sessionsRouter);
app.use("/", usersRouter);

// Server ==============
app.listen(port, () => console.log("http://localhost:3000"));
