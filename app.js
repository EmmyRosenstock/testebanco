const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000; 

const db = new sqlite3.Database('contas.db');


app.use(express.json());


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cartoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT NOT NULL,
      pessoa_id INTEGER,
      FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT NOT NULL,
      pessoa_id INTEGER,
      FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tipos_transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

  
});
// Rota para criar um novo cartão para um portador existente
app.post('/cartoes', (req, res) => {
  const { numero, pessoa_id } = req.body;
  
 
  db.get('SELECT * FROM pessoas WHERE id = ?', [pessoa_id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Pessoa não encontrada' });
      return;
    }
    
    db.run('INSERT INTO cartoes (numero, pessoa_id) VALUES (?, ?)', [numero, pessoa_id], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      res.json({ message: 'Cartão criado com sucesso' });
    });
  });
});

app.post('/compra', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 1; 
  
 
  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, -valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de compra registrada com sucesso' });
  });
});


app.post('/saque', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 2; 
  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, -valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de saque registrada com sucesso' });
  });
});


app.post('/pagamento', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 3; 
  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de pagamento registrada com sucesso' });
  });
});

app.post('/compra', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 1; 
  

  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, -valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de compra registrada com sucesso' });
  });
});


app.post('/saque', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 2; 
  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, -valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de saque registrada com sucesso' });
  });
});


app.post('/pagamento', (req, res) => {
  const { conta_id, valor, data } = req.body;
  const tipo_transacao_id = 3; 
  db.run('INSERT INTO transacoes (conta_id, tipo_transacao_id, valor, data) VALUES (?, ?, ?, ?)', [conta_id, tipo_transacao_id, valor, data], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Transação de pagamento registrada com sucesso' });
  });
});
