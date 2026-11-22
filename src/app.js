require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email sao obrigatorios' })
    }

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    )

    res.status(201).json({ id: resultado.insertId, nome, email })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao cadastrar usuario' })
  }
})

app.get('/usuarios', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios')
    res.status(200).json(usuarios)
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao listar usuarios' })
  }
})

app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email } = req.body

    const [resultado] = await pool.query(
      'UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?',
      [nome ?? null, email ?? null, id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'usuario nao encontrado' })
    }

    res.status(200).json({ mensagem: 'usuario atualizado com sucesso' })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao atualizar usuario' })
  }
})

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [resultado] = await pool.query(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'usuario nao encontrado' })
    }

    res.status(200).json({ mensagem: 'usuario removido com sucesso' })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao remover usuario' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})