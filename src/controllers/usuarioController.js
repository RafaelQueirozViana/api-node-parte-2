const usuarioModel = require('../models/usuarioModel')

const listar = async (req, res) => {
  try {
    const usuarios = await usuarioModel.listar()
    res.status(200).json(usuarios)
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao listar usuarios' })
  }
}

const criar = async (req, res) => {
  try {
    const { nome, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email sao obrigatorios' })
    }

    const id = await usuarioModel.criar(nome, email)
    res.status(201).json({ id, nome, email })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao cadastrar usuario' })
  }
}

const atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email } = req.body

    const alteradas = await usuarioModel.atualizar(id, nome, email)

    if (alteradas === 0) {
      return res.status(404).json({ erro: 'usuario nao encontrado' })
    }

    res.status(200).json({ mensagem: 'usuario atualizado com sucesso' })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao atualizar usuario' })
  }
}

const remover = async (req, res) => {
  try {
    const { id } = req.params

    const removidas = await usuarioModel.remover(id)

    if (removidas === 0) {
      return res.status(404).json({ erro: 'usuario nao encontrado' })
    }

    res.status(200).json({ mensagem: 'usuario removido com sucesso' })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao remover usuario' })
  }
}

module.exports = { listar, criar, atualizar, remover }