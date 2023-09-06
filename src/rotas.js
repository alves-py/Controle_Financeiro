const express = require(`express`);
const { cadastrarUsuario, loginUsuario, atualizarUsuario, detalharUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha, validarToken } = require("./intermediarios/validacao");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

rotas.use(validarToken);

//Passar as outras rotas abaixo desta linha
rotas.get(`/usuario`, detalharUsuario);
rotas.put(`/usuario`,validarNomeEmailSenha, atualizarUsuario);

module.exports = rotas;