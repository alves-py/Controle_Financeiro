const express = require(`express`);
const { cadastrarUsuario } = require(`./controladores/usuarios`);

const rotas = express()

rotas.post(`/usuario`, cadastrarUsuario)

module.exports = rotas 