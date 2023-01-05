const Menu = require("../models/menu")
const { msg } = require("../msg/msg")

async function createMenu(req, res) {
    const menu = new Menu(req.body)

    menu.save((error, menuStored) => {
        if (error) {
            msg(res, 400, "error al crear menu")
        } else {
            msg(res,200,menuStored)
        }
    })
}

async function getMenus(req,res) {
    const {active} = req.query
    let response = null;

    if (active === undefined) {
        response = await Menu.find({}).sort({order: "asc"});
    } else { 
        if (active !== undefined) {
            response = await Menu.find({active}).sort({order: "asc"});
        }
    }
    if (!response[0]) {
        response = "No hay data en la DB";
    }

    return msg(res,200,response)
}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;
    console.log(menuData);
    Menu.findByIdAndUpdate({_id: id}, menuData, (err) => {
        if (err) {
            return msg(res, 400, "Error al actualizar.")
        } else {
            return msg(res, 200, "Menu actualizado.")
        } 
    })
}
 
module.exports = {
    createMenu,
    getMenus,
    updateMenu,
}
