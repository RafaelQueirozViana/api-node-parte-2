const pool = require('../config/db')

const listar = async () => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios')
  return usuarios
}

const criar = async (nome, email) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  )
  return resultado.insertId
}

const atualizar = async (id, nome, email) => {
  const [resultado] = await pool.query(
    'UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?',
    [nome ?? null, email ?? null, id]
  )
  return resultado.affectedRows
}

const remover = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id]
  )
  return resultado.affectedRows
}

module.exports = { listar, criar, atualizar, remover }