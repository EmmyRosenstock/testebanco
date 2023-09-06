import Cliente from "../model/Cliente"
import Transacao from "../model/Transacao"

class ClienteController {
    async findAll(req,res){
        const clientes = await Cliente.findAll()
        res.status(200).json(clientes)
    }
    async create(req,res){
        const {nome, saldo} = req.body
        const newCliente = await Cliente.create({nome, saldo})
        return res.status(201).json(newCliente)
    }
    async mostrarTransacoes(req,res){
        const {id} = req.body
        try{
        const cliente = await Cliente.findOne({id})
        const transacoes = await Transacao.findAll({idCliente: cliente.id})
        return res.status(200).json(transacoes)
        }catch(err){
            console.log(err)
        }
    }
}

export default new ClienteController