import express from "express"
import ClienteController from "./controller/Cliente.js"
import TransacaoController from "./controller/Transacao.js"


const routes = express.Router()

// Cliente routes
routes.get("/cliente",ClienteController.findAll)
routes.post("/cliente", ClienteController.create)
routes.post("/cliente/transacoes", ClienteController.mostrarTransacoes)

// transacao routes
routes.post("/transacao", TransacaoController.create)
routes.get("/transacao", TransacaoController.show)

export default routes