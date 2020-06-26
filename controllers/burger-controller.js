const express = require("express");
const Burger = require("../models/burger");
const BurgerModel = new Burger();
const router = express.Router();

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get("/", async (req, response) => {
    var {burgerArray, devouredArray} = await BurgerModel.showBurger();
    response.render("index", {burgers: burgerArray, devouredBurgers: devouredArray});
});

router.post("/burgers", async (req, response) => {
    await BurgerModel.addBurger(req.body.burgerInput);
    response.redirect("/");
}); 

router.post("/devoured", async (req, response) => {
    await BurgerModel.devourBurger(req.body.devouredInput);
    response.redirect("/");
});

module.exports = router;