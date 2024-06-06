const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/*
Auth middleware that verifies a valid user with
access token
*/
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}


//Sets a local isAuthenticated variable to set login/logout link
const isLoggedIn = (req, res, next) => {
    res.locals.isAuthenticated = !!req.userId;
    next();
};

module.exports = {
    auth, isLoggedIn
}