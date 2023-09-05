const express = require ('express');
const sqlite3 = require ('sqlite3');
const bodyParser = require ('body-parser');

const app = express();
const port = process.env.PORT|| 3000;
//Configurar o banco de dados SQLite
const db = new sqlite3.Database('conta.db');
app.use(express.json());
app.listen(port,()=>{
    console.log(`O Servidor rodando na port ${port}`)
})
db.serialize(()=>{
    db.run('CREATE TABLE IF NOT EXISTS conta( id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL)')
    db.run('CREATE TABLE IF NOT EXISTS operacao (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT NOT NULL)')
    db.run ('CREATE TABLE IF NOT EXISTS trasacao(id INTEGER PRIMARY KEY AUTOINCREMENT, id_conta INTEGER, FOREIGN KEY(id_conta) REFERENCES conta(id),tipo_operacao TEXT, FOREIGN KEY(tipo_operacao) REFERENCES (operacao_descricao), valor INTEGER NOT NULL, DATA_OPERACAO DATE.TIME NOT NULL)')

})
app.post('/conta', (req,res)=>{
    const {numero, id_conta} =req.body;
    db.get ('SELECT * FROM conta WHERE Id =?',[ id_conta],(err,row)=>{
        if(err){
            console.error(err.message);
            res.status(500).json({error:'Erro interno do servidor'})
            return
        }
        if(!row){
            res.status(404).json({error:'conta não cadastrada'})
        }
        db.run('INSERT INTO conta(numero, id_conta) values(?,?)',[numero, id_conta], function(err){
            if(err){
                console.error(err.message)
                res.status(500).json({error:'Erro interno do servidor'})
                return
            }
            res.json({message: 'Cartao criado com sucesso'})
        })
    })
})
app.post('/operacao', (req,res)=>{
    const{id_conta, valor, data}= req.body;
    const tipo_transacao_id =1
    db.run('INSERT INTO transacoes(id_conta, tipo_transacao_id, valor, data) VALUES(?,?,?)',[id_conta, tipo_transacao_id, -valor,data],function(err){
        if(err){
            console.error(err.message);
            res.status(500).json({error:' Erro interno do servidor'})
            return;
        }
        res.json({message:'Transaçao registrada com sucesso'})
    })

})
app.post('/saque', (req,res)=>{
    const{id_conta, valor, data}= req.body;
    const tipo_transacao_id =2
    db.run('INSERT INTO transacoes(id_conta, tipo_transacao_id, valor, data) VALUES(?,?,?)',[id_conta, tipo_transacao_id, -valor,data],function(err){
        if(err){
            console.error(err.message);
            res.status(500).json({error:' Erro interno do servidor'})
            return;
        }
        res.json({message:'Transaçao registrada com sucesso'})
    })

})
app.post('/pagamento', (req,res)=>{
    const{id_conta, valor, data}= req.body;
    const tipo_transacao_id =3
    db.run('INSERT INTO transacoes(id_conta, tipo_transacao_id, valor, data) VALUES(?,?,?)',[id_conta, tipo_transacao_id, valor,data],function(err){
        if(err){
            console.error(err.message);
            res.status(500).json({error:' Erro interno do servidor'})
            return;
        }
        res.json({message:'Transaçao registrada com sucesso'})
    })

})