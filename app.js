const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


const db = new sqlite3.Database('controle_transacoes.db');


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contas (
      id TEXT PRIMARY KEY,
      cliente_nome TEXT,
      cliente_numero_cartao TEXT,
      saldo REAL
    )
  `);
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transacoes (
      id TEXT PRIMARY KEY,
      conta_id TEXT,
      tipo TEXT,
      valor REAL,
      data_criacao TEXT,
      FOREIGN KEY (conta_id) REFERENCES contas (id)
    )
  `);
});


app.post('/contas', (req, res) => {
  const { cliente_nome, cliente_numero_cartao } = req.body;
  //if (!cliente_nome || !cliente_numero_cartao) {
    //return res.status(400).json({ erro: 'Cliente_nome e cliente_numero_cartao são obrigatórios' });
  //}

  const id = uuidv4();
  const saldo = 0;

  db.run('INSERT INTO contas (id, cliente_nome, cliente_numero_cartao, saldo) VALUES (?, ?, ?, ?)', [id, cliente_nome, cliente_numero_cartao, saldo], (err) => {
    if (err) {
      console.error(`Erro ao criar conta: ${err}`);
      return res.status(500).json({ erro: 'Erro ao criar conta' });
    }

    res.status(201).json({ id, cliente_nome, cliente_numero_cartao, saldo });
  });
});


app.post('/transacoes', (req, res) => {
  const { tipo, valor, conta_id } = req.body;
 // if (!tipo || !valor || !conta_id) {
    //return res.status(400).json({ erro: 'Tipo, valor e conta_id são obrigatórios' });
  //}

  const data_criacao = new Date().toISOString();
  const id = uuidv4();

  db.run('INSERT INTO transacoes (id, conta_id, tipo, valor, data_criacao) VALUES (?, ?, ?, ?, ?)', [id, conta_id, tipo, valor, data_criacao], (err) => {
    if (err) {
      console.error(`Erro ao registrar transação: ${err}`);
      return res.status(500).json({ erro: 'Erro ao registrar transação' });
    }

    
    const query = tipo === 'compra' || tipo === 'saque' ? 'UPDATE contas SET saldo = saldo - ? WHERE id = ?' : 'UPDATE contas SET saldo = saldo + ? WHERE id = ?';
    db.run(query, [valor, conta_id], (err) => {
      if (err) {
        console.error(`Erro ao atualizar saldo da conta: ${err}`);
        return res.status(500).json({ erro: 'Erro ao atualizar saldo da conta' });
      }

      res.status(201).json({ id, tipo, valor, data_criacao });
    });
  });
});


app.get('/contas/:conta_id', (req, res) => {
  const conta_id = req.params.conta_id;

  db.all('SELECT * FROM transacoes WHERE conta_id = ?', [conta_id], (err, transacoes) => {
    if (err) {
      console.error(`Erro ao buscar transações: ${err}`);
      return res.status(500).json({ erro: 'Erro ao buscar transações' });
    }

    res.json(transacoes);
  });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
