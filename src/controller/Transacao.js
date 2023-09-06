import Cliente from "../model/Cliente.js"
import Transacao from "../model/Transacao.js"

class TransacaoController{
    async create(req,res){
        const {type, valor, idCliente} = req.body
        if(!idCliente){
            return res.status(400).json({message: "Client not found!"})
        }
        try{ 
            const newTransacao =  await Transacao.create({type, valor, idCliente})
            const cliente = await Cliente.findOne({id: newTransacao.idCliente})
            if(cliente && type == "pagamento"){
                cliente.saldo += valor
                await cliente.save()
            }else if(cliente && type != "pagamento" ){
                cliente.saldo -= valor
                await cliente.save()

            }
            return res.status(200).json(newTransacao)

        }catch(err){
            console.log(err)
        }

        
    }
    async show(req,res){
        try{
            const transacoes = await Transacao.findAll()
            return res.status(200).json(transacoes)
        }catch(err){
            console.log(err)
        }
    }
}

export default new TransacaoController