require("dotenv").config();

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const mainRouter = require("./server/routes/main");
const userRouter = require("./server/routes/user");
const adminRouter = require("./server/routes/admin");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const methodOveride = require("method-override");
const mongoStore = require("connect-mongo");
const connectDB = require("./server/config/db");
const { isActiveRoute } = require("./server/helpers/routerHelpers");
const {isLoggedIn} = require("./middlewares/auth");

const PORT = 5000 || process.env.PORT;

// Connect to database
connectDB();
// Load and set middlewares

// Parse the url parameters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOveride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(isLoggedIn);

app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.isActiveRoute = isActiveRoute;

app.use("/", mainRouter);
app.use("/", userRouter);
app.use("/", adminRouter);


app.listen(PORT, () => {
    console.log(`Server running on port -> ${PORT}`);
});
