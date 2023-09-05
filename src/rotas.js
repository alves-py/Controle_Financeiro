const express = require(`express`);
const { cadastrarUsuario, loginUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha, validarToken } = require("./intermediarios/validacao");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

rotas.use(validarToken);

//Passar as outras rotas abaixo desta linha

module.exports = rotas;