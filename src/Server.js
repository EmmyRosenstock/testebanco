import App from "./App.js"
require("./database/connect.js")


App.server.listen(3000, ()=>{
    console.log("Server is running")
})