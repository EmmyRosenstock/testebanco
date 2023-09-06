import db from "./db.js"

(async ()=>{
    try{
        await db.sync()
    }catch(err){
        console.log(err)
    }
})()