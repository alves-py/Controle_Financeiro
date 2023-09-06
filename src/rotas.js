const express = require(`express`);
const { cadastrarUsuario, loginUsuario, atualizarUsuario, detalharUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha, validarToken } = require("./intermediarios/validacao");
const { listarCategorias } = require("./controladores/categoria");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

rotas.use(validarToken);

//Passar as outras rotas abaixo desta linha
rotas.get(`/usuario`, detalharUsuario);
rotas.put(`/usuario`,validarNomeEmailSenha, atualizarUsuario);
rotas.get('/categoria', listarCategorias);

module.exports = rotas;