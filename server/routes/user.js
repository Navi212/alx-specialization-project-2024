const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const userLayout = "../views/layouts/user";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const {auth} = require("../../middlewares/auth");


//Sets a local isAuthenticated variable to set login/logout link
module.exports = (req, res, next) => {
    res.locals.isAuthenticated = !!req.userId;
    next();
};


/*
GET for admin route
*/
// router.get("/user/login", async(req, res) => {
//     res.redirect("user");
// });

/*
GET for admin route
*/
router.get("/user/login", async(req, res) => {
    try {
        const locals = {
            title: "User",
            description: "A Blog Post with Nodejs, Express and Mongodb"
        }
        res.render("user/login", { locals, layout: userLayout });
        
    } catch (error) {
        console.log(error);
    }
});

/*
POST for admin route
*/


router.post("/user/login", async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie("token", token, { httpOnly: true });
        res.cookie("uId", user._id, { httpOnly: true });
        res.redirect("/user/dashboard");
    } catch (error) {
        console.log(error);
    }
});

/*
GET dashboard route
*/
router.get("/user/dashboard", auth, async(req, res) => {
    const userId = new mongoose.Types.ObjectId(req.cookies.uId);
    try {
        const locals = {
            title: "Dashboard",
            description: "A Blog Post created with NodeJS, Express and Mongodb"
        }
        //const data =  await Post.find();
        const data =  await Post.find({user: userId});
        res.render("user/dashboard", {
            locals,
            data,
            layout: userLayout
        });
        
    } catch (error) {
        console.log(error);
    }
});

/*
GET admin create new POST
*/
router.get("/user/add-post", auth, async(req, res) => {
    try {
        const locals = {
            title: "Add Post",
            description: "A Blog Post created with NodeJS, Express and Mongodb"
        }
        const data = await Post.find();
        res.render("user/add-post", {
            locals,
            layout: userLayout
    });
    } catch(error) {
        console.log(error);
        
    }
});


/*
POST admin create new POST
*/
router.post("/user/add-post", auth, async(req, res) => {
    const user = req.cookies.uId;
    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            user: user,
        });
        await Post.create(newPost);
        res.redirect("/user/dashboard");
    } catch(error) {
        console.log(error);
    }
});


/*
GET view POST by id
*/
router.get("/user/edit-post/:id", auth, async(req, res) => {
    try {
        const locals = {
            title: "Edit Post",
            description: "A Blog Post created with NodeJS, Express and Mongodb"
        }
        const data = await Post.findOne({ _id: req.params.id });
        res.render("user/edit-post", {
            locals,
            data,
            layout: userLayout
        });
    } catch(error) {
        console.log(error);
    }
});


/*
PUT admin update new POST
*/
router.put("/user/edit-post/:id", auth, async(req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect(`/user/edit-post/${req.params.id}`);
        
    } catch(error) {
        console.log(error);
    }
});

/*
GET register
*/
router.get("/user/register", async(req, res) => {
    res.render("user/register", {
        currentRoute: "/user/register"
    });
});


/*
DELETE POST
*/
router.delete("/user/delete-post/:id", auth, async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect("/user/dashboard");
    } catch(error) {
        console.log(error);
    }
});



/*
POST for register route
*/
router.post("/user/register", async(req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: "User Created", user });

        } catch(error) {
            if(error.code === 11000) {
                res.status(400).json({ message: "User already in use"} );
            }
            res.status(500).json({ message: "Internal server error" });
        }
    } catch(error) {
        console.log(error);
    }
});


/*
GET Admin logout
*/
router.get("/user/logout", async(req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});



module.exports = router;