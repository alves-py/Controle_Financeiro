const express = require(`express`);
const { cadastrarUsuario, loginUsuario, atualizarUsuario, detalharUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha, validarToken, validarTransacao } = require("./intermediarios/validacao");
const { listarCategorias } = require("./controladores/categoria");
const { listarTransacoes, buscarTransacao, inserirTransacao } = require("./controladores/transacoes");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

rotas.use(validarToken);

//Passar as outras rotas abaixo desta linha
rotas.get(`/usuario`, detalharUsuario);
rotas.put(`/usuario`,validarNomeEmailSenha, atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/:id', buscarTransacao);
rotas.post('/transacao', validarTransacao ,inserirTransacao);

module.exports = rotas;