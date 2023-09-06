import Sequelize from "sequelize"
import db from "../database/db.js"

const Cliente = db.define("cliente", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
    },
    saldo:{
        type: Sequelize.DOUBLE
    }
})

export default Cliente