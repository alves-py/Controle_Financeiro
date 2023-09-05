const express = require(`express`);
const { cadastrarUsuario, loginUsuario } = require(`./controladores/usuarios`);

const rotas = express();

rotas.post(`/usuario`, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

module.exports = rotas;