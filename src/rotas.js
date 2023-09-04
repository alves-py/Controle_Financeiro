const express = require(`express`);
const { cadastrarUsuario } = require(`./controladores`);

const rotas = express()

rotas.post(`/usuario`, cadastrarUsuario)

module.exports = rotas 