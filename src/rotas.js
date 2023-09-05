const express = require(`express`);
const { cadastrarUsuario, loginUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha } = require("./intermediarios/validacao");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

module.exports = rotas;