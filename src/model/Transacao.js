import Sequelize from "sequelize"
import db from "../database/db.js"
import Cliente from "./Cliente.js"

const Transacao = db.define("transacao",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type:{
        type: Sequelize.ENUM("avista", "parcelada", "saque", "pagamento"),
        allowNull: false
    },
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

Transacao.belongsTo(Cliente, {
    constraint: true,
    foreignKey: "idCliente"
})

Cliente.hasMany(Transacao,{
    foreignkey: "idCliente"
})



export default Transacao