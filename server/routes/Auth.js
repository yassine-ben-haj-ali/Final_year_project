const route = require("express").Router();
const { Register, Login } = require("../controllers/Auth");

route.post("/register", Register);
route.post("/login", Login);

module.exports = route;