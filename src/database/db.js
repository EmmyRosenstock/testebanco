import Sequelize from "sequelize"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "databasesql3.db"}
)

try{
    sequelize.authenticate();
    console.log("The db is ok")
}catch(err){
    console.log("Something was wrong, try again my dear ", err)
}

export default sequelize