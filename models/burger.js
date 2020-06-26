const orm = require("../config/orm");

class Burger {
    showBurger = async () => {
        const burgers = await orm.selectFrom();
        var burgerArray = burgers.filter(burger => burger.devoured == 0);
        var devouredArray = burgers.filter(burger => burger.devoured == 1);
        return {burgerArray, devouredArray};
    }

    addBurger = async (name) => {
        const burger = await orm.insertInto(name, 0);
        return burger;
    }

    devourBurger = async (name) => {
        const burger = await orm.updateWhere(name);
        return burger;
    }
}

module.exports = Burger;